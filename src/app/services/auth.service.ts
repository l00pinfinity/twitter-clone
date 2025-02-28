import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, EmailAuthProvider, User, UserCredential, authState, createUserWithEmailAndPassword, deleteUser, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, serverTimestamp, doc, setDoc, collection, deleteDoc, getDocs, query, where, increment, arrayUnion, arrayRemove, getDoc } from '@angular/fire/firestore';
import { GoogleAuthProvider, OAuthProvider } from '@angular/fire/auth';
import { BehaviorSubject, Observable, ReplaySubject, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {
    authState(this.auth).subscribe(user => {
      this.currentUserSubject.next(user);
      if (user) {
        this.updateUserInFirestore(user);
      }
    });
  }

  private generateAvatarUrl(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=random`;
  }

  private async updateUserInFirestore(user: User, username?: string): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    const userData = {
      uid: user.uid,
      displayName: user.displayName || 'Anonymous',
      username: username || user.displayName?.toLowerCase().replace(/\s+/g, '') || 'user_' + user.uid.slice(0, 8),
      email: user.email || '',
      photoURL: user.photoURL || this.generateAvatarUrl(user.displayName || user.email || 'User'),
      emailVerified: user.emailVerified,
      platformId: user.providerData[0]?.providerId || 'email',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      tweets: 0,
      likes: 0,
      likedTweets: [],
      bookmarks: 0,
      bookmarkedTweets: [],
      retweets: 0,
      retweetedTweets: []
    };
    await setDoc(userDocRef, userData, { merge: true });
  }

  createAccountWithEmail(email: string, password: string, displayName: string, username: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((userCredential: UserCredential) => {
        const user = userCredential.user;
        return from(updateProfile(user, {
          displayName,
          photoURL: this.generateAvatarUrl(displayName)
        })).pipe(
          switchMap(() => from(this.updateUserInFirestore(user, username))),
          map(() => userCredential)
        );
      })
    );
  }

  loginAccountWithEmail(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  continueSignupWithGoogle(username?: string): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap((userCredential: UserCredential) => {
        const user = userCredential.user;
        return from(this.updateUserInFirestore(user,username)).pipe(
          map(() => userCredential)
        );
      })
    );
  }

  continueSignupWithApple(username?: string): Observable<UserCredential> {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap((userCredential: UserCredential) => {
        const user = userCredential.user;
        return from(this.updateUserInFirestore(user, username)).pipe(
          map(() => userCredential)
        );
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      switchMap(() => {
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
        return of(void 0);
      })
    );
  }

  public isLoggedIn(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => !!user)
    );
  }

  isLoggedOut(): Observable<boolean> {
    return this.isLoggedIn().pipe(map(isLoggedIn => !isLoggedIn));
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  sendPasswordReset(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  deleteAccount(): Observable<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('No user is currently logged in');
    }
    return from(deleteUser(user)).pipe(
      switchMap(() => from(deleteDoc(doc(this.firestore, `users/${user.uid}`))))
    );
  }

  // reauthenticate(password: string): Observable<void> {
  //   const user = this.auth.currentUser;
  //   if (!user || !user.email) {
  //     throw new Error('No user or email available for re-authentication');
  //   }
  //   const credential = EmailAuthProvider.credential(user.email, password);
  //   return from(reauthenticateWithCredential(user, credential));
  // }

  updateUserProfile(displayName?: string, photoURL?: string): Observable<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('No user is currently logged in');
    }
    return from(updateProfile(user, {
      displayName: displayName || user.displayName,
      photoURL: photoURL || user.photoURL || this.generateAvatarUrl(displayName || user.displayName || user.email || 'User')
    })).pipe(
      switchMap(() => from(this.updateUserInFirestore(user)))
    );
  }

  async updateUserStats(uid: string, field: string, shouldIncrement: boolean = true): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userDocRef, {
      [field]: shouldIncrement ? increment(1) : increment(-1),
      updatedAt: serverTimestamp()
    }, { merge: true });
  }

  incrementTweets(uid: string): Promise<void> {
    return this.updateUserStats(uid, 'tweets', true);
  }

  decrementTweets(uid: string): Promise<void> {
    return this.updateUserStats(uid, 'tweets', false);
  }

  async toggleLikeTweet(uid: string, tweetId: string, isLiked: boolean): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userDocRef, {
      likes: isLiked ? increment(-1) : increment(1),
      likedTweets: isLiked ? arrayRemove(tweetId) : arrayUnion(tweetId),
      updatedAt: serverTimestamp()
    }, { merge: true });
  }

  async toggleBookmarkTweet(uid: string, tweetId: string, isBookmarked: boolean): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userDocRef, {
      bookmarks: isBookmarked ? increment(-1) : increment(1),
      bookmarkedTweets: isBookmarked ? arrayRemove(tweetId) : arrayUnion(tweetId),
      updatedAt: serverTimestamp()
    }, { merge: true });
  }

  async toggleRetweet(uid: string, tweetId: string, isRetweeted: boolean): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userDocRef, {
      retweets: isRetweeted ? increment(-1) : increment(1),
      retweetedTweets: isRetweeted ? arrayRemove(tweetId) : arrayUnion(tweetId),
      updatedAt: serverTimestamp()
    }, { merge: true });
  }

  async isTweetEngaged(uid: string, tweetId: string, field: 'likedTweets' | 'bookmarkedTweets' | 'retweetedTweets'): Promise<boolean> {
    const userDoc = await getDocs(query(collection(this.firestore, 'users'), where('uid', '==', uid)));
    if (userDoc.empty) return false;
    const userData = userDoc.docs[0].data();
    return (userData[field] || []).includes(tweetId);
  }

  async getTweetCount(uid: string): Promise<number> {
    const userDoc = await getDocs(query(collection(this.firestore, 'users'), where('uid', '==', uid)));
    return userDoc.empty ? 0 : userDoc.docs[0].data()['tweets'] || 0;
  }

  async getUserStats(uid: string): Promise<any> {
    const userDoc = await getDocs(query(collection(this.firestore, 'users'), where('uid', '==', uid)));
    return userDoc.empty ? {} : userDoc.docs[0].data();
  }

  async getUserData(uid: string): Promise<any> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  }

  getCurrentUserData(): Observable<any> {
    return this.currentUser$.pipe(
      switchMap(user => user ? from(this.getUserData(user.uid)) : of(null))
    );
  }
}
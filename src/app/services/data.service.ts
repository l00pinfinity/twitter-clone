import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, getDocs, limit, orderBy, query, startAfter, where, onSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { catchError, from, map, Observable, retry, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { Tweet, UserData } from './interface/tweet';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private lastDoc: QueryDocumentSnapshot | null = null;

  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) { }

  uploadImage(file: File): Observable<string> {
    const filePath = `images/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);
    return from(uploadBytes(fileRef, file)).pipe(
      switchMap(() => from(getDownloadURL(fileRef)))
    );
  }

  postTweet(tweetData: any): Observable<any> {
    const tweetsCollection = collection(this.firestore, 'tweets');
    return from(addDoc(tweetsCollection, tweetData));
  }

  public getTweets(page: number, size: number): Observable<Tweet[]> {
    const tweetsCollection = collection(this.firestore, 'tweets');
    const q = query(
      tweetsCollection,
      orderBy('createdAt', 'desc'),
      limit(size),
      ...(page > 0 && this.lastDoc ? [startAfter(this.lastDoc)] : []) 
    );
    return from(getDocs(q)).pipe(
      map(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; 
        }
        const tweets = querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<Tweet, 'id' | 'user'>;
          const id = doc.id;
          return { ...data, id };
        });
        return tweets;
      }),
      switchMap(tweets =>
        from(
          Promise.all(
            tweets.map(tweet =>
              this.getUserData(tweet.uid).then(user => ({
                ...tweet,
                user: user || { displayName: 'Unknown', username: 'unknown' }
              }))
            )
          )
        )
      )
    );
  }

  public getTrendsForYou(size: number): Observable<any[]> {
    const tweetsCollection = collection(this.firestore, 'tweets');
    const q = query(tweetsCollection, orderBy('createdAt', 'desc'), limit(100));
    return from(getDocs(q)).pipe(
      map(snapshot => {
        const tweets = snapshot.docs.map(doc => doc.data() as Tweet);
        const hashtagCount: { [key: string]: number } = {};
        tweets.forEach(tweet => {
          (tweet.hashtags || []).forEach((hashtag: string) => {
            hashtagCount[hashtag] = (hashtagCount[hashtag] || 0) + 1;
          });
        });
        return Object.entries(hashtagCount)
          .map(([name, count]) => ({ name, count, updatedAt: new Date().toISOString() }))
          .sort((a, b) => b.count - a.count)
          .slice(0, size);
      })
    );
  }

  private async getUserData(uid: string): Promise<UserData | null> {
    const userDocRef = collection(this.firestore, 'users');
    const q = query(userDocRef, where('uid', '==', uid));
    const userDoc = await getDocs(q);
    return userDoc.empty ? null : userDoc.docs[0].data() as UserData;
  }

  public resetPagination(): void {
    this.lastDoc = null;
  }
}
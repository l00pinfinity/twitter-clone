import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-compose-tweet',
  templateUrl: './compose-tweet.component.html',
  styleUrls: ['./compose-tweet.component.scss']
})
export class ComposeTweetComponent implements OnInit {
  tweet: UntypedFormGroup;
  errorMessage: string | null = null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  currentUser$: Observable<User | null>;
  isPosting = false;
  isLoggedIn: Observable<boolean> = this.authService.isLoggedIn();

  constructor(
    private authService: AuthService, private dataService: DataService) {
    this.tweet = new UntypedFormGroup({
      body: new UntypedFormControl('', [Validators.maxLength(280)]),
    });
    this.currentUser$ = this.authService.getCurrentUser();
  }

  ngOnInit(): void { }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
      this.tweet.get('body')?.clearValidators();
      this.tweet.get('body')?.setValidators(Validators.maxLength(280));
      this.tweet.get('body')?.updateValueAndValidity();
    } else {
      this.tweet.get('body')?.setValidators([Validators.required, Validators.maxLength(280)]);
      this.tweet.get('body')?.updateValueAndValidity();
    }
  }

  onImageClick(): void {
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    fileInput.click();
  }

  onGifClick(): void {
    console.log('GIF button clicked');
  }

  onPollClick(): void {
    console.log('Poll button clicked');
  }

  onEmojiClick(): void {
    console.log('Emoji button clicked');
  }

  onLocationClick(): void {
    console.log('Location button clicked');
  }

  postTweet(): void {
    if (this.isPosting || (!this.tweet.value.body && !this.selectedImage)) {
      this.errorMessage = 'Please add text or an image to post.';
      return;
    }

    this.isPosting = true;
    this.errorMessage = null;

    this.currentUser$.subscribe(user => {
      if (!user) {
        this.errorMessage = 'You must be logged in to post.';
        this.isPosting = false;
        return;
      }

      const body = this.tweet.value.body || '';
      const tweetData: any = {
        uid: user.uid,
        body,
        createdAt: new Date().toISOString(),
        likes: 0,
        retweets: 0,
        comments: 0,
        hashtags: this.extractHashtags(body),
        mentions: this.extractMentions(body)
      };

      if (this.selectedImage) {
        this.dataService.uploadImage(this.selectedImage).subscribe({
          next: (imageUrl) => {
            tweetData.imageUrl = imageUrl;
            this.submitTweet(tweetData, user.uid);
          },
          error: (err) => {
            this.errorMessage = 'Image upload failed: ' + err.message;
            this.isPosting = false;
          }
        });
      } else {
        this.submitTweet(tweetData, user.uid);
      }
    });
  }

  private submitTweet(tweetData: any, uid: string): void {
    this.dataService.postTweet(tweetData).subscribe({
      next: () => {
        this.authService.incrementTweets(uid).then(() => {
          this.tweet.reset();
          this.selectedImage = null;
          this.imagePreview = null;
          this.isPosting = false;
          this.tweet.get('body')?.setValidators([Validators.required, Validators.maxLength(280)]);
          this.tweet.get('body')?.updateValueAndValidity();
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to post tweet: ' + err.message;
        this.isPosting = false;
      }
    });
  }

  private extractHashtags(body: string): string[] {
    const hashtagRegex = /#[\w]+/g;
    return body.match(hashtagRegex) || [];
  }

  private extractMentions(body: string): string[] {
    const mentionRegex = /@[\w]+/g;
    return body.match(mentionRegex) || [];
  }
}
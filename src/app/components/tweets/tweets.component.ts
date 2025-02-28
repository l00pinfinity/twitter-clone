import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Tweet } from 'src/app/services/interface/tweet';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  
  atSign = '@';
  tweets$: Observable<Tweet[]>;
  page = 0;
  size = 10;

  constructor(private data: DataService) {
    this.tweets$ = this.getTweets();
  }

  ngOnInit(): void {}

  getTweets(): Observable<Tweet[]> {
    return this.data.getTweets(this.page, this.size).pipe(
      tap(tweets => console.log('Fetched tweets:', tweets)) 
    );
  }
  loadMore(): void {
    this.page++;
    this.tweets$ = this.getTweets();
  }

}

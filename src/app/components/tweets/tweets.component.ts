import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  tweets$: any;
  page = 0;
  size = 10;

  constructor(private data:DataService) { }

  getTweets(){
    this.data.getTweets(this.page,this.size).subscribe(data => {
      this.tweets$ = data.content;
    })
  }

  ngOnInit(): void {
    this.getTweets();
  }

}

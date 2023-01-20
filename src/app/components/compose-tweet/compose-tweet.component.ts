import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-compose-tweet',
  templateUrl: './compose-tweet.component.html',
  styleUrls: ['./compose-tweet.component.scss']
})
export class ComposeTweetComponent implements OnInit {

  errorMessage!: string;

  constructor(private http:HttpClient) { }

  tweet = new FormGroup({
    body: new FormControl('', [Validators.required]),
    tags: new FormControl([])
  });

  ngOnInit(): void {
  }

  postTweet(){
    console.log(this.tweet.value);
    this.http.post<any>(environment.apiUrl+'/api/tweets',this.tweet.value).subscribe(res=>{
      console.log(res);
      if(res){
        this.tweet.reset();
      }
    },()=>{
      this.errorMessage = "Something went wrong, please try again."
    });
  }

}

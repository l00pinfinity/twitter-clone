import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  trends$: any;
  size = 10;
  isLoggedIn: boolean = false;

  constructor(private data:DataService,private auth: AuthService) { }

  getTrendsForYou(){
    this.data.getTrendsForYou(this.size).subscribe(data => {
      this.trends$ = data.content;
    })
  }

  checkIfLoggedIn() {
    if (this.auth.isLoggedIn() == true) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.getTrendsForYou();
    this.checkIfLoggedIn();
  }

}

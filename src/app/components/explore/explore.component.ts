import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private auth:AuthService) { }

  checkIfLoggedIn() {
    if (this.auth.isLoggedIn() == true) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

}

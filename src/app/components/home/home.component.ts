import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private auth:AuthService,private router:Router) { }

  checkIfLoggedIn() {
    if (this.auth.isLoggedIn() == true) {
      this.isLoggedIn = true;
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

}

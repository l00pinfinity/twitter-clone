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

  constructor(private authService:AuthService,private router:Router) { }

  checkIfLoggedIn() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => console.log(isLoggedIn));
  }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser$: any;

  constructor(private auth: AuthService, private router: Router, private data: DataService) { }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    this.isLoggedIn = false;
  }

  currentUser(){
    this.data.getCurrentUser().subscribe(user =>{
      this.currentUser$ = user;
    })
  }

  checkIfLoggedIn() {
    if (this.auth.isLoggedIn() == true) {
      this.isLoggedIn = true;

    }
  }

  ngOnInit(): void {
    this.checkIfLoggedIn();
    this.currentUser();
  }

}

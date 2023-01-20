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
  isLoggedIn = true;
  username = "";

  constructor(private auth: AuthService, private router: Router, private data: DataService) { }

  logout() {
    this.router.navigateByUrl('/home');
    this.auth.logout();
    this.isLoggedIn = false;
  }

  accountInfo() {
    this.data.accountInfo().subscribe(data => {
      this.username = data.lastName;
    })
  }

  ngOnInit(): void {
    this.accountInfo();
  }

}

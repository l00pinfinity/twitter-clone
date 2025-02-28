import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: Observable<boolean> = this.authService.isLoggedIn(); 
  currentUser$: Observable<User | null> = this.authService.getCurrentUser();
  currentUserData$: Observable<any> = this.authService.getCurrentUserData();

  constructor(private authService: AuthService, private router: Router, private data: DataService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}

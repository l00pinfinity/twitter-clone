import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  isLoggedIn: Observable<boolean> = this.authService.isLoggedIn(); 
  currentUser$: Observable<User | null> = this.authService.getCurrentUser();
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signupWithGoogle(): void {
    this.authService.continueSignupWithGoogle().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Google signup failed. Please try again.';
      }
    });
  }

  signupWithApple(): void {
    this.authService.continueSignupWithApple().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Apple signup failed. Please try again.';
      }
    });
  }

}

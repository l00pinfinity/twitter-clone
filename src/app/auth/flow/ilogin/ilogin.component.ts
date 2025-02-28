import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ilogin',
  templateUrl: './ilogin.component.html',
  styleUrls: ['./ilogin.component.scss']
})
export class IloginComponent implements OnInit {

  errorMessage!: string;
  isLoggedIn: Observable<boolean> = this.authService.isLoggedIn();
  currentUser$: Observable<User | null> = this.authService.getCurrentUser();

  ilogin = new UntypedFormGroup({
    usernameOrEmail: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  loginUser(): void {
    if (this.ilogin.valid) {
      const { usernameOrEmail, password } = this.ilogin.value;
      this.authService.loginAccountWithEmail(usernameOrEmail, password).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Login failed. Please try again.';
        }
      });
    }
  }

  loginWithGoogle(): void {
    this.authService.continueSignupWithGoogle().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Google login failed. Please try again.';
      }
    });
  }

  loginWithApple(): void {
    this.authService.continueSignupWithApple().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Apple login failed. Please try again.';
      }
    });
  }

}

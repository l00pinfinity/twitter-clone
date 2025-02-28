import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-isignup',
  templateUrl: './isignup.component.html',
  styleUrls: ['./isignup.component.scss']
})
export class IsignupComponent implements OnInit {

  isSuccessul = false;
  errorMessage!: string;
  isLoggedIn: Observable<boolean> = this.authService.isLoggedIn();
  currentUser$: Observable<User | null> = this.authService.getCurrentUser();

  isignup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    name: new UntypedFormControl('', [Validators.required]),
    username: new UntypedFormControl('', [Validators.required]),
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

  registerUser(): void {
    if (this.isignup.valid) {
      const { email, password, name, username } = this.isignup.value;
      this.authService.createAccountWithEmail(email, password, name, username).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Signup failed. Please try again.';
        }
      });
    }
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

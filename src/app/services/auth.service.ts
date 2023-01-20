import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    localStorage.removeItem('birdappAccessToken');
  }

  public isLoggedIn() {
    return !!localStorage.getItem('birdappAccessToken');
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}


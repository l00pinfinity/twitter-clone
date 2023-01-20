import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  
  constructor() { }

  public setSession(response: { tokenType: string; accessToken: string; }){

    localStorage.removeItem('birdappAccessToken');
    localStorage.setItem('birdappAccessToken', response.accessToken);
  }

  public getAccessToken():string | null{
    return localStorage.getItem('birdappAccessToken');
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, shareReplay, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getTweets(page: Number, size: Number) {
    return this.http.get<any>(environment.apiUrl + '/api/tweets?page=' + page + '&size=' + size);
  }

  public getCurrentUser(){
    return this.http.get<any>(environment.apiUrl + '/api/users/me');
  }

  public getTrendsForYou(size: Number){
    return this.http.get<any>(environment.apiUrl + '/api/trends?size=' + size);
  }
}

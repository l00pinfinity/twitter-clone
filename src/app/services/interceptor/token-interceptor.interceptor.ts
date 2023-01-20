import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const accessToken = this.tokenStorage.getAccessToken();

    if (accessToken != null) {
      authReq = req.clone({ headers: req.headers.set("Authorization", "Bearer " + accessToken) })
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true }
]

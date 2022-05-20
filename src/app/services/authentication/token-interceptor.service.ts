import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpClient, HttpHeaders
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  static accessToken = '';
  refresh = false;

  constructor(private http: HttpClient) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${TokenInterceptorService.accessToken}`
      }
    });

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;
        var refresh_token = ""
        refresh_token = sessionStorage.getItem("refreshToken")!;
        let body = new URLSearchParams();
        body.set('grant_type', 'refresh_token');
        body.set('refresh_token', refresh_token);


        let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post('http://localhost:8080/api/oauth/access_token', body.toString(), options).pipe(
          switchMap((res: any) => {
            console.log(res);
            TokenInterceptorService.accessToken = res.access_token;
            sessionStorage.setItem("refreshToken",res.refresh_token);

            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${TokenInterceptorService.accessToken}`
              }
            }));
          })
        );
      }
      this.refresh = false;
      return throwError(() => err);
    }));
  }
  refresh_token(arg0: string, refresh_token: any) {
    throw new Error('Method not implemented.');
  }
}
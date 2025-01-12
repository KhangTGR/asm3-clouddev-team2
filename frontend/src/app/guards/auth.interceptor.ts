import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.cookieService.get('authToken');
    if (authToken) {
      const cloned = req.clone({
        withCredentials: true,
        setHeaders: {
            Cookie: `authToken="${authToken}"`,
        }
      })
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
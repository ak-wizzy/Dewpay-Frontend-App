import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authService?.currentUserValue;
    if (currentUser && currentUser !== null && currentUser != undefined) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser}`,
        },
      });
    }
    return next.handle(request);
  }
}

import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthServices} from "../../services/auth.services";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth: AuthServices) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`,
        }
      })
    }

    return next.handle(req);
  }
}
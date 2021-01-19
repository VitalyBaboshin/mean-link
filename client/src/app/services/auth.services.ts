import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "./interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthServices {
  private token = null;
  private userId = null;
  private storageName = 'userData';

  auth$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.getStateLocalStorage();
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/registration', user);
  }

  login(user: User): Observable<{token: string, userId: string}> {
    return this.http.post<{token: string, userId: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token, userId}) => {
            localStorage.setItem(this.storageName, JSON.stringify({userId, token}));
            this.setToken(token);
            this.setUserId(userId);
          }
        )
      )
  }

  getStateLocalStorage(): void {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      this.token = userData.token;
    } else {
      this.setToken(null);
    }
  }
  private subAuth():void {
    this.auth$.next(!!this.token);
    console.log('subAuth(): добавили next -> значение,', !!this.token)
  }
  setToken(token: string): void {
    this.token = token;
    this.subAuth();
  }
  setUserId(userId: string): void {
    this.userId = userId;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    this.getStateLocalStorage();
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    this.setUserId(null);
    localStorage.clear();
  }
}

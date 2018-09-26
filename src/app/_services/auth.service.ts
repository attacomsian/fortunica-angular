import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();
  // store the URL so we can redirect after logging in
  private redirectUrl: string;
  // api URL
  private API_URL = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {
  }

  // authenticate
  authenticate(email: string, password: string, isClient: boolean): Observable<any> {
    return this.http.post<any>(this.API_URL + (isClient ? 'client' : 'user') + '/login', {
      email: email,
      password: password
    });
  }

  // register
  register(name: string, email: string, password: string, isClient: boolean): Observable<any> {
    return this.http.post<any>(this.API_URL + (isClient ? 'client' : 'user') + '/signup', {
      name: name,
      email: email,
      password: password
    });
  }

  // list users
  listUsers(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'user/list');
  }

  // push notification
  addPushNotification(subscription: String, type: String): Observable<any> {
    return this.http.post<any>(this.API_URL + '/push/subscribe', {
      subscription: subscription,
      type: type
    });
  }

  /**
   * EXTRA METHODS
   */

  // manually log in user
  logInUser(token: any) {
    localStorage.setItem('auth_token', token);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  /**
   * JWT TOKEN & REDIRECT URL
   */
  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getToken(): string {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    if (!this.getToken()) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  getUserType(): string {
    return this.jwtHelper.decodeToken(this.getToken()).type;
  }

  getUserName(): string {
    return this.jwtHelper.decodeToken(this.getToken()).name;
  }
}

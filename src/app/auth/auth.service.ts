import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5049/api/auth';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>(`${this.baseUrl}/login`, credentials);
  }

  loginSuccess(token: string) {
    localStorage.setItem('access_token', token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}

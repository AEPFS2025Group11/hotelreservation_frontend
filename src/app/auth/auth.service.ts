// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthResponse, LoginRequest, RegisterRequest, User} from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<AuthResponse>('http://localhost:5049/api/auth/login', loginRequest).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  register(registerRequest: RegisterRequest) {
    return this.http.post<AuthResponse>('http://localhost:5049/api/auth/register', registerRequest).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  isLoggedIn$ = this.currentUser$.pipe(
    map(user => !!user)
  );

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  loginSuccess(access_token: any) {
    localStorage.setItem('token', access_token);

    const payload = JSON.parse(atob(access_token.split('.')[1]));

    const user = {
      email: payload.email || 'unbekannt',
      role: payload.role
    };

    this.currentUserSubject.next(user);
  }
}

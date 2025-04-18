// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  email: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string; user: User }>('http://localhost:5049/api/auth/login', credentials).pipe(
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
      roles: [payload.role]
    };

    this.currentUserSubject.next(user);
  }
}

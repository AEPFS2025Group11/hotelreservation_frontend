import {Component, inject} from '@angular/core';
import { AuthService } from './auth/auth.service';
import {Router, RouterOutlet} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIf,
    AsyncPipe
  ],
  template: `
    <nav>
      <button *ngIf="isLoggedIn$ | async" (click)="logout()">Logout</button>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  authService: AuthService = inject(AuthService)
  router: Router = inject(Router)

  isLoggedIn$ = this.authService.isLoggedIn$;


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then();
  }
}

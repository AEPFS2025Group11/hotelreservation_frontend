import {Component, inject} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-admin-navbar',
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {


  authService: AuthService = inject(AuthService)
  router: Router = inject(Router)

  isLoggedIn$ = this.authService.isLoggedIn$;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then();
  }

}

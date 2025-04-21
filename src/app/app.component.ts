import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {RouterOutlet} from '@angular/router';
import {initFlowbite} from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  private authService: AuthService = inject(AuthService);


  ngOnInit() {
    initFlowbite();
    const token = this.authService.getToken();
    if (token) {
      this.authService.loginSuccess(token);
    }
  }


}

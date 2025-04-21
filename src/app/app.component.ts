import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router, RouterOutlet} from '@angular/router';
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


  ngOnInit(): void {
    initFlowbite();
  }


}

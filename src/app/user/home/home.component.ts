import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}

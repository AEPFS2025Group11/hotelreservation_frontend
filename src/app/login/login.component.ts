import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
  ]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login({email: this.email, password: this.password}).subscribe({
      next: (res: any) => {
        this.authService.loginSuccess(res.access_token);
        this.router.navigate(['/dashboard']).then();
      },
      error: (err) => {
        alert('Login fehlgeschlagen');
        console.error(err);
      }
    });
  }


  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        this.authService.loginSuccess(res.access_token);
        this.router.navigate(['/dashboard']).then();
      },
      error: (err) => {
        alert('Login fehlgeschlagen');
        console.error(err);
      }
    });
  }
}

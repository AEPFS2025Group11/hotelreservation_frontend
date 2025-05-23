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
    NgIf,
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  protected errorMessage: string | undefined;

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
    const credentials = {email: this.email, password: this.password};

    this.authService.login(credentials).subscribe({
      next: (response) => {
        const role = response.user.role;

        if (role === 'admin') {
          this.router.navigate(['/dashboard/manage-hotels']).then();
        } else {
          this.router.navigate(['/home/hotels']).then();
        }
      },
      error: err => {
        this.errorMessage = err.error.detail || 'Login fehlgeschlagen';
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']).then();
  }
}

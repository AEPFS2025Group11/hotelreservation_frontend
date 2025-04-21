import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  first_name = '';
  last_name = '';
  protected errorMessage: string | undefined;

  constructor(public router: Router) {
  }

  authService: AuthService = inject(AuthService);

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }


  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Die Passwörter stimmen nicht überein.';
      return;
    }

    const registerData = {
      email: this.email,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        const user = this.authService.getCurrentUser();
        if (user?.role.includes('admin')) {
          this.router.navigate(['/dashboard']).then();
        } else {
          this.router.navigate(['/home/hotels']).then();
        }
      },
      error: (err) => {
        this.errorMessage = err.error.detail || 'Registrierung fehlgeschlagen';
      }
    });
  }
}

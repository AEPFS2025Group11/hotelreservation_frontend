import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {DashboardComponent} from './admin/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

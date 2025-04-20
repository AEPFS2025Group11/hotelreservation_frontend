import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import { UnauthorizedComponent } from './util/unauthorized/unauthorized.component';
import { HomeComponent } from './user/home/home.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },{
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    // data: { role: 'guest' }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }
];

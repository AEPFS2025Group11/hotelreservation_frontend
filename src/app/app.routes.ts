import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {UnauthorizedComponent} from './util/unauthorized/unauthorized.component';
import {HomeComponent} from './user/home/home.component';
import {RegisterComponent} from './register/register.component';
import {HotelSearchComponent} from './user/hotel/hotel-search/hotel-search.component';
import {HotelDetailComponent} from './user/hotel/hotel-detail/hotel-detail.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: '', component: HotelSearchComponent },
            { path: 'hotel/:id', component: HotelDetailComponent }
        ]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {role: 'admin'}
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    }
];

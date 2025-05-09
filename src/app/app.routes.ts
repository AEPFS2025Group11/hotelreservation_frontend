import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {HomeComponent} from './user/home/home.component';
import {RegisterComponent} from './register/register.component';
import {HotelSearchComponent} from './user/home/hotel-search/hotel-search.component';
import {HotelDetailComponent} from './user/home/hotel-search/hotel-detail/hotel-detail.component';
import {BookingComponent} from "./user/home/booking/booking.component";
import {MyBookingsComponent} from "./user/home/my-bookings/my-bookings.component";
import {RoomSearchComponent} from './user/home/room-search/room-search.component';
import {InvoiceDetailComponent} from './user/home/my-bookings/invoice/invoice.component';
import {ReviewComponent} from './user/home/my-bookings/review/review.component';
import {HotelManagementComponent} from './admin/dashboard/hotel-management/hotel-management.component';
import {StatisticsComponent} from './admin/dashboard/statistics/statistics.component';
import {BookingManagementComponent} from './admin/dashboard/booking-management/booking-management.component';
import {RoomManagementComponent} from './admin/dashboard/room-management/room-management.component';
import {BookingDetailsComponent} from './admin/dashboard/booking-management/booking-details/booking-details.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'home/hotels',
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
        {path: 'hotels', component: HotelSearchComponent},
        {path: 'hotels/:id', component: HotelDetailComponent},
        {
          path: 'hotels/:id/rooms/:roomId/book', component: BookingComponent
        },
        {
          path: 'my-bookings', component: MyBookingsComponent, canActivate: [AuthGuard],
          data: {role: 'guest'}
        },
        {path: 'rooms', component: RoomSearchComponent},
        {
          path: 'invoices/:bookingId',
          component: InvoiceDetailComponent
        }, {
          path: 'reviews/:bookingId',
          component: ReviewComponent
        },

      ]
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      data: {role: 'admin'},
      children: [
        {path: 'manage-hotels', component: HotelManagementComponent},
        {
          path: 'manage-bookings',
          component: BookingManagementComponent
        },
        {
          path: 'manage-bookings/:bookingId',
          component: BookingDetailsComponent
        },
        {path: 'manage-rooms', component: RoomManagementComponent},
        {path: 'statistics', component: StatisticsComponent},
      ]
    },
  ]
;

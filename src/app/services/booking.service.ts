import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking, BookingIn } from '../models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private userApi = 'http://localhost:5049/api/users';
  private bookingApi = 'http://localhost:5049/api/bookings';

  constructor(private http: HttpClient) {}

  getUserBookings(userId: number | undefined): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.userApi}/${userId}/bookings`);
  }

  createBooking(booking: BookingIn): Observable<any> {
    return this.http.post(this.bookingApi, booking);
  }
}

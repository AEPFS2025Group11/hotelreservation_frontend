import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private userApi = 'http://localhost:5049/api/users';

  constructor(private http: HttpClient) {}

  getUserBookings(userId: number | undefined): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.userApi}/${userId}/bookings`);
  }
}

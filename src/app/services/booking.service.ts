import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookingOut} from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private userApi = 'http://localhost:5049/api/users';
  private bookingApi = 'http://localhost:5049/api/bookings';

  constructor(private http: HttpClient) {}

  getUserBookings(userId: number | undefined): Observable<BookingOut[]> {
    return this.http.get<BookingOut[]>(`${this.userApi}/${userId}/bookings`);
  }

  createBooking(booking: {
    user_id: number;
    room_id: string | null;
    check_in: string;
    check_out: string;
    is_cancelled: boolean;
    total_amount: number
  }): Observable<any> {
    return this.http.post(this.bookingApi, booking);
  }

  cancelBooking(id: number) {
    return this.http.patch(`${this.bookingApi}/${id}/cancel`,null);
  }

  getAllBookingsAdmin(): Observable<BookingOut[]> {
    return this.http.get<BookingOut[]>(this.bookingApi);
  }
}

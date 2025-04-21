import {Component, inject, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking.model';
import {BookingService} from '../../../services/booking.service';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-my-bookings',
  imports: [
    CommonModule
  ],
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  error: string | null = null;
  private authService: AuthService = inject(AuthService);

  constructor(private bookingService: BookingService) {
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.bookingService.getUserBookings(userId).subscribe({
      next: data => this.bookings = data,
      error: err => {
        this.error = 'Fehler beim Laden der Buchungen.';
        console.error(err);
      }
    });
  }
}

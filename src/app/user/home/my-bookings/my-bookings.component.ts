import {Component, inject, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking.model';
import {BookingService} from '../../../services/booking.service';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';

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

  router: Router = inject(Router);

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

  cancelBooking(bookingId: number) {
    if (!confirm('Möchtest du diese Buchung wirklich stornieren?')) return;

    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.is_cancelled = true;
          booking.total_amount = 0;
        }
      },
      error: err => {
        console.error(err);
        this.error = err.error.detail || 'Fehler beim Stornieren der Buchung.';
      }
    });
  }

  openInvoice(bookingId: number) {
    this.router.navigate(['/home/invoices', bookingId]).then();
  }

  writeReview(bookingId: number) {
    this.router.navigate(['/home/reviews', bookingId]).then();
  }
}

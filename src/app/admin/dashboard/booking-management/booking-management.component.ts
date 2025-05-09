import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingOut} from '../../../models/booking.model';
import {BookingService} from '../../../services/booking.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-booking-management',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './booking-management.component.html',
})
export class BookingManagementComponent implements OnInit {
  bookings: BookingOut[] = [];
  error: string = '';


  private bookingService: BookingService = inject(BookingService)
  private router: Router = inject(Router)
  protected selectedBooking: BookingOut | undefined;


  ngOnInit() {
    this.loadBookings();
  }

  private loadBookings() {
    this.bookingService.getAllBookingsAdmin().subscribe({
      next: (data) => this.bookings = data,
      error: () => this.error = 'Fehler beim Laden der Buchungen.'
    });
  }

  selectBooking(booking_id: number) {
    this.router.navigate(['dashboard/manage-bookings/', booking_id, 'edit'])
  }

  onBookingUpdated(): void {
    this.loadBookings();
    this.selectedBooking = undefined
  }

  deleteBooking(id: number): void {
    if (confirm('Möchten Sie diese Buchung wirklich löschen?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(b => b.id !== id);
        },
        error: () => {
          this.error = 'Fehler beim Löschen der Buchung.';
        }
      });
    }
  }
}

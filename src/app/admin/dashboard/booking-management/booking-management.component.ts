import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingOut} from '../../../models/booking.model';
import {BookingService} from '../../../services/booking.service';

@Component({
  selector: 'app-booking-management',
  imports: [
    CommonModule
  ],
  templateUrl: './booking-management.component.html',
})
export class BookingManagementComponent {
  bookings: BookingOut[] = [];
  error: string = '';

  private bookingService: BookingService = inject(BookingService);

  ngOnInit() {
    this.bookingService.getAllBookingsAdmin().subscribe({
      next: (data) => this.bookings = data,
      error: () => this.error = 'Fehler beim Laden der Buchungen.'
    });
  }
}

import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {BookingService} from '../../../services/booking.service';
import {AuthService} from '../../../auth/auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-booking-form',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './booking.component.html'
})
export class BookingComponent {
  @Input() roomId!: number;

  checkInDate: string = '';
  checkOutDate: string = '';
  bookingSuccess = false;
  errorMessage = '';

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  bookRoom() {
    const userId = this.authService.getUserId();

    if (!userId) {
      this.errorMessage = 'Nicht eingeloggt!';
      return;
    }

    this.bookingService.createBooking({
      user_id: userId,
      room_id: this.roomId,
      check_in: this.checkInDate,
      check_out: this.checkOutDate,
      is_cancelled: false,
      total_amount: 0
    }).subscribe({
      next: () => {
        this.bookingSuccess = true;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Buchung fehlgeschlagen.';
      }
    });
  }
}

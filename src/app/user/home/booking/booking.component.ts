import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
  checkInDate: string = '';
  checkOutDate: string = '';
  bookingSuccess = false;
  errorMessage = '';

  roomId!: string | null;

  constructor(private route: ActivatedRoute) {}

  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  bookingService: BookingService = inject(BookingService);

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.checkInDate = this.route.snapshot.queryParamMap.get('check_in') || '';
    this.checkOutDate = this.route.snapshot.queryParamMap.get('check_out') || '';
  }

  bookRoom() {
    const userId = this.authService.getUserId();

    if (!userId) {
      this.errorMessage = 'Nicht eingeloggt!';
      this.router.navigate(['/login']);
      return;
    }

    if (!this.roomId) {
      this.errorMessage = 'Kein Zimmer angegeben!';
      return;
    }

    if (!this.checkInDate || !this.checkOutDate) {
      this.errorMessage = 'Bitte Check-In und Check-Out wählen.';
      return;
    }

    if (new Date(this.checkInDate) >= new Date(this.checkOutDate)) {
      this.errorMessage = 'Check-Out muss nach Check-In liegen.';
      return;
    }

    this.bookingService.createBooking({
      user_id: userId,
      room_id: this.roomId, // cast to number
      check_in: this.checkInDate,
      check_out: this.checkOutDate,
      is_cancelled: false,
      total_amount: 0
    }).subscribe({
      next: () => {
        this.bookingSuccess = true;
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/home/my-bookings']).then();
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Buchung fehlgeschlagen.';
      }
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RoomService} from '../../../services/room.service';
import {RoomOut} from '../../../models/room.model';

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
  private roomService: RoomService = inject(RoomService);
  room: RoomOut | undefined;

  constructor(private route: ActivatedRoute) {}

  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  bookingService: BookingService = inject(BookingService);

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.checkInDate = this.route.snapshot.queryParamMap.get('check_in') || '';
    this.checkOutDate = this.route.snapshot.queryParamMap.get('check_out') || '';
    this.roomService.getRoom(this.roomId).subscribe({
      next: (room) => this.room = room,
      error: () => this.errorMessage = 'Zimmer konnte nicht geladen werden.'
    });
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
      total_amount: this.calculateTotalAmount(this.checkInDate, this.checkOutDate)
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

  calculateTotalAmount(checkInDate: string, checkOutDate: string): number {
    if (!this.room) return 0;
    return this.calculateNights(checkInDate, checkOutDate) *
      (this.room.dynamic_price_per_night ?? this.room.price_per_night);
  }

  calculateNights(checkInDate: string, checkOutDate: string): number {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  }

  formatStayInfo(checkInDate: string, checkOutDate: string): string {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return 'Ungültiges Datum';
    }

    const diffTime = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (nights <= 0) return 'Ungültiger Zeitraum';

    const formatter = new Intl.DateTimeFormat('de-CH', {
      day: '2-digit',
      month: '2-digit'
    });

    const from = formatter.format(checkIn);   // → z. B. 10.07.
    const to = formatter.format(checkOut);    // → z. B. 13.07.

    return `${nights} Nacht${nights > 1 ? 'e' : ''}, ${from}–${to}`;
  }


}

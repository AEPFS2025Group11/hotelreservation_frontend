import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {PaymentIn, PaymentMethod, PaymentOut} from '../../../../models/payment.model';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {BookingService} from '../../../../services/booking.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  imports: [
    FormsModule,
    NgIf
  ]
})
export class PaymentComponent implements OnInit {

  private bookingService: BookingService = inject(BookingService);
  private activatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router)
  private paymentService: PaymentService = inject(PaymentService)

  booking_id: number = 0;
  error: string | null = null;
  success: string | null = null;

  payment: PaymentIn = {
    booking_id: 0,
    invoice_id: 0,
    method: PaymentMethod.TWINT,
    amount: 0
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.booking_id = +params['bookingId'];
      this.loadBookingDetails();
    });
  }

  pay() {
    if (this.payment.amount <= 0) {
      this.error = 'Der Betrag muss größer als 0 sein.';
      return;
    }

    const payload: PaymentIn = {
      booking_id: this.payment.booking_id,
      invoice_id: this.payment.invoice_id,
      method: this.payment.method,
      amount: this.payment.amount
    };

    this.paymentService.create(payload).subscribe({
      next: () => {
        this.success = 'Erfolgreich bezahlt';
        setTimeout(() => {
          this.router.navigate(['/home/my-bookings']).then();
        }, 1500);
      },
      error: (err) => {
        this.error = err.error.detail;
      }
    });
  }


  private loadBookingDetails() {
    this.bookingService.getById(this.booking_id).subscribe(
      booking => {
        if (booking) {
          this.payment.booking_id = booking.id;
          this.payment.invoice_id = booking.invoice.id
          this.payment.amount = booking.total_amount;
        } else {
          this.error = 'Buchung nicht gefunden.';
        }
      },
      err => {
        this.error = 'Fehler beim Laden der Buchung. Bitte versuchen Sie es später noch einmal.';
      }
    );
  }

  back() {
    this.router.navigate(['home/my-bookings']).then()
  }
}

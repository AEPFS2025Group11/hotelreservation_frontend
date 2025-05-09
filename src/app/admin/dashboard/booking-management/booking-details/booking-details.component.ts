import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BookingOut, BookingUpdate} from "../../../../models/booking.model";
import {BookingService} from "../../../../services/booking.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-booking-details',
  imports: [
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './booking-details.component.html',
})
export class BookingDetailsComponent implements OnInit {
  booking!: BookingOut;
  form!: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {
  }

  private router: Router = inject(Router)

  ngOnInit(): void {
    const bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    this.bookingService.getById(bookingId).subscribe((data: BookingOut) => {
      this.booking = data;
      this.form = this.fb.group({
        check_in: [data.check_in, Validators.required],
        check_out: [data.check_out, Validators.required],
        is_cancelled: [data.is_cancelled, Validators.required],
        total_amount: [data.total_amount, [Validators.required, Validators.min(0)]]
      });
    });
  }

  onCancel(): void {
    this.router.navigate(['dashboard/manage-bookings']).then();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const booking: BookingUpdate = this.form.value
      booking.room_id = this.booking.id
      this.bookingService.update(this.booking.id, booking).subscribe({
        next: () => {
          this.booking = {...this.booking, ...this.form.value};
          this.isEditing = false
          this.router.navigate(['dashboard/manage-bookings']).then()
          alert('✅ Änderungen gespeichert');
        },
        error: () => alert('❌ Fehler beim Speichern')
      });
    }
  }
}


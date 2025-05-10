import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoiceOut} from '../../../../models/invoice.model';
import {InvoiceService} from '../../../../services/invoice.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-invoice',
  imports: [
    CommonModule
  ],
  templateUrl: './invoice.component.html'
})
export class InvoiceComponent implements OnInit {

  invoice!: InvoiceOut;
  error: string = '';
  private router: Router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {
  }

  ngOnInit(): void {
    const bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    this.invoiceService.getInvoiceByBookingId(bookingId).subscribe({
      next: (data) => this.invoice = data,
      error: (err) => {
        console.error(err);
        this.error = 'Rechnung konnte nicht geladen werden.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home/my-bookings']).then();
  }

  pay_invoice(id: number) {
    this.router.navigate(['home/my-bookings', id, 'pay']).then()
  }
}

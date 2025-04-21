import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Invoice} from '../../../../models/invoice.model';
import {InvoiceService} from '../../../../services/invoice.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-invoice',
  imports: [
    CommonModule
  ],
  templateUrl: './invoice.component.html'
})
export class InvoiceDetailComponent implements OnInit {
  invoice!: Invoice;
  error: string = '';

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
}

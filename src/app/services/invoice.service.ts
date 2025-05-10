import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvoiceOut} from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:5049/api/invoices';

  constructor(private http: HttpClient) {
  }

  getInvoiceByBookingId(bookingId: number): Observable<InvoiceOut> {
    return this.http.get<InvoiceOut>(`${this.apiUrl}/${bookingId}`);
  }
}

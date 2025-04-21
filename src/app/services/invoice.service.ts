import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Invoice} from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:5049/api/invoices';

  constructor(private http: HttpClient) {}

  getInvoiceByBookingId(bookingId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${bookingId}`);
  }
}

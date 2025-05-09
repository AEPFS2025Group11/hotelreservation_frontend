import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PaymentIn} from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:5049/api/payments/';

  constructor(private http: HttpClient) {}

  create(payment: PaymentIn): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payment);
  }
}

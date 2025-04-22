import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:5049/api/addresses/';

  constructor(private http: HttpClient) {}

  createAddress(address: { street: string; zip_code: string; city: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, address);
  }
}

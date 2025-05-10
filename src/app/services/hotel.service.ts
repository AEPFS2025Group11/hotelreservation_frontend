import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelIn, HotelOut} from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:5049/api/hotels/';

  constructor(private http: HttpClient) {
  }

  searchHotels(filters: {
    city?: string;
    minStars?: number;
    guests?: number;
    checkIn?: string;
    checkOut?: string;
  }): Observable<HotelOut[]> {
    let params = new HttpParams();

    if (filters.city) {
      params = params.set('city', filters.city);
    }

    if (filters.minStars !== undefined && filters.minStars !== null) {
      params = params.set('min_stars', filters.minStars.toString());
    }

    if (filters.guests !== undefined && filters.guests !== null) {
      params = params.set('capacity', filters.guests.toString());
    }

    if (filters.checkIn) {
      params = params.set('check_in', filters.checkIn);
    }

    if (filters.checkOut) {
      params = params.set('check_out', filters.checkOut);
    }

    return this.http.get<HotelOut[]>(this.apiUrl, {params});
  }

  getAllHotels(): Observable<HotelOut[]> {
    return this.http.get<HotelOut[]>(`${this.apiUrl}admin`);
  }

  updateHotel(id: number, hotel: HotelIn): Observable<HotelOut> {
    return this.http.put<HotelOut>(`${this.apiUrl}${id}`, hotel);
  }

  createHotel(hotel: HotelIn): Observable<HotelOut> {
    return this.http.post<HotelOut>(this.apiUrl, hotel);
  }

  deleteHotel(id: number): Observable<HotelOut> {
    return this.http.delete<HotelOut>(`${this.apiUrl}${id}`);
  }

  getById(id:number): Observable<HotelOut> {
    return this.http.get<HotelOut>(`${this.apiUrl}${id}`)
  }


}

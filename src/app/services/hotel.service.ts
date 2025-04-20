import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Hotel} from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:5049/api/hotels';

  constructor(private http: HttpClient) {}

  searchHotels(filters: {
    city: string;
    minStars: number;
    guests: number;
    checkIn: string;
    checkOut: string;
  }): Observable<Hotel[]> {
    let params = new HttpParams()
      .set('city', filters.city)
      .set('min_stars', filters.minStars.toString())
      .set('capacity', filters.guests.toString())
      .set('check_in', filters.checkIn)
      .set('check_out', filters.checkOut);

    return this.http.get<Hotel[]>(this.apiUrl, { params });
  }

}

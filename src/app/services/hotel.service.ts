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
    city?: string;
    minStars?: number;
    guests?: number;
    checkIn?: string;
    checkOut?: string;
  }): Observable<Hotel[]> {
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

    return this.http.get<Hotel[]>(this.apiUrl, { params });
  }

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotel);
  }

  updateHotel(id: number, hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.apiUrl}/${id}`, hotel);
  }

  deleteHotel(id: number): Observable<Hotel> {
    return this.http.delete<Hotel>(`${this.apiUrl}/${id}`);
  }


}

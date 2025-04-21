import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import {Hotel} from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5049/api/rooms';

  constructor(private http: HttpClient) {}

  getRoomsByHotel(hotelId: number, filters: {
    capacity: number | null;
    checkIn: string;
    checkOut: string
  }): Observable<Room[]> {
    let params = new HttpParams();

    if (filters.capacity) {
      params = params.set('capacity', filters.capacity.toString());
    }
    if (filters.checkIn) {
      params = params.set('check_in', filters.checkIn);
    }
    if (filters.checkOut) {
      params = params.set('check_out', filters.checkOut);
    }

    return this.http.get<Room[]>(`http://localhost:5049/api/hotels/${hotelId}/rooms`, { params });
  }

  searchRooms(filters: {
    city?: string;
    minStars?: number;
    guests?: number;
    checkIn?: string;
    checkOut?: string;
  }): Observable<Room[]> {
    let params = new HttpParams();

    if (filters.city) {
      params = params.set('city', filters.city);
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

    return this.http.get<Room[]>(this.apiUrl, { params });
  }

}

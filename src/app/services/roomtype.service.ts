import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RoomTypeOut} from '../models/room-type.model';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  private apiUrl = 'http://localhost:5049/api/room_types/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<RoomTypeOut[]> {
    return this.http.get<RoomTypeOut[]>(this.apiUrl);
  }
}

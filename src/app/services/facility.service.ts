import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FacilityOut} from '../models/facility.model';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private apiUrl = 'http://localhost:5049/api/facilities/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<FacilityOut[]> {
    return this.http.get<FacilityOut[]>(this.apiUrl);
  }
}

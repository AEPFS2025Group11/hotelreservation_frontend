import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private baseUrl = 'http://localhost:5049/api/statistics';

  constructor(private http: HttpClient) {}

  getOccupancyByRoomType() {
    return this.http.get<any[]>(`${this.baseUrl}/occupancy-by-room-type`);
  }

  getDemographics() {
    return this.http.get<any>(`${this.baseUrl}/demographics`);
  }
}

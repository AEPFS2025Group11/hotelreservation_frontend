import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Review} from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5049/api/reviews';

  constructor(private http: HttpClient) {}

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  getByBookingId(bookingId: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/bookings/${bookingId}`);
  }

  getReviewsByHotel(hotelId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/hotel/${hotelId}`);
  }

  getReviewsByUser(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteReview(reviewId: number): Observable<Review> {
    return this.http.delete<Review>(`${this.apiUrl}/${reviewId}`);
  }
}

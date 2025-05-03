import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReviewIn, ReviewOut} from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5049/api/reviews';

  constructor(private http: HttpClient) {}

  createReview(review: ReviewIn): Observable<ReviewOut> {
    return this.http.post<ReviewOut>(this.apiUrl, review);
  }

  getByBookingId(bookingId: number): Observable<ReviewOut> {
    return this.http.get<ReviewOut>(`${this.apiUrl}/bookings/${bookingId}`);
  }

  getReviewsByHotel(hotelId: number): Observable<ReviewOut[]> {
    return this.http.get<ReviewOut[]>(`${this.apiUrl}/hotel/${hotelId}`);
  }

  getReviewsByUser(userId: number): Observable<ReviewOut[]> {
    return this.http.get<ReviewOut[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteReview(reviewId: number): Observable<ReviewOut> {
    return this.http.delete<ReviewOut>(`${this.apiUrl}/${reviewId}`);
  }
}

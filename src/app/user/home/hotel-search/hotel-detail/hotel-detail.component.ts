import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../../../services/room.service';
import {FormsModule} from '@angular/forms';
import {RoomCardComponent} from '../../room-card/room-card.component';
import {CommonModule} from '@angular/common';
import {RoomOut} from '../../../../models/room.model';
import {ReviewService} from '../../../../services/review.service';
import {ReviewOut} from '../../../../models/review.model';

@Component({
  selector: 'app-hotel-detail',
  imports: [
    FormsModule,
    RoomCardComponent,
    CommonModule
  ],
  templateUrl: './hotel-detail.component.html'
})
export class HotelDetailComponent implements OnInit {
  hotelId!: number;
  rooms: RoomOut[] = [];
  checkInDate: string = '';
  checkOutDate: string = '';
  capacity: number | null = null;
  error: string | null = null;
  reviews: ReviewOut[] = [];

  private roomService: RoomService = inject(RoomService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private reviewService: ReviewService = inject(ReviewService);

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    this.checkInDate = this.route.snapshot.queryParamMap.get('check_in') || '';
    this.checkOutDate = this.route.snapshot.queryParamMap.get('check_out') || '';

    this.loadRooms();
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviewsByHotel(this.hotelId)
      .subscribe({
        next: (data) => {
          this.reviews = data;
        },
        error: (err) => {
          this.error = 'Fehler beim Laden der Reviews.';
          console.error(err);
        }
      });
  }

  loadRooms(): void {
    this.roomService.getRoomsByHotel(this.hotelId, {
      capacity: this.capacity,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate
    })
      .subscribe({
        next: (data) => {
          this.rooms = data;
        },
        error: (err) => {
          this.error = 'Fehler beim Laden der Zimmer.';
          console.error(err);
        }
      });
  }
}

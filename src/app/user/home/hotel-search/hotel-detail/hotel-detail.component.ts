import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../../../../models/room.model';
import {RoomService} from '../../../../services/room.service';
import {FormsModule} from '@angular/forms';
import {RoomCardComponent} from '../../room-card/room-card.component';
import {CommonModule} from '@angular/common';

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
  rooms: Room[] = [];
  checkInDate: string = '';
  checkOutDate: string = '';
  capacity: number | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {
  }

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    this.checkInDate = this.route.snapshot.queryParamMap.get('check_in') || '';
    this.checkOutDate = this.route.snapshot.queryParamMap.get('check_out') || '';

    this.loadRooms();
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

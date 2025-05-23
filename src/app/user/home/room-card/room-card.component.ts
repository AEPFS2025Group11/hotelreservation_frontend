import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {RoomOut} from '../../../models/room.model';

@Component({
  selector: 'app-room-card',
  imports: [
    CommonModule
  ],
  templateUrl: './room-card.component.html'
})
export class RoomCardComponent {
  @Input() room!: RoomOut;
  @Input() checkInDate!: string;
  @Input() checkOutDate!: string;

  router: Router = inject(Router);

  bookRoom() {
    const checkIn = this.checkInDate;
    const checkOut = this.checkOutDate;

    if (!checkIn || !checkOut) {
      this.router.navigate(
        ['home/hotels', this.room.hotel.id, 'rooms', this.room.id, 'book']).then();
      return;
    }


    this.router.navigate(
      ['home/hotels', this.room.hotel.id, 'rooms', this.room.id, 'book'],
      {
        queryParams: {
          check_in: checkIn,
          check_out: checkOut
        }
      }
    ).then();
  }
}

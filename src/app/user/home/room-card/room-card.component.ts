import {Component, inject, Input} from '@angular/core';
import {Room} from '../../../models/room.model';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room-card',
  imports: [
    CommonModule
  ],
  templateUrl: './room-card.component.html'
})
export class RoomCardComponent {
  @Input() room!: Room;

  router: Router = inject(Router);

  bookRoom() {
    this.router.navigate(['home/hotels', this.room.hotel.id, 'rooms', this.room.id, 'book']).then();
  }
}

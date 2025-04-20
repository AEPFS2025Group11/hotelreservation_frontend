import { Component, Input } from '@angular/core';
import {Room} from '../../../models/room.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-room-card',
  imports: [
    CommonModule
  ],
  templateUrl: './room-card.component.html'
})
export class RoomCardComponent {
  @Input() room!: Room;
}

import {Component, inject, OnInit} from '@angular/core';
import {RoomOut} from '../../../models/room.model';
import {RoomService} from '../../../services/room.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-room-management',
  imports: [
    CommonModule
  ],
  templateUrl: './room-management.component.html',
})
export class RoomManagementComponent implements OnInit {
  rooms: RoomOut[] = [];
  error = '';

  private roomService = inject(RoomService);

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe({
      next: (data) => this.rooms = data,
      error: () => this.error = 'Fehler beim Laden der Zimmer.'
    });
  }
}

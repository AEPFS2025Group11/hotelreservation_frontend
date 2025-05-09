import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RoomCardComponent} from '../room-card/room-card.component';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {RoomService} from '../../../services/room.service';
import {RoomOut} from '../../../models/room.model';

@Component({
  selector: 'app-room-search',
  imports: [
    FormsModule,
    RoomCardComponent,
    CommonModule
  ],
  templateUrl: './room-search.component.html',
})
export class RoomSearchComponent implements OnInit{
  city: string = '';
  capacity: number | null = null;
  checkInDate: string = '';
  checkOutDate: string = '';

  filteredRooms: RoomOut[] = [];
  error: string | null = null;
  showSearch = true;

  constructor(private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.search();
  }

  router: Router = inject(Router);

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  search(): void {
    this.roomService.searchRooms({
      city: this.city || undefined,
      guests: this.capacity ?? undefined,
      checkIn: this.checkInDate || undefined,
      checkOut: this.checkOutDate || undefined
    }).subscribe({
      next: (rooms) => {
        this.filteredRooms = rooms;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Fehler beim Laden der Zimmer.';
        console.error(err);
      }
    });
  }

  selectRoom(room: RoomOut) {
    this.router.navigate(['home/rooms', room.id]).then();
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hotel-search.component.html'
})
export class HotelSearchComponent {
  city: string = '';
  minStars: number | null = null;
  guests: number | null = null;
  checkInDate: string = '';
  checkOutDate: string = '';

  filteredHotels: Hotel[] = [];
  error: string | null = null;

  constructor(private hotelService: HotelService) {}

  search() {
    this.hotelService.searchHotels({
      city: this.city || undefined,
      minStars: this.minStars ?? undefined,
      guests: this.guests ?? undefined,
      checkIn: this.checkInDate || undefined,
      checkOut: this.checkOutDate || undefined
    }).subscribe({
      next: (hotels) => {
        this.filteredHotels = hotels;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Fehler beim Laden der Hotels.';
        console.error(err);
      }
    });
  }
}

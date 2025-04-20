import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Hotel} from '../../models/hotel.model';
import {HotelService} from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-search',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './hotel-search.component.html'
})
export class HotelSearchComponent {
  city = '';
  minStars = 0;
  guests = 1;
  checkInDate: string = '';
  checkOutDate: string = '';

  filteredHotels: Hotel[] = [];
  error: string | null = null;

  constructor(private hotelService: HotelService) {
  }

  search() {
    if (!this.city || !this.checkInDate || !this.checkOutDate) {
      this.error = 'Bitte alle Pflichtfelder ausfüllen.';
      return;
    }

    this.hotelService.searchHotels({
      city: this.city,
      minStars: this.minStars,
      guests: this.guests,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate
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

import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Hotel} from '../../../models/hotel.model';
import {HotelService} from '../../../services/hotel.service';
import {HotelCardComponent} from '../hotel-card/hotel-card.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [FormsModule, CommonModule, HotelCardComponent],
  templateUrl: './hotel-search.component.html'
})
export class HotelSearchComponent implements OnInit {
  city: string = '';
  minStars: number | null = null;
  guests: number | null = null;
  checkInDate: string | null = null;
  checkOutDate: string | null = null;

  filteredHotels: Hotel[] = [];
  error: string | null = null;

  constructor(private hotelService: HotelService) {
  }

  ngOnInit(): void {
    this.search();
  }

  router: Router = inject(Router);

  search(): void {
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

  selectHotel(hotel: Hotel) {
    if (!this.checkInDate || !this.checkOutDate) {
      this.router.navigate(['home/hotels', hotel.id]).then();
      return;
    }

    this.router.navigate(['home/hotels', hotel.id],
      {
        queryParams: {
          check_in: this.checkInDate,
          check_out: this.checkOutDate,
        }
      }).then();
  }
}

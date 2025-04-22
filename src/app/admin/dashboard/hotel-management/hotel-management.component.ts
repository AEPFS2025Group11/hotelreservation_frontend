import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../models/hotel.model';
import { HotelService } from '../../../services/hotel.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-hotel-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-management.component.html'
})
export class HotelManagementComponent implements OnInit {
  hotels: Hotel[] = [];
  selectedHotel: Hotel | null = null;
  newHotel: Partial<Hotel> = {};
  error = '';
  success = '';

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (hotels) => this.hotels = hotels,
      error: () => this.error = 'Fehler beim Laden der Hotels.'
    });
  }

  selectHotel(hotel: Hotel) {
    this.selectedHotel = { ...hotel };
    this.success = '';
    this.error = '';
  }

  saveHotel() {
    if (!this.selectedHotel) return;

    this.hotelService.updateHotel(this.selectedHotel.id, this.selectedHotel).subscribe({
      next: () => {
        this.success = 'Hotel erfolgreich aktualisiert.';
        this.selectedHotel = null;
        this.loadHotels();
      },
      error: () => this.error = 'Fehler beim Aktualisieren des Hotels.'
    });
  }

  createHotel() {
    if (!this.newHotel.name || !this.newHotel.stars) {
      this.error = 'Name und Sterne sind erforderlich.';
      return;
    }

    this.hotelService.createHotel(this.newHotel as Hotel).subscribe({
      next: () => {
        this.success = 'Hotel erfolgreich erstellt.';
        this.newHotel = {};
        this.loadHotels();
      },
      error: () => this.error = 'Fehler beim Erstellen des Hotels.'
    });
  }

  deleteHotel(id: number) {
    this.hotelService.deleteHotel(id).subscribe({
      next: () => {
        this.success = 'Hotel gelöscht.';
        this.loadHotels();
      },
      error: () => this.error = 'Fehler beim Löschen des Hotels.'
    });
  }
}

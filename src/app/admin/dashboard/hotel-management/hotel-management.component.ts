import { Component, inject, OnInit } from '@angular/core';
import { HotelOut } from '../../../models/hotel.model';
import { AddressIn } from '../../../models/address.model';
import { HotelService } from '../../../services/hotel.service';
import { AddressService } from '../../../services/address.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-management.component.html'
})
export class HotelManagementComponent implements OnInit {
  hotels: HotelOut[] = [];
  selectedHotel: HotelOut | null = null;
  showCreateForm: boolean = false;

  hotelName: string = '';
  hotelStars: number = 1;

  address: AddressIn = {
    street: '',
    city: '',
    zip_code: ''
  };

  error = '';
  success = '';

  private addressService = inject(AddressService);
  private hotelService = inject(HotelService);

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (hotels) => this.hotels = hotels,
      error: () => this.error = 'Fehler beim Laden der Hotels.'
    });
  }

  editHotel(hotel: HotelOut) {
    this.selectedHotel = hotel;
    this.hotelName = hotel.name;
    this.hotelStars = hotel.stars;
    this.address = { ...hotel.address };
    this.showCreateForm = true;
    this.success = '';
    this.error = '';
  }

  cancelEdit() {
    this.selectedHotel = null;
    this.hotelName = '';
    this.hotelStars = 1;
    this.address = {
      street: '',
      zip_code: '',
      city: ''
    };
    this.showCreateForm = false;
  }

  saveHotel() {
    const isEdit = !!this.selectedHotel;

    this.addressService.createAddress(this.address).subscribe({
      next: (savedAddress) => {
        const hotelPayload = {
          name: this.hotelName,
          stars: this.hotelStars,
          address_id: savedAddress.id
        };

        const request$ = isEdit
          ? this.hotelService.updateHotel(this.selectedHotel!.id, hotelPayload)
          : this.hotelService.createHotel(hotelPayload);

        request$.subscribe({
          next: () => {
            this.success = isEdit ? 'Hotel aktualisiert!' : 'Hotel erfolgreich erstellt!';
            this.error = '';
            this.cancelEdit();
            this.loadHotels();
          },
          error: () => {
            this.error = isEdit
              ? 'Fehler beim Aktualisieren des Hotels.'
              : 'Fehler beim Erstellen des Hotels.';
            this.success = '';
          }
        });
      },
      error: () => {
        this.error = 'Fehler beim Speichern der Adresse.';
      }
    });
  }

  deleteHotel(id: number) {
    this.hotelService.deleteHotel(id).subscribe({
      next: () => {
        this.success = 'Hotel erfolgreich gelöscht.';
        this.loadHotels();
      },
      error: () => {
        this.error = 'Fehler beim Löschen des Hotels.';
      }
    });
  }
}

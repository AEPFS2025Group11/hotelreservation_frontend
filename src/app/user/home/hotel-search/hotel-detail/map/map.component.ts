import { AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { HotelOut } from '../../../../../models/hotel.model';
import { HotelService } from '../../../../../services/hotel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges, OnInit {
  hotelService: HotelService = inject(HotelService);
  route: ActivatedRoute = inject(ActivatedRoute);
  hotel!: HotelOut;
  private map!: L.Map;

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      this.loadHotel(Number(hotelId));
    }
  }

  loadHotel(hotelId: number): void {
    this.hotelService.getById(hotelId).subscribe({
      next: (value: HotelOut) => {
        this.hotel = value;
        this.tryInitMap(); // Initialize map once hotel data is loaded
      },
      error: err => {
        console.error('Fehler beim Laden des Hotels:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    // No need to call tryInitMap here, as it's handled after the hotel data is loaded
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hotel'] && this.hotel) {
      this.tryInitMap();
    }
  }

  private tryInitMap(): void {
    if (this.hotel) {
      const lat = this.hotel?.address?.latitude;
      const lng = this.hotel?.address?.longitude;

      if (lat != null && lng != null && !this.map) {
        this.initMap(lat, lng);
      } else {
        console.warn('Karteninitialisierung übersprungen – ungültige Koordinaten:', this.hotel);
      }
    }
  }

  private initMap(lat: number, lng: number): void {
    this.map = L.map('map').setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`<strong>${this.hotel.name}</strong>`);

    setTimeout(() => this.map.invalidateSize(), 0);
  }
}

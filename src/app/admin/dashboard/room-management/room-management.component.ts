import {Component, inject, OnInit} from '@angular/core';
import {RoomOut} from '../../../models/room.model';
import {RoomService} from '../../../services/room.service';
import {CommonModule, ViewportScroller} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HotelOut} from '../../../models/hotel.model';
import {HotelService} from '../../../services/hotel.service';
import {RoomTypeOut} from '../../../models/room-type.model';
import {RoomTypeService} from '../../../services/roomtype.service';
import {Observable} from 'rxjs';
import {FacilityService} from '../../../services/facility.service';
import {FacilityOut} from '../../../models/facility.model';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-management.component.html',
})
export class RoomManagementComponent implements OnInit {
  hotels: HotelOut[] = [];
  rooms: RoomOut[] = [];
  roomTypes: RoomTypeOut[] = [];
  facilities: FacilityOut[] = [];

  showCreateForm: boolean = false;
  selectedRoom: RoomOut | null = null;
  roomNumber: string = '';
  selectedFacilityIds: number[] = [];
  selectedRoomTypeId: number = 0;
  pricePerNight: number = 0;
  hotelSearch = '';
  selectedHotelId: number = 0;
  showDropdown = false;

  error = '';
  success = '';
  isLoading = false;

  private roomService = inject(RoomService);
  private hotelService = inject(HotelService);
  private roomTypeService = inject(RoomTypeService);
  private facilityService = inject(FacilityService);
  private viewportScroller: ViewportScroller = inject(ViewportScroller);

  ngOnInit(): void {
    this.loadRoomTypes();
    this.loadHotels();
    this.loadRooms();
    this.loadFacilities()
  }

  resetFeedback() {
    this.error = '';
    this.success = '';
  }


  onFacilityChange(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleFacility(id, checked);
  }

  toggleFacility(id: number, checked: boolean): void {
    if (checked) {
      this.selectedFacilityIds.push(id);
    } else {
      this.selectedFacilityIds = this.selectedFacilityIds.filter(fid => fid !== id);
    }
    console.log(this.selectedFacilityIds);
  }

  selectHotel(hotel: HotelOut) {
    this.hotelSearch = hotel.name;
    this.selectedHotelId = hotel.id;
    this.showDropdown = false;
    this.resetFeedback();
  }

  hideDropdown() {
    setTimeout(() => (this.showDropdown = false), 200);
  }

  saveRoom() {
    const isEdit = !!this.selectedRoom;

    let request$: Observable<RoomOut> | undefined;

    const payload = {
      room_number: this.roomNumber,
      hotel_id: this.selectedHotelId,
      type_id: this.selectedRoomTypeId,
      price_per_night: this.pricePerNight,
      facility_ids: this.selectedFacilityIds
    }
    console.log(payload.facility_ids,)
    if (isEdit) {
      request$ = this.roomService.update(this.selectedRoom!.id, payload);
    } else {
      request$ = this.roomService.create(payload);
    }

    if (!request$) {
      this.error = 'Es ist ein interner Fehler aufgetreten (ungültige Anfrage).';
      return;
    }

    this.isLoading = true;
    request$.subscribe({
      next: () => {
        this.success = isEdit ? 'Zimmer aktualisiert!' : 'Zimmer erfolgreich erstellt!';
        this.error = '';
        this.cancelEdit();
        this.loadRooms();
        this.isLoading = false;
      },
      error: () => {
        this.error = isEdit
          ? 'Fehler beim Aktualisieren des Zimmers.'
          : 'Fehler beim Erstellen des Zimmers.';
        this.success = '';
        this.isLoading = false;
      }
    });
  }

  cancelEdit() {
    this.selectedRoom = null;
    this.roomNumber = '';
    this.selectedHotelId = 0;
    this.hotelSearch = '';
    this.selectedRoomTypeId = 0;
    this.pricePerNight = 0;
    this.selectedFacilityIds = [];
    this.showCreateForm = false;
    this.resetFeedback();
  }


  deleteRoom(id: number) {
    this.isLoading = true;
    this.roomService.deleteRoom(id).subscribe({
      next: () => {
        this.success = 'Zimmer erfolgreich gelöscht.';
        this.error = '';
        this.loadRooms();
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Fehler beim Löschen des Zimmers.';
        this.success = '';
        this.isLoading = false;
      }
    });
  }

  editRoom(room: RoomOut) {
    this.selectedRoom = room;
    this.roomNumber = room.room_number;
    this.selectedHotelId = room.hotel.id;
    this.hotelSearch = room.hotel.name;
    this.pricePerNight = room.price_per_night;
    this.selectedRoomTypeId = room.type.id;
    this.selectedFacilityIds = room.facilities.map(f => f.id);
    this.showCreateForm = true;
    this.resetFeedback();
    this.scrollToTop();
  }


  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  private loadFacilities() {
    this.facilityService.getAll().subscribe({
      next: (data) => this.facilities = data,
      error: () => this.error = 'Fehler beim Laden der Zimmerausstattung.'
    });
  }
  private loadRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (data) => this.rooms = data,
      error: () => this.error = 'Fehler beim Laden der Zimmer.'
    });
  }

  private loadRoomTypes() {
    this.roomTypeService.getAll().subscribe({
      next: (data) => this.roomTypes = data,
      error: () => this.error = 'Fehler beim Laden der Zimmertypen.'
    });
  }

  private loadHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => this.hotels = data,
      error: () => this.error = 'Fehler beim Laden der Hotels.'
    });
  }

}

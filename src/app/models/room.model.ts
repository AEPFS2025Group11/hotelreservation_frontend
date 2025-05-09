import {FacilityOut} from './facility.model';
import {RoomTypeOut} from './room-type.model';
import {HotelOut} from './hotel.model';

export interface RoomIn {
  hotel_id: number
  room_number: string
  type_id: number
  price_per_night: number
  facility_ids: number[]
}


export interface RoomOut {
  id: number
  room_number: string
  hotel: HotelOut
  type: RoomTypeOut
  facilities: FacilityOut[]
  price_per_night: number
  dynamic_price_per_night: number
  total_price: number
}


export interface RoomUpdate {
  room_number: string
  type_id: number
  price_per_night: number
}



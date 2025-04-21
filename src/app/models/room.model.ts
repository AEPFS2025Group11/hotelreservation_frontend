import {Facility} from './facility.model';
import {RoomType} from './room-type.model';
import {Hotel} from './hotel.model';

export interface Room {
  id: number
  hotel: Hotel
  room_number: string
  type: RoomType
  facilities: Facility[]
  price_per_night: number
  dynamic_price_per_night?: number
  total_price?: number
}



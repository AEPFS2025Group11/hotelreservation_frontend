import {Facility} from './facility.model';
import {RoomType} from './room-type.model';

export interface Room {
  id: number
  room_number: string
  type: RoomType
  facilities: Facility[]
  price_per_night: number
  dynamic_price_per_night?: number
  total_price?: number
}



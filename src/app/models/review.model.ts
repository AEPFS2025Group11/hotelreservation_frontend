import {Facility} from './facility.model';
import {RoomType} from './room-type.model';
import {Hotel} from './hotel.model';

export interface Review {
  booking_id: number
  rating: number
  comment: string
}



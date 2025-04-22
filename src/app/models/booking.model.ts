import {RoomOut} from './room.model';
import {User} from './user.model';

export interface BookingIn {
  user_id: number
  room_id: number
  check_in: string
  check_out: string
  is_cancelled: boolean
  total_amount: number
}


export interface BookingOut {
  id: number
  user: User
  room: RoomOut
  check_in: string
  check_out: string
  is_cancelled: boolean
  total_amount: number
}


export interface BookingUpdate {
  room_id: number
  check_in: string
  check_out: string
  is_cancelled: boolean
  total_amount: number
}



import { InvoiceIn } from './invoice.model';
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
  invoice: InvoiceIn
  user: User
  room: RoomOut
  check_in: string
  check_out: string
  is_paid: boolean
  has_review: boolean
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



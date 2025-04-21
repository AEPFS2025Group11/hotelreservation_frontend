export interface Booking {
  id: number
  user_id: number
  room_id: number
  check_in: string
  check_out: string
  is_cancelled: boolean
  total_amount: number
}
export interface BookingIn {
  user_id: number
  room_id: number
  check_in: string
  check_out: string
  is_cancelled: boolean
  total_amount: number
}

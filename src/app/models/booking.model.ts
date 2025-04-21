export interface Booking {
  id: number
  user_id: number
  room_id: number
  check_in: Date
  check_out: Date
  is_cancelled: boolean
  total_amount: number
}

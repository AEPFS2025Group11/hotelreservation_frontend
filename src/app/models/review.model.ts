export interface ReviewIn {
  booking_id: number
  rating: number
  comment: string
}

export interface ReviewOut {
  booking_id: number
  rating: number
  created_at: string
  comment: string
}



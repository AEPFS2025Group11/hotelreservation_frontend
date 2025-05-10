export interface PaymentIn {
  booking_id: number
  invoice_id: number
  method: PaymentMethod
  amount: number
}


export interface PaymentOut {
  id: number
  booking_id: number
  invoice_id: number
  method: PaymentMethod
  status: PaymentStatus
  amount: number
  paid_at: string
}


export interface PaymentUpdate {
  room_id: number
  check_in: string
  check_out: string
  is_cancelled: boolean
  total_amount: number
}


export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled"
}

export enum PaymentMethod {
  TWINT = 'twint',
  CREDIT = 'credit',
  CASH = 'cash',
  PAYPAL = 'paypal'
}



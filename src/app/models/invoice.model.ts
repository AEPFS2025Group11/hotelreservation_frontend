export interface InvoiceIn {
  id: number
  booking_id: number
  issue_date: string
  total_amount: number
  status: InvoiceStatus
}

export interface InvoiceOut {
  id: number
  booking_id: number
  issue_date: string
  is_paid: number
  amount_to_pay: number
  total_amount: number
  status: InvoiceStatus
}

export enum InvoiceStatus {
  Ausstehend = 'pending',
  Bezahlt = 'paid',
  Storniert = 'cancelled'
}

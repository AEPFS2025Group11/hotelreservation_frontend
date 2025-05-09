export interface Invoice {
  id: number
  booking_id: number
  issue_date: string
  total_amount: number
  status: InvoiceStatus
}

export enum InvoiceStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

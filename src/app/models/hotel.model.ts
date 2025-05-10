import {AddressOut} from './address.model';

export interface HotelIn {
  name: string
  stars: number
  address_id: number
}

export interface HotelOut {
  id: number
  name: string
  stars: number
  address: AddressOut
}


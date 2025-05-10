export interface AddressOut {
  id: number;
  street: string;
  city: string;
  zip_code: string;
  latitude: number
  longitude: number
}
export interface AddressIn {
  street: string;
  city: string;
  zip_code: string;
}

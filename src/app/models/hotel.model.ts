import {Address} from './address.model';

export interface Hotel {
  id: number;
  name: string;
  stars: number;
  address: Address;
}

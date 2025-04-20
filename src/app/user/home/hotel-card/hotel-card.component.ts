import {Component, Input} from '@angular/core';
import {Hotel} from '../../../models/hotel.model';

@Component({
  selector: 'app-hotel-card',
  imports: [],
  templateUrl: './hotel-card.component.html',
})
export class HotelCardComponent {
  @Input() hotel!: Hotel;

}

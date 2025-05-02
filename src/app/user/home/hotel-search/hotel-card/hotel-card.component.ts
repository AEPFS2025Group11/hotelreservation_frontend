import {Component, Input} from '@angular/core';
import {HotelOut} from '../../../../models/hotel.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-hotel-card',
  imports: [
    CommonModule
  ],
  templateUrl: './hotel-card.component.html',
})
export class HotelCardComponent {
  @Input() hotel!: HotelOut;

}

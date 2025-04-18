import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {StatisticsService} from '../../services/statistics.service';
import {Router} from '@angular/router';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  occupancyData: any[] = [];
  ageData: any[] = [];
  countryData: any[] = [];
  returningGuestData: any[] = [];

  constructor(private statsService: StatisticsService) {
  }

  router: Router = inject(Router);

  ngOnInit(): void {
    this.statsService.getOccupancyByRoomType().subscribe({
      next: data => {
        this.occupancyData = data.map(d => ({name: d.room_type, value: d.bookings}));
      },
      error: err => {
        console.error('Fehler beim Laden der Belegungsdaten', err);
        if (err.status === 401) {
          alert('Nicht autorisiert – bitte erneut einloggen.');
          this.router.navigate(['/login']);
        }
      }
    });

    this.statsService.getDemographics().subscribe({
      next: data => {
        this.ageData = Object.entries(data.age_distribution).map(([key, val]) => ({name: key, value: val}));
        this.countryData = Object.entries(data.country_distribution).map(([key, val]) => ({name: key, value: val}));
        this.returningGuestData = Object.entries(data.returning_guests).map(([key, val]) => ({name: key, value: val}));
      },
      error: err => {
        console.error('Fehler beim Laden der Demografiedaten', err);
        if (err.status === 401) {
          alert('Nicht autorisiert – bitte erneut einloggen.');
          this.router.navigate(['/login']);
        }
      }
    });

  }

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Diagrammtitel'
      }
    }
  };

}

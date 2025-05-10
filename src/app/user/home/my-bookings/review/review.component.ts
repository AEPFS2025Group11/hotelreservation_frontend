import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReviewService} from '../../../../services/review.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.component.html',
})
export class ReviewComponent implements OnInit {
  @Input() bookingId!: number;

  rating: number = 0;
  comment: string = '';
  submitted = false;
  error = '';

  constructor(private route: ActivatedRoute, private reviewService: ReviewService) {
  }

  private router: Router = inject(Router)

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('bookingId');
    if (idParam) {
      this.bookingId = Number(idParam);
    } else {
      this.error = 'Keine Buchungs-ID übergeben.';
    }
  }

  submitReview() {
    if (this.rating < 1 || this.rating > 5) {
      this.error = 'Bitte Bewertung zwischen 1 und 5 Sternen abgeben.';
      return;
    }

    this.reviewService.createReview({
      booking_id: this.bookingId,
      rating: this.rating,
      comment: this.comment
    }).subscribe({
      next: () => {
        this.submitted = true;
        this.error = '';
        setTimeout(() => {
          this.router.navigate(['/home/my-bookings']).then();
        }, 1500);
      },
      error: (err) => {
        this.error = err.error.detail;
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home/my-bookings']).then();
  }
}

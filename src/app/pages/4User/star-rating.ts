import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'app-star-rating',
    standalone:true,
    imports: [CommonModule],
    template: `
    <div class="custom-rating">
    <ng-container *ngFor="let star of stars; let i = index">
        <i class="pi pi-star-fill" 
           [class.filled]="i < rating"
           (click)="setRating(i + 1)">
        </i>
    </ng-container>
</div>

    `,
    styles:`
    .custom-rating {
    display: flex;
    gap: 5px;
}

.custom-rating .pi-star-fill {
    font-size: 16px;
    color: #ccc; /* Màu sao chưa chọn */
    cursor: pointer;
}

.custom-rating .pi-star-fill.filled {
    color: #ffb400 !important; 
}

    `
})
export class StarRatingComponent {
    @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars = Array(5).fill(0); // Mảng 5 phần tử để hiển thị sao

  setRating(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }
}
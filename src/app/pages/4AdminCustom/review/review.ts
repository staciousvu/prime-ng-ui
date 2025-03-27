import { Component, OnInit } from '@angular/core';
import { BreadcrumpComponent } from '../breadcrump';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ReviewService } from '../../service/review.service';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
    selector: 'app-review',
    standalone: true,
    imports: [PaginatorModule,BreadcrumpComponent, ButtonModule, TableModule, RatingModule, FormsModule, DialogModule, ToastModule, RippleModule],
    template: `
        <app-breadcrump [apr]="'List comments'" [manager]="'Manage comments'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">List comments</div>
        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2 ml-auto">
                <p-button icon="pi pi-refresh" label="Reload" severity="warn" />
                <input type="text" placeholder="Tìm kiếm..." class="px-4 py-2 border-2 rounded" />
            </div>
        </div>
        <p-table [value]="reviews" [tableStyle]="{ 'min-width': '60rem' }" [scrollable]="true">
            <ng-template #header>
                <tr>
                    <th style="min-width: 8rem">Người dùng</th>
                    <th style="min-width:5rem">Khóa học</th>
                    <th style="min-width: 10rem">Nội dung</th>
                    <th>Rating</th>
                    <th>Ngày đăng</th>
                    <th>Xóa</th>
                </tr>
            </ng-template>
            <ng-template #body let-review>
                <tr>
                    <td>
                        <div class="flex items-center gap-2">
                            <!-- <img [src]="course.authorAvatar" width="50" style="vertical-align: middle"/> -->
                            <img [src]="review.reviewerAvatar" width="50" style="vertical-align: middle" />
                            <span class="ml-2">{{ review.reviewerName }}</span>
                        </div>
                    </td>
                    <td>{{ review.courseName }}</td>
                    <td>{{ review.review }}</td>
                    <td><p-rating [(ngModel)]="review.rating" [readonly]="true" /></td>
                    <td>{{ review.createdAt }}</td>
                    <td>
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="openConfirmation(review.id)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>
        <div class="card flex justify-center">
            <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" />
        </div>
        <p-dialog header="Confirmation" [(visible)]="displayConfirmation" [style]="{ width: '350px' }" [modal]="true">
            <div class="flex items-center justify-center">
                <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem"> </i>
                <span>Bạn có chắc muốn xóa đánh giá này?</span>
            </div>
            <ng-template #footer>
                <p-button label="Không" icon="pi pi-times" (click)="closeConfirmation()" text severity="secondary" />
                <p-button label="Có" icon="pi pi-check" (click)="confirmDelete()" severity="danger" outlined autofocus />
            </ng-template>
        </p-dialog>
        <p-toast></p-toast>
    `,
    providers: [MessageService]
})
export class ReviewComponent implements OnInit {
    reviewToDeleteId: number | null = null;
    displayConfirmation: boolean = false;
    displayReject: boolean = false;
    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa đánh giá thành công!' });
    }
    closeConfirmation() {
        this.displayConfirmation = false;
        this.reviewToDeleteId = null;
    }
    confirmDelete() {
        if (this.reviewToDeleteId !== null) {
            this.reviewService.deleteReview(this.reviewToDeleteId).subscribe({
                next: () => {
                    this.reviews = this.reviews.filter((r) => r.id !== this.reviewToDeleteId);
                    this.showSuccess();
                    this.closeConfirmation();
                },
                error: (err) => {
                    console.error('Lỗi khi xóa đánh giá:', err);
                }
            });
        }
    }
    openConfirmation(reviewId: number) {
        this.reviewToDeleteId = reviewId;
        this.displayConfirmation = true;
    }
    page: number = 0;
    size: number = 200;
    reviews: any[] = [];
    constructor(
        private reviewService: ReviewService,
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.reviewService.getReviews(this.page, this.size).subscribe((response: any) => {
            this.reviews = response.data.content;
        });
    }
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
    }
}

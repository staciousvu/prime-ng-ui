import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-rating-video',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div *ngIf="isLoading" class="loading-container">
            <span>Loading...</span>
            <!-- Hoặc bạn có thể dùng spinner ở đây -->
        </div>
        <ul class="review-list" *ngIf="!isLoading">
            <h2 class="review-title">Student Feedbacks</h2>
            <li class="review" *ngFor="let review of reviews">
                <img [src]="review.reviewerAvatar || 'https://i.pravatar.cc/48?u=default'" alt="{{ review.reviewerName }}" class="avatar" />

                <div class="review-content">
                    <div class="review-header">
                        <h4>{{ review.reviewerName }}</h4>
                        <div class="stars">
                            <i class="fas fa-star" *ngFor="let star of [1, 2, 3, 4, 5]; let i = index" [class.filled]="i < review.rating"></i>
                        </div>
                        <span class="time">{{ getTimeAgo(review.updatedAt) }}</span>
                    </div>
                    <p class="review-text">{{ review.review }}</p>
                    <div class="review-footer">
                        <div>
                            <i class="fas fa-thumbs-up"></i>
                            <span>Was this review helpful?</span>
                        </div>
                        <div>
                            <i class="fas fa-thumbs-down"></i>
                        </div>
                        <a href="#">Report</a>
                    </div>
                </div>
            </li>
        </ul>
    `,
    styles: `
        // review
        .review-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .review {
            display: flex;
            align-items: flex-start;
            margin-bottom: 32px;
        }

        .avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 16px;
        }

        .review-content {
            flex-grow: 1;
        }

        .review-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
        }

        .review-header h4 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }

        .stars {
            display: flex;
        }

        .stars i {
            color: #e2e8f0; /* default gray */
        }

        .stars i.filled {
            color: #f6ad55; /* yellow */
        }

        .time {
            color: #718096;
            font-size: 14px;
        }

        .review-text {
            color: #4a5568;
            margin-top: 4px;
        }

        .review-footer {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 8px;
        }

        .review-footer div {
            display: flex;
            align-items: center;
            color: #805ad5;
        }

        .review-footer div i {
            margin-right: 4px;
        }

        .review-footer a {
            color: #805ad5;
            text-decoration: none;
        }

        // review
        .rating-group {
            margin: 0 auto;
            display: flex;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 16px;
        }
        .rating {
            flex: 3;
            display: flex;
            align-items: center;
            margin-bottom: 16px;
        }
        .rating .score {
            font-size: 40px;
            font-weight: bold;
            color: #dd6b20;
        }
        .rating .details {
            margin-left: 16px;
        }
        .rating .stars {
            display: flex;
            align-items: center;
        }
        .rating .stars i {
            color: #dd6b20;
            font-size: 24px;
        }
        .rating .course-rating {
            color: #dd6b20;
            font-size: 18px;
        }
        .feedback {
            flex: 7;
            margin-top: 16px;
        }
        .feedback .item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        .feedback .bar {
            width: 50%;
            background-color: #e2e8f0;
            height: 16px;
            border-radius: 8px;
            overflow: hidden;
        }
        .feedback .bar .fill {
            height: 100%;
        }
        .feedback .stars {
            display: flex;
            align-items: center;
            margin-left: 16px;
        }
        .feedback .stars i {
            color: #dd6b20;
        }
        .feedback .percentage {
            margin-left: 8px;
            color: #6b46c1;
        }
    `,
    providers: []
})
export class RatingVideoComponent implements OnInit {
    @Input() courseId: any;  // Nhận courseId từ parent component
    reviews: any[] = [];
    isLoading: boolean = true;
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
        if (this.courseId) {
            // Sử dụng template string đúng cách
            this.http.get<any>(`http://localhost:8080/review/course/${this.courseId}?page=0&size=10`).subscribe({
                next: (res) => {
                    // Chuyển đổi ngày tạo và ngày cập nhật từ chuỗi ISO thành đối tượng Date
                    this.reviews = res.data.content.map((review: any) => ({
                        ...review,
                        createdAt: new Date(review.createdAt), // Chuyển đổi từ ISO string thành Date
                        updatedAt: new Date(review.updatedAt) // Chuyển đổi từ ISO string thành Date
                    }));
                    setTimeout(() => {
                        this.isLoading = false; // Sau khi dữ liệu đã được load xong
                    }, 2000);
                },
                error: (err) => {
                    console.error('Error fetching reviews:', err);
                }
            });
        }
    }
  
    // Cải thiện cú pháp của template string trong hàm getTimeAgo
    getTimeAgo(date: Date): string {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000); // Sự khác biệt tính theo giây
        const diffInMinutes = Math.floor(diffInSeconds / 60); // Sự khác biệt tính theo phút
        const diffInHours = Math.floor(diffInMinutes / 60); // Sự khác biệt tính theo giờ
        const diffInDays = Math.floor(diffInHours / 24); // Sự khác biệt tính theo ngày
        const diffInMonths = Math.floor(diffInDays / 30); // Sự khác biệt tính theo tháng
        const diffInYears = Math.floor(diffInMonths / 12); // Sự khác biệt tính theo năm

        if (diffInYears > 0) {
            return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
        } else if (diffInDays > 0) {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        } else if (diffInHours > 0) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        } else {
            return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
        }
    }
}


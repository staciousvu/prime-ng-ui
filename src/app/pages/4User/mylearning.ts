import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './component/navbar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
    selector: 'app-my-learning',
    standalone: true,
    imports: [CommonModule,RouterLink],
    template: `
        <div class="app">
            <div class="grid wrapper">
                <h1 class="mylearning_title">Khóa học của tôi</h1>

                <ul class="mylearning_card__list">
                    <li class="mylearning_card__item" *ngFor="let course of courses" [routerLink]="['/course/video-learning', course.id]">
                        <div class="course-img-container" >
                            <img [src]="course.thumbnail || 'https://s.udemycdn.com/meta/default-meta-image-v2.png'" alt="" class="course-img" />
                            <div class="overlay">
                                <i class="fa-solid fa-play play-icon" style="color: #ffffff;"></i>
                            </div>
                        </div>

                        <p class="course-name">{{ course.title }}</p>
                        <p class="course-author">{{ course.authorName }}</p>

                        <!-- Giả lập progress: nếu có dữ liệu real thì thay thế -->
                        <progress [value]="course.progress || 0" max="100"></progress>
                        <p class="percentcompleted">{{ (course.progress || 0) | number:'1.0-0' }}% complete</p>

                    </li>
                </ul>
                <!-- Pagination -->
                <div class="pagination" *ngIf="totalPages > 1">
                    <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 0">Previous</button>

                    <button *ngFor="let page of [].constructor(totalPages); let i = index" (click)="goToPage(i)" [class.active]="i === currentPage">
                        {{ i + 1 }}
                    </button>

                    <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages - 1">Next</button>
                </div>

                <!-- Nếu không có khóa học -->
                <p *ngIf="courses.length === 0" class="text-center mt-4 text-gray-600">Không có khóa học nào.</p>
            </div>
        </div>
    `,
    styles: `
        .pagination {
            margin-top: 20px;
            display: flex;
            gap: 8px;
            align-items: center;
            justify-content: center;
        }

        .pagination button {
            padding: 6px 12px;
            border: none;
            background-color: #eee;
            cursor: pointer;
        }

        .pagination button.active {
            background-color: #60A5FA;
            color: white;
            font-weight: bold;
        }

        .pagination button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        .app {
            margin-top: 20px;
            width: 100%;
        }

        .grid {
            max-width: 80%;
            margin: 0 auto;
        }

        .wrapper {
            display: flex;
            flex-direction: column;
        }

        .mylearning_title {
            padding: 15px;
            margin-bottom: 20px;
            font-size: 36px;
            font-weight: bolder;
        }

        .mylearning_card__list {
            display: grid;
            grid-template-columns: repeat(4, 1fr); /* Mặc định 4 khóa học trên 1 hàng */
            gap: 10px;
            list-style: none;
            padding: 0;
        }

        /* Card styling */
        .mylearning_card__item {
            padding: 15px;
            border-radius: 8px;
            cursor: pointer;
        }
        /* test */
        .course-img-container {
            position: relative;
            display: inline-block;
            width: 100%;
            overflow: hidden;
            border-radius: 5px;
        }

        .course-img {
            width: 100%;
            height: 140px;
            object-fit: cover;
            display: block;
            transition: 0.3s ease-in-out;
            border-radius: 5px;
            border: 1px solid rgba(119, 116, 116, 0.648);
            box-sizing: border-box; /* Đảm bảo viền không bị tràn */
        }

        /* Lớp phủ mờ */
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Màu đen trong suốt */
            opacity: 0; /* Ẩn ban đầu */
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s ease-in-out;
            border-radius: 5px;
        }

        /* Biểu tượng play */
        .play-icon {
            font-size: 40px;
            color: white;
            opacity: 0;
            transition: 0.3s ease-in-out;
            cursor: pointer;
        }
        .play-icon:active {
            transform: scale(1.5);
        }

        /* Khi hover vào ảnh */
        .course-img-container:hover .overlay {
            opacity: 1;
        }

        .course-img-container:hover .play-icon {
            opacity: 1;
        }

        /* test */

        /* Course name */
        .course-name {
            font-size: 18px;
            font-weight: 600;
            margin: 5px 0;
            color: rgb(16, 16, 16);
        }

        /* Course author */
        .course-author {
            font-size: 12px;
            color: gray;
            margin-bottom: 5px;
        }

        /* Progress bar */
        progress {
            width: 100%;
            height: 10px;
            border-radius: 5px;
            overflow: hidden;
        }
        progress::-webkit-progress-value {
            background-color: #60A5FA;
            border-radius: 5px;
        }

        /* Màu nền thanh progress chưa hoàn thành */
        progress::-webkit-progress-bar {
            background-color: #e0e0e0; /* Màu xám nhạt */
            border-radius: 5px;
        }
        progress::-moz-progress-bar {
            background-color: #60A5FA;
            border-radius: 5px;
        }

        /* Phần trăm hoàn thành */
        .percentcompleted {
            font-size: 10px;
            color: #393939;
            font-weight: bold;
            margin-top: 5px;
        }

        /* Responsive: 5 khóa học trên hàng nếu màn hình lớn */
        @media (min-width: 1200px) {
            .mylearning_card__list {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        /* Responsive: 3 khóa học trên hàng nếu màn hình nhỏ hơn 900px */
        @media (max-width: 900px) {
            .mylearning_card__list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        /* Responsive: 2 khóa học trên hàng nếu màn hình nhỏ hơn 600px */
        @media (max-width: 600px) {
            .mylearning_card__list {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        /* Responsive: 1 khóa học trên hàng nếu màn hình rất nhỏ */
        @media (max-width: 400px) {
            .mylearning_card__list {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    `
})
export class MyLearningComponent implements OnInit {
    courses: any[] = [];
    currentPage = 0;
    pageSize = 8;
    totalPages = 0;

    constructor(private http: HttpClient,
    ) {}

    ngOnInit(): void {
        this.fetchCourses();
    }

    fetchCourses(): void {
        const params = new HttpParams().set('page', this.currentPage.toString()).set('size', this.pageSize.toString());

        this.http.get<any>('http://localhost:8080/course/my-courses/learner', { params }).subscribe({
            next: (res) => {
                this.courses = res.data.content;
                this.totalPages = res.data.totalPages;
            },
            error: (err) => {
                console.error('Error fetching courses:', err);
            }
        });
    }

    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
            this.currentPage = page;
            this.fetchCourses();
        }
    }

}

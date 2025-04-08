import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { VideoPlayerComponent } from './video-player';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { OverviewVideoComponent } from './video-learning/overview';
import { QAndAComponent } from './video-learning/Q&A';
import { RatingVideoComponent } from './video-learning/rating';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-video-learning',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ToastModule,
        TextareaModule,
        InputTextModule,
        ButtonModule,
        DialogModule,
        RatingModule,
        VideoPlayerComponent,
        AccordionModule,
        CommonModule,
        FormsModule,
        TabsModule,
        OverviewVideoComponent,
        QAndAComponent,
        RatingVideoComponent
    ],
    template: `
        <div class="app">
            <header class="header-top">
                <div class="header-top-left">
                    <div class="logo">
                        <a href="#">Edu<span>Flow</span></a>
                    </div>
                    <span class="xv-coursename">{{ specialObject.courseName }}</span>
                </div>
                <div class="header-top-right">
                    <button class="btn-rating" (click)="showReviewDialog()">
                        <i class="fa-solid fa-star btn-rating-icon" style="color: #ffffff;"></i>
                        <span class="btn-rating-title">Leave a rating</span>
                    </button>
                    <button class="btn-progress">
                        <span class="btn-progress-title">Your progress</span>
                        <i class="fa-solid fa-arrow-down btn-progress-icon"></i>
                    </button>
                </div>
            </header>
            <div class="video-container">
                <!-- Phần Video 70% -->
                <div class="video-player">
                    <app-video-player [videoUrl]="videoUrl"></app-video-player>
                    <div class="wrapper-tabs">
                        <div class="grid-tab">

                            <p-tabs value="0">
                                <p-tablist>
                                    <p-tab value="0">Overview</p-tab>
                                    <p-tab value="1">Q & A</p-tab>
                                    <p-tab value="2">Reviews</p-tab>
                                </p-tablist>
                                <p-tabpanels>
                                    <p-tabpanel value="0">
                                        <app-overview-video [courseId]="courseId"></app-overview-video>
                                    </p-tabpanel>
                                    <p-tabpanel value="1">
                                        <app-qanda [courseId]="courseId" [lectureId]="activeLecture"></app-qanda>
                                    </p-tabpanel>
                                    <p-tabpanel value="2">
                                        <app-rating-video [courseId]="courseId"></app-rating-video>
                                    </p-tabpanel>
                                </p-tabpanels>
                            </p-tabs>
                        </div>
                    </div>
                </div>

                <!-- Phần Accordion 30% -->
                <div class="accordion">
                    <h2 style="margin: 10px; text-align: center; font-size: 24px; font-weight: 700; color: #333; background-color: #f6f7f9; border-radius: 5px;">Course content</h2>
                    <div class="card" style="padding:0;width:100%;">
                        <p-accordion [multiple]="true">
                            <p-accordion-panel *ngFor="let section of specialObject.sections; let i = index" [value]="section.id">
                                <p-accordion-header style="background-color: #F6F7F9;color:black;font-size:17px;font-weight:500"> Section {{ i + 1 }}: {{ section.title }} </p-accordion-header>
                                <p-accordion-content>
                                    <ul class="course-list">
                                        <li *ngFor="let lecture of section.lectures; let j = index" class="lecture-item" [ngClass]="{ active: activeLecture === lecture.id }" (click)="onLectureClick(lecture)">
                                            <input type="checkbox" style="margin-right:10px;" [(ngModel)]="lecture.completed" (change)="onLectureStatusChange(lecture)" />
                                            <span style="margin-right:auto;">{{ lecture.title }}</span>
                                            <span class="lecture-duration">2hr 33min</span>
                                        </li>
                                    </ul>
                                </p-accordion-content>
                            </p-accordion-panel>
                        </p-accordion>
                    </div>
                </div>
            </div>
        </div>
        <p-dialog header="Đánh giá khóa học" [(visible)]="reviewDialogVisible" [modal]="true" [style]="{ width: '30rem' }">
            <div class="mb-4">
                <label class="font-semibold block mb-2 text-lg">Điểm đánh giá</label>

                <p-rating [(ngModel)]="ratingValue"></p-rating>
            </div>

            <div class="mb-4">
                <label class="font-semibold block mb-2 text-lg">Nội dung đánh giá</label>

                <textarea rows="5" cols="30" pTextarea [(ngModel)]="reviewText" class="w-full"></textarea>
            </div>

            <div class="flex justify-end gap-2">
                <p-button label="Hủy" severity="secondary" (click)="reviewDialogVisible = false" />
                <p-button [style]="{ 'background-color': 'rgba(125, 42, 233, 0.86)' }" label="Gửi đánh giá" (click)="submitReview()" />
            </div>
        </p-dialog>
        <p-toast></p-toast>
    `,
    styles: `
        .p-rating:not(.p-disabled):not(.p-readonly) .p-rating-option:hover .p-rating-icon {
            color: rgba(125, 42, 233, 0.86) !important;
        }
        .p-rating-option-active .p-rating-icon {
            color: rgba(125, 42, 233, 0.86) !important;
        }
        .p-textarea:enabled:hover {
            border-color: rgba(125, 42, 233, 0.86) !important;
        }
        .p-textarea:enabled:focus {
            border-color: rgba(125, 42, 233, 0.86) !important;
        }
        .p-textarea {
            border-color: rgba(125, 42, 233, 0.86) !important;
        }
        // tab
        .p-tab-active {
            font-size: 16px !important;
            font-weight: 600 !important;
            background: transparent !important;
            border-color: rgba(125, 42, 233, 0.86) !important;
            color: rgba(124, 42, 232, 0.862745098) !important;
        }
        // tab
        .wrapper-tabs {
            width: 100%;
            margin-top: 10px;
        }
        .grid-tab {
            width: 90%;
            margin: 0 auto;
        }
        * {
            margin: 0;
        }
        .app {
            width: 100%;
            height: 55px;
        }
        /* Logo */
        .logo {
            position: relative;
        }
        .logo a {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            text-decoration: none;
        }
        .logo span {
            color: #007bff;
        }
        .logo::after {
            position: absolute;
            content: '';
            display: block;
            right: -11px;
            top: 5px;
            width: 2px;
            height: 72%;
            background-color: #ffffff91;
        }
        .header-top {
            padding: 15px;
            background-color: #36363c;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-top-left {
            display: flex;
            align-items: center;
            gap: 20px;
            color: #fff;
            font-size: 17px;
            font-weight: bold;
        }
        .header-top-right {
        }
        .btn-rating {
            position: relative;
            cursor: pointer;
            background-color: transparent;
            color: #e2d9d9;
            padding: 8px 15px;
            border: none;
        }
        .btn-rating::after {
            position: absolute;
            content: '';
            display: block;
            right: -5px;
            top: 6px;
            width: 2px;
            height: 66%;
            background-color: #ffffff91;
        }
        .btn-rating:hover {
            background-color: #7c2ae8dc;
            transition: all 0.3s ease-in-out;
        }
        .btn-rating:active {
            background-color: #613e8f47;
        }
        .btn-progress {
            cursor: pointer;
            background-color: transparent;
            border: none;
            color: #e2d9d9;
            padding: 8px 15px;
        }
        .btn-progress:hover {
            color: #e2d9d990;
        }
        .btn-progress-title {
            margin-right: 3px;
        }

        .video-container {
            display: flex;
            width: 100%;
            // height: 420px;
        }

        .video-player {
            // flex: 8;
            width: 72%;
            height: 420px;
        }

        .accordion {
            // flex: 2;
            width: 28%;
            height: calc(100vh - 60px);
            background: #f4f4f4;
            // padding: 15px;
            overflow-y: auto;
        }

        .accordion-item {
            margin-bottom: 10px;
        }

        .accordion-btn {
            width: 100%;
            padding: 10px;
            text-align: left;
            background: #ddd;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }

        .accordion-btn:hover {
            background: #ccc;
        }

        .accordion-content {
            display: none;
            padding: 10px;
            background: white;
            border: 1px solid #ddd;
        }
        // hehe
        /* Định dạng cho danh sách các video */
        .course-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        /* Định dạng cho mỗi mục trong danh sách */
        .lecture-item {
            display: flex;
            justify-content: flex-start; /* Đảm bảo tiêu đề và thời gian nằm ở hai bên */

            align-items: center;
            padding: 10px;
            margin: 5px 0;
            background-color: #fff;
            border-radius: 5px;
            cursor: pointer;
            transition:
                background-color 0.3s ease,
                box-shadow 0.3s ease;
        }
        .lecture-item.active {
            background-color: #d3e4f0; /* Màu nền khi mục được chọn */
            color: #000; /* Đổi màu chữ nếu cần */
            font-weight: bold; /* Làm đậm chữ khi mục được chọn */
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); /* Thêm bóng đổ nếu cần */
        }

        /* Hiệu ứng khi hover vào mục */
        .lecture-item:hover {
            background-color: #f0f0f0;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        }

        /* Định dạng cho tên video */
        .lecture-item span:first-child {
            font-weight: 400;
            font-size: 14px;
        }

        /* Định dạng cho thời gian video */
        .lecture-duration {
            font-size: 12px;
            color: gray;
        }
    `,
    providers: [MessageService]
})
export class VideoLearningComponent implements OnInit {


    videoUrl: any;
    courseId!: string;
    specialObject: any = {};
    
    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.courseId = params.get('id')!;
            console.log('ID từ URL:', this.courseId);
        });
        this.http.get<any>(`http://localhost:8080/course/${this.courseId}/sections-lectures`).subscribe((response) => {
            this.specialObject = response.data;
            this.videoUrl = response.data.sections[0].lectures[0].contentUrl;
            this.activeLecture = response.data.sections[0].lectures[0].id;
            console.log('video url:' + this.videoUrl);
            console.log(this.specialObject);
        });

    }

    activeLecture: string = '';
    onLectureClick(lecture: any) {
        // Bạn có thể thay đổi video hiện tại, ví dụ:
        console.log('User clicked on lecture: ', lecture);
        this.activeLecture = lecture.id;
        this.videoUrl = lecture.contentUrl;

        // Thực hiện hành động, ví dụ: thay đổi video hiện tại, mở modal, v.v.
        // Thêm logic để thay đổi video tại đây
    }
    onLectureStatusChange(lecture: any): void {
        // Xử lý trạng thái khi checkbox thay đổi
        console.log(lecture.name, 'Completed:', lecture.completed);
    }
    reviewDialogVisible: boolean = false;
    ratingValue: number = 0;
    reviewText: string = '';

    showReviewDialog() {
        this.reviewDialogVisible = true;
    }

    submitReview() {
        const reviewRequest = {
            courseId: this.courseId,
            review: this.reviewText,
            rating: this.ratingValue
        };

        this.http.post('http://localhost:8080/review/course', reviewRequest).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Đánh giá của bạn đã được gửi!'
                });

                this.reviewDialogVisible = false;
                this.ratingValue = 0;
                this.reviewText = '';
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Gửi đánh giá thất bại!'
                });
                console.error('Error submitting review:', err);
            }
        });
    }
}

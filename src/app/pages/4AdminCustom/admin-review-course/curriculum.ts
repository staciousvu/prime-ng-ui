import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { StarRatingComponent } from '../../4User/star-rating';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../service/cart.service';
import { ToastService } from '../../service/toast.service';
import { VideoPlayerComponent } from '../../4User/video-player';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-review-curriculum',
    standalone: true,
    encapsulation:ViewEncapsulation.None,
    imports: [AccordionModule, CommonModule,VideoPlayerComponent,FormsModule],
    template: `
        <div class="video-container">
                <!-- Phần Video 70% -->
                <div class="video-player">
                    <app-video-player [videoUrl]="videoUrl" [lectureId]="activeLecture" (lectureCompleted)="onLectureCompleted($event)"></app-video-player>
                    <div class="wrapper-tabs">
                        <div class="grid-tab">
                            
                        </div>
                    </div>
                </div>

                <!-- Phần Accordion 30% -->
                <div class="accordion">
                    <h2 style="margin: 2px 5px; text-align: left; font-size: 24px; font-weight: 700; color: #333; background-color: #f6f7f9; border-radius: 5px;">Curriculum</h2>
                    <div class="card" style="padding:0;width:100%;">
                        <div class="custom-accordion">
                            <div *ngFor="let section of specialObject.sections; let i = index" class="accordion-section">
                                <div class="accordion-header" (click)="toggleSection(i)">
                                    <div class="header-left">
                                        <h3>Section {{ i + 1 }}: {{ section.title }}</h3>
                                        <div class="section-info">{{ section.completedLectures || 0 }} / {{ section.totalLectures || 0 }} | {{ section.totalDuration || '0min' }}</div>
                                    </div>
                                    <i [ngClass]="{ rotate: isSectionActive(i) }" class="fa fa-chevron-down"></i>
                                </div>

                                <div class="accordion-body" [class.open]="isSectionActive(i)">
                                    <ul class="lecture-list">
                                        <li *ngFor="let lecture of section.lectures" class="lecture-item" [ngClass]="{ active: activeLecture === lecture.id }" (click)="onLectureClick(lecture)">
                                            <div class="lecture-left">
                                                <input type="checkbox" [(ngModel)]="lecture.completed" (change)="onLectureStatusChange(lecture)" />
                                                <div class="lecture-title">{{ lecture.title }}</div>
                                            </div>

                                            <div class="lecture-right">
                                                <i class="fa fa-play-circle"></i>
                                                <span class="lecture-duration">{{ lecture.duration | number:'1.0-1' }}s</span>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    `,
    styles:`
    .tabs {
            //   border-bottom: 1px solid rgb(43, 45, 46);
            margin-bottom: 20px;
        }

        .tab-titles {
            display: flex;
            gap: 20px;
            align-items: center;
            border-bottom: 1px solid rgba(76, 77, 78, 0.42);
        }

        .tab-title {
            padding: 10px 0;
            font-size: 16px;
            letter-spacing: 2px;
            font-weight: 700;
            color: #595c73;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition:
                color 0.3s,
                border-color 0.3s;
        }

        .tab-title:hover {
            color: rgb(11, 11, 11);
        }

        .tab-title.active {
            border-bottom: 2px solid #2d2f31;
            color: #2d2f31;
        }

        .tab-content {
            padding-top: 20px;
        }

        .tab-panel {
            display: none;
        }

        .tab-panel.active {
            display: block;
        }

        // tab
        .custom-accordion {
            display: flex;
            flex-direction: column;
            gap: 12px;
            font-family: 'Inter', sans-serif;
        }

        .accordion-section {
            border-bottom: 1px solid #e0e0e0;
        }

        .accordion-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10px;
            cursor: pointer;
            background: white;
            transition: background-color 0.2s ease;
        }

        .accordion-header:hover {
            background: #f9fafb;
        }

        .header-left {
            display: flex;
            flex-direction: column;
        }

        .header-left h3 {
            font-size: 16px;
            margin: 0;
            font-weight: 600;
        }

        .section-info {
            font-size: 13px;
            color: #6b7280;
            margin-top: 5px;
        }

        .fa-chevron-down {
            transition: transform 0.3s ease;
            color: #6b7280;
        }

        .rotate {
            transform: rotate(180deg);
        }

        .accordion-body {
            padding: 0 10px 15px 10px;
            background: white;
        }
        .accordion-body {
            max-height: 0;
            overflow: hidden;
            transition:
                max-height 0.3s ease,
                padding 0.3s ease;
            padding: 0 16px;
        }

        .accordion-body.open {
            max-height: 500px; /* Hoặc 1 giá trị đủ lớn để chứa nội dung, ví dụ 500px */
            padding: 12px 16px;
        }

        .lecture-list {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .lecture-item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: start;
            padding: 12px 8px;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.2s;
            gap: 5px;
        }

        .lecture-item:hover {
            background: #f1f5f9;
        }

        .lecture-item.active {
            background: #e0e7ff;
        }

        .lecture-left {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .lecture-title {
            font-size: 14px;
            color: #374151;
            font-weight: 500;
        }

        .lecture-right {
            display: flex;
            align-items: center;
            gap: 5px;
            color: #6b7280;
            font-size: 13px;
        }

        .lecture-right i {
            font-size: 14px;
        }

        input[type='checkbox'] {
            width: 16px;
            height: 16px;
        }

        // top new
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
            background-color: rgb(21, 20, 20);
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
            height: calc(100vh - 60px);
            width: 100%;
        }
        .video-player {
            width: 72%;
            flex: 7;
            overflow-y: auto;
        }

        .accordion {
            flex: 3;
            padding: 10px;
            overflow-y: auto;
            background-color: #f6f7f9;
            max-height: calc(100vh - 80px);
            box-sizing: border-box;
        }
    `
})
export class AdminReviewCurriculumComponent implements OnInit {
    
    
    // Chuyển activeSectionIndex thành 1 mảng
    activeSectionIndexes: number[] = [];

    // Kiểm tra section có đang mở không
    isSectionActive(index: number): boolean {
        return this.activeSectionIndexes.includes(index);
    }

    // Toggle section
    toggleSection(index: number): void {
        const foundIndex = this.activeSectionIndexes.indexOf(index);
        if (foundIndex !== -1) {
            // Nếu đã có thì remove đi
            this.activeSectionIndexes.splice(foundIndex, 1);
        } else {
            // Nếu chưa có thì add vào
            this.activeSectionIndexes.push(index);
        }
    }

    videoUrl: any;
    @Input() courseId: string = ''; // Nhận giá trị courseId từ component cha
    specialObject: any = {};

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private toastService: ToastService,
        private router:Router
    ) {}

    ngOnInit(): void {
        // this.route.paramMap.subscribe((params) => {
        //     this.courseId = params.get('id')!;
        //     console.log('ID từ URL:', this.courseId);
        // });
        this.http.get<any>(`http://localhost:8080/course/${this.courseId}/sections-lectures`).subscribe((response) => {
            this.specialObject = response.data;
            this.videoUrl = response.data.sections[0].lectures[0].contentUrl;
            this.activeLecture = response.data.sections[0].lectures[0].id;

            // Mở section chứa bài giảng active
            this.expandSectionContainingActiveLecture();
        });
    }
    expandSectionContainingActiveLecture() {
        if (this.specialObject && this.specialObject.sections) {
            this.specialObject.sections.forEach((section: any, sectionIndex: number) => {
                const foundLecture = section.lectures.find((lecture: any) => lecture.id === this.activeLecture);
                if (foundLecture) {
                    this.activeSectionIndexes.push(sectionIndex);
                }
            });
        }
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
    onLectureCompleted(lectureId: string) {
        console.log('Lecture hoàn thành: ', lectureId);
        // Update local specialObject cho nhanh mà không cần call lại API
        for (let section of this.specialObject.sections) {
            for (let lecture of section.lectures) {
                if (lecture.id === lectureId) {
                    lecture.completed = true;
                    break;
                }
            }
        }
        // Hoặc nếu bạn muốn chắc chắn, bạn cũng có thể gọi lại API load course lại (nặng hơn)
        // this.loadCourse();
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
                this.toastService.addToast('success', 'Rating feedback successfully');

                this.reviewDialogVisible = false;
                this.ratingValue = 0;
                this.reviewText = '';
            },
            error: (err) => {
                this.toastService.addToast('error', err.error?.message);
                console.error('Error submitting review:', err);
            }
        });
    }

    hoveredRating = 0;

    stars = Array(5).fill(0);

    selectRating(rating: number) {
        this.ratingValue = rating;
    }

    hoverRating(rating: number) {
        this.hoveredRating = rating;
    }
    showReportDialog() {
        this.reportDialogVisible = true;
    }
    reportDialogVisible = false;

    selectedCourseName = 'Tên khóa học mẫu'; // để hiển thị readonly
    reportReason = '';
    reportDescription = '';
    reportImage: File | null = null;

    reportReasons: string[] = ['Nội dung không phù hợp', 'Thông tin sai lệch', 'Vi phạm bản quyền', 'Hành vi lừa đảo', 'Khác'];

    onImageSelected(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.reportImage = fileInput.files[0];
        }
    }

    

    
}

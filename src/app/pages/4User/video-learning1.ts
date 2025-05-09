import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VideoPlayerComponent } from './video-player';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { OverviewVideoComponent } from './video-learning/overview';
import { QAndAComponent } from './video-learning/Q&A';
import { RatingVideoComponent } from './video-learning/rating';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastService } from '../service/toast.service';
import { QuizVLComponent } from './video-learning/quiz';
import { ToastContainerComponent } from '../SharedComponent/toast-container-components';
import { OnlyNotificationContainerComponent } from '../SharedComponent/only-notification-container';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-video-learning1',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [
        QuizVLComponent,
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
        RatingVideoComponent,
        OnlyNotificationContainerComponent,
        ToastContainerComponent,
        ProgressSpinnerModule
    ],
    template: `
        <app-only-notification-container />
        <app-toast-container></app-toast-container>
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
                    <button class="btn-rating" (click)="showReportDialog()">
                        <i class="fa-solid fa-flag" style="color: #ffffff;"></i>
                        <span class="btn-rating-title">Report</span>
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
                    <app-video-player [videoUrl]="videoUrl" [lectureId]="activeLecture" (lectureCompleted)="onLectureCompleted($event)"></app-video-player>
                    <div class="wrapper-tabs">
                        <div class="grid-tab">
                            <div class="tabs">
                                <div class="tab-titles">
                                    <div *ngFor="let tab of tabs; let i = index" class="tab-title" [class.active]="activeTab === i" (click)="setActiveTab(i)">
                                        {{ tab.title }}
                                    </div>
                                </div>
                                <div class="tab-content">
                                    <div *ngFor="let tab of tabs; let i = index" class="tab-panel" [class.active]="activeTab === i">
                                        <ng-container *ngIf="activeTab === i">
                                            <!-- Insert content for each tab here -->
                                            <app-overview-video *ngIf="i === 0" [courseId]="courseId"></app-overview-video>
                                            <app-qanda *ngIf="i === 1" [courseId]="courseId" [lectureId]="activeLecture"></app-qanda>
                                            <app-rating-video *ngIf="i === 2" [courseId]="courseId"></app-rating-video>
                                            <app-vl-quiz *ngIf="i === 3" [courseId]="courseId" (playQuiz)="openQuizModal($event)"></app-vl-quiz>
                                        </ng-container>
                                    </div>
                                </div>
                            </div>
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
                                                <span class="lecture-duration">{{ lecture.duration || '1' }}min</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" *ngIf="reviewDialogVisible">
            <!-- Modal content -->
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">Đánh giá khóa học</h2>
                    <button (click)="reviewDialogVisible = false" class="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
                </div>

                <!-- Rating -->
                <div class="mb-4">
                    <label class="font-semibold block mb-2 text-lg">Điểm đánh giá</label>
                    <div class="flex items-center gap-1">
                        <ng-container *ngFor="let star of stars; let i = index">
                            <button type="button" (click)="selectRating(i + 1)" (mouseenter)="hoverRating(i + 1)" (mouseleave)="hoverRating(0)">
                                <svg
                                    class="w-8 h-8"
                                    [ngClass]="{
                                        'text-yellow-400': i + 1 <= (hoveredRating || ratingValue),
                                        'text-gray-300': i + 1 > (hoveredRating || ratingValue)
                                    }"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.387 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.538 1.118l-3.387-2.46a1 1 0 00-1.175 0l-3.387 2.46c-.783.57-1.838-.196-1.538-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.294 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"
                                    />
                                </svg>
                            </button>
                        </ng-container>
                    </div>
                </div>

                <!-- Review Textarea -->
                <div class="mb-6">
                    <label class="font-semibold block mb-2 text-lg">Nội dung đánh giá</label>
                    <textarea [(ngModel)]="reviewText" rows="5" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Nhập cảm nghĩ của bạn..."></textarea>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end gap-2">
                    <button (click)="reviewDialogVisible = false" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Hủy</button>
                    <button (click)="submitReview()" class="px-4 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700">Gửi đánh giá</button>
                </div>
            </div>
        </div>
        <!-- report -->
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" *ngIf="reportDialogVisible">
            <!-- Modal content -->
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">Báo cáo khóa học</h2>
                    <button (click)="reportDialogVisible = false" class="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
                </div>

                <!-- Course Name (readonly) -->
                <div class="mb-4">
                    <label class="block font-semibold mb-2 text-lg">Tên khóa học</label>
                    <input type="text" class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700" [value]="specialObject.courseName" disabled />
                </div>

                <!-- Reason Select -->
                <div class="mb-4">
                    <label class="block font-semibold mb-2 text-lg">Lý do báo cáo</label>
                    <select [(ngModel)]="reportReason" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600">
                        <option value="" disabled selected>Chọn lý do</option>
                        <option *ngFor="let reason of reportReasons" [value]="reason">{{ reason }}</option>
                    </select>
                </div>

                <!-- Description -->
                <div class="mb-4">
                    <label class="block font-semibold mb-2 text-lg">Mô tả chi tiết</label>
                    <textarea [(ngModel)]="reportDescription" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Nhập chi tiết lý do bạn muốn báo cáo..."></textarea>
                </div>

                <!-- Upload Image -->
                <div class="mb-6">
                    <label class="block font-semibold mb-2 text-lg">Hình ảnh bằng chứng (nếu có)</label>
                    <input
                        type="file"
                        (change)="onImageSelected($event)"
                        accept="image/*"
                        class="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                </div>

                <!-- Buttons -->
                <div class="flex justify-end gap-2">
                    <button (click)="reportDialogVisible = false" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Hủy</button>
                    <button *ngIf="!isBooleanReport" (click)="submitReport()" class="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700">Gửi báo cáo</button>
                    <p-progress-spinner class="p-4" *ngIf="isBooleanReport" strokeWidth="8" fill="transparent" animationDuration=".5s" [style]="{ width: '20px', height: '20px' }" />
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div *ngIf="isModalOpen" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl p-6 w-[40%] shadow-xl overflow-auto">
                <div class="mb-4">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Câu hỏi</h3>
                    <!-- Hiển thị HTML câu hỏi -->
                    <div class="text-gray-700" [innerHTML]="quiz.questions[currentQuestionIndex].content"></div>
                </div>

                <!-- Danh sách đáp án -->
                <div class="space-y-3 mb-6">
                    <label
                        *ngFor="let answer of quiz.questions[currentQuestionIndex]?.answers"
                        class="flex items-center gap-3 px-4 py-3 border rounded-xl transition cursor-pointer"
                        [ngClass]="{
                            'border-green-500 bg-green-100': answerChecked && selectedAnswer === answer.content && answer.isCorrect,
                            'border-red-500 bg-red-100': answerChecked && selectedAnswer === answer.content && !answer.isCorrect,
                            'border-gray-200 hover:bg-blue-50': !answerChecked
                        }"
                    >
                        <input type="radio" name="answer" [value]="answer.content" class="form-radio text-blue-600" [disabled]="answerChecked" (change)="selectAnswer(answer)" />
                        <span class="text-gray-800" [innerHTML]="answer.content"></span>
                    </label>
                </div>

                <!-- Nút -->
                <div class="flex justify-end gap-4">
                    <button (click)="closeModal()" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300">Huỷ làm bài</button>
                    <button (click)="nextQuestion()" class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">Câu hỏi tiếp theo</button>
                </div>
            </div>
        </div>
    `,
    styles: `
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
export class VideoLearning1Component implements OnInit {
    isBooleanReport = false;
    quiz: any;
    currentQuestionIndex = 0;
    isModalOpen = false;
    selectedAnswer: string | null = null;
    answerChecked = false;

    openQuizModal($event: any) {
        this.quiz = $event;
        this.currentQuestionIndex = 0;
        this.isModalOpen = true;
        this.selectedAnswer = null;
        this.answerChecked = false;
    }
    selectAnswer(answer: any) {
        this.selectedAnswer = answer.content;
        this.answerChecked = true;
        if (answer.isCorrect) {
            this.playSound('correct');
        } else {
            this.playSound('wrong');
        }
    }
    playSound(type: 'correct' | 'wrong') {
        const audio = new Audio();
        audio.src = `assets/sounds/${type}.mp3`;
        audio.load();
        audio.play();
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
            this.currentQuestionIndex++;
            this.selectedAnswer = null;
            this.answerChecked = false;
        } else {
            // Hết câu hỏi → có thể hiện kết quả
            this.closeModal();
        }
    }

    closeModal() {
        this.isModalOpen = false;
        this.quiz = null;
        this.selectedAnswer = null;
        this.answerChecked = false;
    }
    activeTab: number = 0;
    tabs = [
        { title: 'Overview', content: 'Content for Overview' },
        { title: 'Discussion', content: 'Content for Q & A' },
        { title: 'Reviews', content: 'Content for Reviews' },
        { title: 'Quiz', content: 'Quiz for Students' }
    ];

    setActiveTab(index: number) {
        this.activeTab = index;
    }
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
    courseId!: string;
    specialObject: any = {};

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private toastService: ToastService
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

    submitReport() {
        if (!this.courseId || !this.reportReason) {
            alert('Vui lòng chọn lý do và đảm bảo có ID khóa học!');
            return;
        }

        const formData = new FormData();
        formData.append('courseId', this.courseId.toString());
        formData.append('reason', this.reportReason);
        formData.append('description', this.reportDescription || '');
        if (this.reportImage) {
            formData.append('image', this.reportImage);
        }
        this.isBooleanReport = true;

        this.http.post('http://localhost:8080/report', formData).subscribe({
            next: (res) => {
                this.isBooleanReport = false;
                this.toastService.addToast('success', 'Báo cáo khóa học thành công');
                this.resetReportForm();
            },
            error: (err) => {
                console.error(err);
                this.isBooleanReport = false;
                this.toastService.addToast('error', 'Báo cáo khóa học thất bại');
            }
        });
    }

    resetReportForm() {
        this.reportReason = '';
        this.reportDescription = '';
        this.reportImage = null;
        this.reportDialogVisible = false;
    }
}

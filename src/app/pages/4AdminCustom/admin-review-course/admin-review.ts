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
import { CommonModule } from '@angular/common';
import { AdminReviewBasicInfoComponent } from './admin-review-basic-info';
import { AdminReviewCurriculumComponent } from './curriculum';
import { AdminReviewQuizComponent } from './quiz';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CourseReloadService } from '../../service/course-reload.service';
import { ToastService } from '../../service/toast.service';

@Component({
    selector: 'app-admin-review',
    standalone: true,
    imports: [RouterLink,AdminReviewQuizComponent, AdminReviewCurriculumComponent, AdminReviewBasicInfoComponent, CommonModule, PaginatorModule, ButtonModule, TableModule, RatingModule, FormsModule, DialogModule, ToastModule, RippleModule],
    template: `
        <div class="bg-white shadow p-4 flex items-center justify-between">
            <!-- Logo -->
            <div class="logo">
                <a [routerLink]="'/admin'">Edu<span>Flow</span></a>
            </div>

            <!-- Steps -->
            <div class="flex items-center gap-4">
                <ng-container *ngFor="let step of ['Thông tin khóa học', 'Bài giảng', 'Câu hỏi ôn tập']; let i = index">
                    <div class="flex items-center">
                        <button
                            (click)="setStep(i + 1)"
                            [ngClass]="{
                                'text-blue-600 font-semibold': activeStep === i + 1,
                                'text-gray-500': activeStep !== i + 1
                            }"
                            class="text-lg hover:text-blue-500 transition-colors"
                        >
                            {{ i + 1 }}. {{ step }}
                        </button>
                        <span *ngIf="i < 2" class="mx-2 text-gray-400">→</span>
                    </div>
                </ng-container>
            </div>

            <!-- Buttons -->
            <div class="flex gap-2">
                <!-- Hiển thị nút Phê duyệt và Từ chối chỉ khi context là 'pending' -->
                <button *ngIf="context === 'pending'" (click)="approve()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm">Phê duyệt</button>
                <button *ngIf="context === 'pending'" (click)="reject()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm">Từ chối</button>

                <!-- Nút Quay lại luôn hiển thị -->
                <button (click)="goBack()" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm">Quay lại</button>
            </div>
        </div>

        <!-- Nội dung theo step -->
        <div class="">
            <ng-container [ngSwitch]="activeStep">
                <div *ngSwitchCase="1">
                    <app-admin-review-basic-info [courseId]="courseId" />
                </div>

                <div *ngSwitchCase="2">
                    <app-admin-review-curriculum [courseId]="courseId" />
                </div>

                <div *ngSwitchCase="3">
                    <!-- here -->
                    <app-admin-review-quiz [courseId]="courseId" />
                </div>
            </ng-container>
        </div>
    `,
    styles: `
        .logo a {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-decoration: none;
        }
        .logo span {
            color: #007bff;
            font-size: 24px;
        }
    `
})
export class AdminReviewComponent implements OnInit {
    goBack(): void {
        // Lấy giá trị tabIndex từ queryParams
        this.route.queryParams.subscribe((params) => {
            const currentTabIndex = params['tabIndex'] ? params['tabIndex'] : '0'; // Mặc định là 0 nếu không có

            if (this.context === 'report') {
                // Nếu context là 'report', điều hướng về trang danh sách báo cáo
                this.router.navigate(['/admin/report/list']);
            } else {
                // Nếu context không phải 'report', điều hướng về trang approve-course và truyền lại tabIndex
                this.router.navigate(['/admin/courses/approve-course'], {
                    queryParams: { tabIndex: currentTabIndex }
                });
            }
        });
    }

    activeStep: number = 1;
    context: string = ''; // Lưu context từ URL
    courseId: string = ''; // Lưu courseId từ URL
    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private courseReloadService: CourseReloadService,
        private toastService: ToastService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Lấy tham số context từ route
        this.route.params.subscribe((params) => {
            this.courseId = params['courseId']; // Lấy courseId từ URL
            this.context = params['context']; // 'pending' hoặc 'report'
        });
    }

    setStep(step: number): void {
        this.activeStep = step;
    }

    approve(): void {
        if (this.context === 'pending') {
            console.log('Phê duyệt khóa học từ trang pending');
            Swal.fire({
                title: 'Xác nhận?',
                text: 'Bạn sẽ không thể thay đổi sau khi phê duyệt khóa học!',
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Hủy',
                confirmButtonText: 'Duyệt',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.http.put<any>(`http://localhost:8080/course/${this.courseId}/accept`, {}).subscribe((res) => {
                        this.courseReloadService.sendReload('accept');
                        this.route.queryParams.subscribe((params) => {
                            const currentTabIndex = params['tabIndex'] ? params['tabIndex'] : '0';
                            this.router.navigate(['/admin/courses/approve-course'], {
                                queryParams: { tabIndex: currentTabIndex }
                            });
                        });
                        this.toastService.addToast('success', 'Phê duyệt khóa học thành công');
                    });
                }
            });
        } else if (this.context === 'report') {
            console.log('Phê duyệt báo cáo từ trang report');
            // Xử lý phê duyệt từ trang "report"
        }
    }

    reject(): void {
        if (this.context === 'pending') {
            console.log('Từ chối khóa học từ trang pending');
            Swal.fire({
                title: 'Xác nhận?',
                text: 'Bạn sẽ không thể thay đổi sau khi từ chối khóa học!',
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Hủy',
                confirmButtonText: 'Từ chối',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.http.put<any>(`http://localhost:8080/course/${this.courseId}/reject`, {}).subscribe((res) => {
                        this.courseReloadService.sendReload('reject');
                        this.route.queryParams.subscribe((params) => {
                            const currentTabIndex = params['tabIndex'] ? params['tabIndex'] : '0';
                            this.router.navigate(['/admin/courses/approve-course'], {
                                queryParams: { tabIndex: currentTabIndex }
                            });
                        });
                        this.toastService.addToast('success', 'Từ chối khóa học thành công');
                    });
                }
            });
        } else if (this.context === 'report') {
            console.log('Từ chối báo cáo từ trang report');
            // Xử lý từ chối từ trang "report"
        }
    }
}

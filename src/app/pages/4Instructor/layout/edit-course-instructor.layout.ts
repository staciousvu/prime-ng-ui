import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CourseHeaderComponent } from '../component/course-header';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { OnlyNotificationContainerComponent } from '../../SharedComponent/only-notification-container';
import { ToastContainerComponent } from '../../SharedComponent/toast-container-components';
@Component({
    selector: 'app-edit-course-instructor-layout',
    standalone: true,
    imports: [RouterModule, RouterOutlet, CourseHeaderComponent, RouterLink, CommonModule, OnlyNotificationContainerComponent, ToastContainerComponent],
    template: `
        <app-only-notification-container />
        <app-toast-container></app-toast-container>
        <!-- Top nav -->
        <app-course-header [courseId]="courseId" [courseStatus]="course.status" />

        <main class="flex mx-auto py-10 px-6 sm:px-8 lg:px-10 max-w-[80%]" style="margin-top:0px;">
            <!-- Sidebar -->
            <aside class="w-72 flex-shrink-0 bg-white p-6">
    <!-- Course Creation Progress -->
    <!-- <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Tạo khóa học</h3>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" style="width: 60%"></div>
        </div>
        <p class="text-xs text-gray-500 mt-2 text-right">3/5 hoàn thành</p>
    </div> -->

    <!-- Navigation Menu -->
    <nav aria-label="Plan your course" class="mb-8">
        <ul class="space-y-1">
            <li [routerLink]="['/edit-course', courseId, 'goals']"
                routerLinkActive="bg-blue-50 text-blue-600 font-medium"
                class="flex items-center rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-50">
                <div class="flex items-center w-full px-3 py-2.5">
                    <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                        <i class="fas fa-users text-xs"></i>
                    </div>
                    <span class="text-gray-700">Người học mục tiêu</span>
                    
                </div>
            </li>
            
            <li [routerLink]="['/edit-course', courseId, 'curriculum']"
                routerLinkActive="bg-blue-50 text-blue-600 font-medium"
                class="flex items-center rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-50">
                <div class="flex items-center w-full px-3 py-2.5">
                    <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                        <i class="fas fa-list-ul text-xs"></i>
                    </div>
                    <span class="text-gray-700">Chương trình học</span>
                    
                </div>
            </li>
            
            <li [routerLink]="['/edit-course', courseId, 'quiz']"
                routerLinkActive="bg-blue-50 text-blue-600 font-medium"
                class="flex items-center rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-50">
                <div class="flex items-center w-full px-3 py-2.5">
                    <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                        <i class="fas fa-question-circle text-xs"></i>
                    </div>
                    <span class="text-gray-700">Câu hỏi kiểm tra</span>
                
                </div>
            </li>
            
            <li [routerLink]="['/edit-course', courseId, 'landing-page']"
                routerLinkActive="bg-blue-50 text-blue-600 font-medium"
                class="flex items-center rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-50">
                <div class="flex items-center w-full px-3 py-2.5">
                    <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                        <i class="fas fa-home text-xs"></i>
                    </div>
                    <span class="text-gray-700">Trang đích</span>
                </div>
            </li>
             
            <li [routerLink]="['/edit-course', courseId, 'price']"
                routerLinkActive="bg-blue-50 text-blue-600 font-medium"
                class="flex items-center rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-50">
                <div class="flex items-center w-full px-3 py-2.5">
                    <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                        <i class="fas fa-tag text-xs"></i>
                    </div>
                    <span class="text-gray-700">Giá khóa học</span>
                </div>
            </li>
        </ul>
    </nav>

    <!-- Action Buttons -->
    <div class="space-y-3 mt-6">
        <button (click)="submitForPreview()" *ngIf="course.status == 'DRAFT'" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md transition duration-200 flex items-center justify-center">
            <i class="fas fa-paper-plane mr-2"></i>
            Gửi để xét duyệt
        </button>
        
        <button class="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2.5 rounded-md transition duration-200 flex items-center justify-center">
            <i class="fas fa-eye mr-2"></i>
            Xem trước
        </button>
    </div>
    
    <!-- Course Status -->
    <div class="mt-6 pt-5 border-t border-gray-200">
        <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">Trạng thái:</span>
            <span class="text-sm font-medium bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full">
                Bản nháp
            </span>
        </div>
    </div>
</aside>

            <!-- Main content -->
            <div class="w-full">
                <router-outlet />
            </div>
        </main>
        <!-- Modal -->
        <div *ngIf="cannotsubmit" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Tại sao tôi không thể gửi để xét duyệt?</h2>
            <button (click)="turnoff()" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <p class="mb-4">Bạn gần như đã sẵn sàng để gửi khóa học của mình. Dưới đây là một vài mục bạn cần hoàn thành thêm.</p>

        <ul class="list-disc list-inside space-y-3">
            <li>
                Trên trang <a href="#" class="text-blue-600 underline">Người học dự kiến</a>, bạn cần:
                <ul class="list-[circle] ml-6 mt-1 space-y-1 text-gray-700">
                    <li>Chỉ định các yêu cầu hoặc điều kiện tiên quyết của khóa học</li>
                    <li>Chỉ định ít nhất 4 mục tiêu học tập của khóa học</li>
                    <li>Chỉ định khóa học này dành cho ai</li>
                </ul>
            </li>
            <li>
                Trên trang <a href="#" class="text-blue-600 underline">Nội dung khóa học</a>, bạn cần:
                <ul class="list-[circle] ml-6 mt-1 space-y-1 text-gray-700">
                    <li>Có ít nhất 30 phút nội dung video</li>
                    <li>Có ít nhất 5 bài giảng</li>
                    <li>Có nội dung cho tất cả các bài giảng</li>
                </ul>
            </li>
            <li>
                Trên trang <a href="#" class="text-blue-600 underline">Trang giới thiệu khóa học</a>, bạn cần:
                <ul class="list-[circle] ml-6 mt-1 space-y-1 text-gray-700">
                    <li>Chọn trình độ của khóa học</li>
                    <li>Chọn nội dung chính được giảng dạy trong khóa học</li>
                    <li>Tải lên ảnh của giảng viên</li>
                </ul>
            </li>
            <li>
                Trên trang <a href="#" class="text-blue-600 underline">Giá</a>, bạn cần:
                <ul class="list-[circle] ml-6 mt-1 space-y-1 text-gray-700">
                    <li>Chọn giá cho khóa học của bạn</li>
                </ul>
            </li>
        </ul>

        <p class="mt-6 text-sm text-gray-700">Khi bạn hoàn thành các bước trên, bạn sẽ có thể gửi khóa học của mình để xét duyệt thành công.</p>

        <p class="mt-2 text-sm">Vẫn gặp sự cố? <a href="#" class="text-blue-600 underline">Xem trang Hỗ trợ này</a></p>
    </div>
</div>


        <!-- Modal -->
    `,
    styles: `
        .router-link-active {
            border-left: 4px solid black;
            background-color: #f9fafb; /* optional for highlight */
        }
    `
})
export class EditCourseInstructorLayoutComponent implements OnInit {
    turnoff() {
        this.cannotsubmit = false;
    }
    cannotsubmit = false;
    submitForPreview() {
        Swal.fire({
            title: 'Xác nhận?',
            text: 'Bạn sẽ không thể thay đổi sau khi submit khóa học!',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Submit',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                //   this.submitCourse();
                this.http.get<any>(`http://localhost:8080/course/check-before-submit/${this.courseId}`).subscribe((res) => {
                    if (res.data == true) {
                        this.http.post<any>(`http://localhost:8080/course/${this.courseId}/submit`, {}).subscribe((res) => {
                            this.loadCourse();
                            Swal.fire('Đã đăng ký!', 'Bạn đã submit thành công.', 'success');
                        });
                    } else {
                        this.cannotsubmit = true;
                    }
                });
            }
        });
    }
    courseId: number = 0;
    course: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {}
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.courseId = +params.get('id')!;
        });
        this.loadCourse();
    }
    loadCourse() {
        this.http.get<any>(`http://localhost:8080/course/basicinfo/${this.courseId}`).subscribe((res) => {
            this.course = res.data;
        });
    }
}

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
    imports: [RouterModule, RouterOutlet, CourseHeaderComponent, RouterLink,CommonModule,OnlyNotificationContainerComponent,ToastContainerComponent],
    template: `
                
        <app-only-notification-container/>
        <app-toast-container></app-toast-container>
        <!-- Top nav -->
        <app-course-header [courseId]="courseId" [courseStatus]="course.status"/>

        <main class="flex mx-auto py-10 px-6 sm:px-8 lg:px-10 max-w-[80%]" style="margin-top:0px;">
            <!-- Sidebar -->
            <aside class="w-72 flex-shrink-0 pr-10 mt-10">
                <!-- PLAN YOUR COURSE -->
                <nav aria-label="Plan your course" class="mb-12">
                    <p class="font-semibold text-base text-[#1E293B] mb-5">Plan your course</p>
                    <ul class="space-y-2 text-base font-normal">
                        <li [routerLink]="['/edit-course', courseId, 'goals']" routerLinkActive="border-l-4 border-blue-500 text-blue-500 font-semibold"  class="flex items-center space-x-3 cursor-pointer group hover:bg-gray-100 px-3 py-2 transition duration-200">
                            <span class="w-6 h-6 rounded-full border border-[#334155] flex items-center justify-center transition duration-200 group-hover:border-blue-500"> </span>
                            <label class="text-lg select-none text-[#334155] group-hover:text-blue-600 transition duration-200"> Intended learners </label>
                        </li>
                    </ul>
                </nav>

                <!-- CREATE YOUR CONTENT -->
                <nav aria-label="Create your content" class="mb-12">
                    <p class="font-semibold text-base text-[#1E293B] mb-5">Create your content</p>
                    <ul class="space-y-2 text-base font-normal">
                        <li
                            [routerLink]="['/edit-course', courseId, 'curriculum']"
                            routerLinkActive="border-l-4 border-blue-500 text-blue-500 font-semibold" 
                            class="flex items-center space-x-3 cursor-pointer group hover:bg-gray-100 px-3 py-2 transition duration-200"
                        >
                            <span class="w-6 h-6 rounded-full border border-[#334155] flex items-center justify-center transition duration-200 group-hover:border-blue-500"> </span>
                            <label class="text-lg select-none text-[#334155] group-hover:text-blue-600 transition duration-200"> Curriculum </label>
                        </li>
                        <li
                            [routerLink]="['/edit-course', courseId, 'quiz']"
                            routerLinkActive="border-l-4 border-blue-500 text-blue-500 font-semibold" 
                            class="flex items-center space-x-3 cursor-pointer group hover:bg-gray-100 px-3 py-2 transition duration-200"
                        >
                            <span class="w-6 h-6 rounded-full border border-[#334155] flex items-center justify-center transition duration-200 group-hover:border-blue-500"> </span>
                            <label class="text-lg select-none text-[#334155] group-hover:text-blue-600 transition duration-200"> Quiz </label>
                        </li>
                    </ul>
                </nav>

                <!-- PUBLISH YOUR COURSE -->
                <nav aria-label="Publish your course">
                    <p class="font-semibold text-base text-[#1E293B] mb-5">Publish your course</p>
                    <ul class="space-y-2 text-base font-normal">
                        <!-- ACTIVE ITEM -->
                        <li
                            [routerLink]="['/edit-course', courseId, 'landing-page']"
                            routerLinkActive="border-l-4 border-blue-500 text-blue-500 font-semibold" 
                            class="flex items-center space-x-3 cursor-pointer group hover:bg-gray-100 px-3 py-2 transition duration-200"
                        >
                            <span class="w-6 h-6 rounded-full border border-[#334155] flex items-center justify-center transition duration-200 group-hover:border-blue-500">
                                <!-- <i class="fas fa-check text-xs"></i> -->
                            </span>
                            <label class="text-lg select-none text-[#334155] group-hover:text-blue-600 transition duration-200"> Course landing page </label>
                        </li>

                        <!-- OTHER ITEMS -->
                        <li [routerLink]="['/edit-course', courseId, 'price']" routerLinkActive="border-l-4 border-blue-500 text-blue-500 font-semibold"  class="flex items-center space-x-3 cursor-pointer group hover:bg-gray-100 px-3 py-2 transition duration-200">
                            <span class="w-6 h-6 rounded-full border border-[#334155] flex items-center justify-center transition duration-200 group-hover:border-blue-500"> </span>
                            <label class="text-lg select-none text-[#334155] group-hover:text-blue-600 transition duration-200"> Pricing </label>
                        </li>
                    </ul>
                </nav>
                <button (click)="submitForPreview()" *ngIf="course.status=='DRAFT'" class="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200">Submit for Review</button>
            </aside>

            <!-- Main content -->
            <div class="w-full">
                <router-outlet />
            </div>
        </main>
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
        this.http.post<any>(`http://localhost:8080/course/${this.courseId}/submit`,{}).subscribe(
            (res)=>{
                this.loadCourse();
                Swal.fire('Đã đăng ký!', 'Bạn đã submit thành công.', 'success');
            }
        )
        }
      });
}
    courseId: number = 0;
    course:any;
    constructor(private activatedRoute: ActivatedRoute,
        private http:HttpClient
    ) {}
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.courseId = +params.get('id')!;
        });
        this.loadCourse();
    }
    loadCourse(){
        this.http.get<any>(`http://localhost:8080/course/basicinfo/${this.courseId}`).subscribe(
            (res)=>{
                this.course=res.data
            }
        )
    }
}

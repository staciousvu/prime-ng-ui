import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CourseHeaderComponent } from '../component/course-header';

@Component({
    selector: 'app-edit-course-instructor-layout',
    standalone: true,
    imports: [RouterModule, RouterOutlet, CourseHeaderComponent, RouterLink],
    template: `
        <!-- Top nav -->
        <app-course-header [courseName]="courseName" [status]="status"/>

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
                <button class="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200">Submit for Review</button>
            </aside>

            <!-- Main content -->
            <div class="w-full">
                <router-outlet />
            </div>
        </main>
    `,
    styles: `
        .router-link-active {
            border-left: 4px solid black;
            background-color: #f9fafb; /* optional for highlight */
        }
    `
})
export class EditCourseInstructorLayoutComponent implements OnInit {
    courseId: number = 0;
    courseName:string='';
    status:string='';
    constructor(private activatedRoute: ActivatedRoute) {}
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.courseId = +params.get('id')!;
        });
        this.activatedRoute.queryParams.subscribe(params => {
          this.courseName = params['courseName'];
          this.status = params['status'];
        });
    }
}

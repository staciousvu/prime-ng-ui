import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../../4User/star-rating';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-instructor-courses',
    standalone: true,
    imports: [StarRatingComponent, FormsModule, CommonModule, RouterLink],
    template: `
        <div class="p-10">
            <div class="w-full">
                <h1 class="text-4xl font-bold mb-6">Courses</h1>
            </div>
            <div class="w-full mt-5">
                <!-- Header -->
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center space-x-2">
                        <input (input)="load()" [(ngModel)]="this.keyword" class="border border-gray-300 rounded px-4 py-3" placeholder="Search your courses" type="text" />
                        <button class="bg-purple-600 text-white px-4 py-3 rounded">
                            <i class="fas fa-search"> </i>
                        </button>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button class="bg-purple-600 text-white px-4 py-3 rounded">New course</button>
                    </div>
                </div>
                <!-- Course List -->
                <div class="space-y-4">
                    <!-- Course Item -->
                    <div *ngFor="let course of courses" class="relative border border-gray-300 rounded p-4 flex items-center hover:bg-gray-100 group overflow-hidden">
                        <!-- Overlay for Edit Course -->
                        <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                            <button
                                [routerLink]="['/edit-course', course.id, 'goals']"
                                [queryParams]="{ courseName: course.title, status: course.status }"
                                class="bg-purple-600 text-white text-sm px-4 py-2 rounded shadow 
         hover:bg-purple-700 active:scale-95 transition transform duration-200"
                            >
                                Edit Course
                            </button>
                        </div>

                        <!-- Thumbnail Section -->
                        <div class="w-32 h-32 overflow-hidden rounded flex-shrink-0">
                            <img alt="Course thumbnail" class="w-full h-full object-cover" [src]="course.thumbnail" />
                        </div>

                        <!-- Course Info Section -->
                        <div class="ml-6 flex flex-col space-y-2">
                            <h2 class="text-xl font-bold">
                                {{ course.title }}
                            </h2>
                            <span
                      class="inline-block w-max px-2 py-0.5 rounded-full text-xs font-semibold"

                                [ngClass]="{
                                    'bg-gray-200 text-gray-800': course.status === 'DRAFT',
                                    'bg-green-200 text-green-800': course.status === 'ACCEPTED',
                                    'bg-red-200 text-red-800': course.status === 'REJECTED',
                                    'bg-yellow-200 text-yellow-800': course.status === 'PENDING'
                                }"
                            >
                                {{ course.status }}
                            </span>

                            <p class="text-gray-500">
                                {{ course.subtitle }}
                            </p>
                            <p class="text-gray-500 flex items-center space-x-2">
                                <span>{{ course.avgRating | number: '1.0-1' }}</span>
                                <app-star-rating [rating]="course.avgRating"></app-star-rating>
                                <span>{{ course.countRating }} Reviews</span>
                            </p>

                            <p class="text-gray-500">đ{{ course.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: ``
})
export class InstructorCoursesComponent implements OnInit {
    courses: any[] = [];
    keyword: string = '';
    page: any = 0;
    size: any = 100;
    constructor(private http: HttpClient) {}
    ngOnInit(): void {
        this.load();
    }
    load() {
        let params = new HttpParams();
        params = params.set('page', this.page);
        params = params.set('size', this.size);
        params = params.set('keyword', this.keyword);

        this.http.get<any>(`http://localhost:8080/instructor/my-courses`, { params }).subscribe((res) => {
            this.courses = res.data.content;
        });
    }
}

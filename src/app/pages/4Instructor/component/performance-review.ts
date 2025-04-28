import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

@Component({
    selector: 'app-performance-review',
    standalone: true,
    imports: [RouterModule, CommonModule],
    template: `
        <main class="w-full mx-auto px-6 py-8 text-[17px]">
            <header class="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <h1 class="text-5xl font-extrabold text-gray-900 inline-block">Reviews</h1>
                    <select
                        (change)="onCourseChange($event)"
                        aria-label="All courses dropdown"
                        class="text-purple-700 font-semibold text-xl bg-white px-3 py-2"
                    >
                        <option class="text-black font-extralight" selected value="0">All courses</option>
                        <option *ngFor="let course of instructor_courses" [value]="course.id" class="text-gray-800 font-extralight">
                            {{ course.title }} 
                        </option>
                    </select>
                </div>

                <!-- Nút Export -->
                <button (click)="exportToExcel()" class="text-purple-700 border border-purple-700 hover:bg-purple-100 active:bg-purple-200 font-semibold px-4 py-2 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md active:scale-95">
                    Export to Excel
                </button>
            </header>

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-700 dark:text-gray-300 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <caption class="p-6 text-2xl font-extrabold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Our Reviews
                        <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">Trusted feedback from our learners worldwide 🌍</p>
                    </caption>
                    <thead class="text-md uppercase bg-purple-500 dark:bg-gray-800 text-white dark:text-gray-200">
                        <tr>
                            <th class="px-6 py-4">Student</th>
                            <th class="px-6 py-4">Rating</th>
                            <th class="px-6 py-4">Comment</th>
                            <th class="px-6 py-4">Created At</th>
                            <th class="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            *ngFor="let review of reviews; let i = index"
                            class="transition hover:scale-[1.01] hover:shadow-md duration-300 ease-in-out"
                            [ngClass]="{ 'bg-white': i % 2 === 0, 'bg-gray-50': i % 2 !== 0, 'dark:bg-gray-800': true, 'dark:hover:bg-gray-700': true }"
                        >
                            <!-- Student with avatar -->
                            <td class="px-6 py-4 flex items-center space-x-3">
                                <img [src]="review.reviewerAvatar || 'https://i.pravatar.cc/40?img=' + i" class="w-10 h-10 rounded-full shadow-sm" />
                                <span class="font-medium">{{ review.reviewerName }}</span>
                            </td>

                            <!-- Rating with stars -->
                            <td class="px-6 py-4">
                                <div class="flex items-center space-x-1">
                                    <ng-container *ngFor="let star of [].constructor(review.rating)">
                                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.962c.3.922-.755 1.688-1.539 1.118l-3.371-2.448a1 1 0 00-1.176 0l-3.371 2.448c-.784.57-1.838-.196-1.539-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.96 9.39c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.963z"
                                            />
                                        </svg>
                                    </ng-container>
                                    <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{ review.rating }}/5</span>
                                </div>
                            </td>

                            <!-- Comment with tooltip -->
                            <td class="px-6 py-4 truncate max-w-xs" title="{{ review.review }}">
                                {{ review.review }}
                            </td>

                            <!-- Created at -->
                            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {{ review.createdAt | date: 'medium' }}
                            </td>

                            <!-- Status tag -->
                            <td class="px-6 py-4">
                                <span
                                    [ngClass]="{
                                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': review.rating >= 4,
                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': review.rating == 3,
                                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': review.rating <= 2
                                    }"
                                    class="text-xs font-semibold px-2 py-1 rounded-full shadow"
                                >
                                    {{ review.rating >= 4 ? 'Excellent' : review.rating == 3 ? 'Average' : 'Needs Work' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Pagination -->
                <div class="flex justify-center mt-4" *ngIf="totalPages > 1">
                    <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 0" class="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">Previous</button>

                    <ng-container *ngFor="let page of [].constructor(totalPages); let i = index">
                        <button (click)="goToPage(i)" [ngClass]="{ 'bg-purple-600 text-white': i === currentPage, 'bg-gray-200': i !== currentPage }" class="mx-1 px-3 py-1 rounded hover:bg-purple-300">
                            {{ i + 1 }}
                        </button>
                    </ng-container>

                    <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages - 1" class="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">Next</button>
                </div>
            </div>
        </main>
    `,
    styles: ``
})
export class PerformanceReviewComponent implements OnInit {
    exportToExcel(): void {
        const worksheet = XLSX.utils.json_to_sheet(this.reviews.map(review => ({
          'Học viên': review.reviewerName,
          'Đánh giá': review.rating,
          'Nhận xét': review.review,
          'Ngày tạo': new Date(review.createdAt).toLocaleString()
        })));
    
        const workbook = { Sheets: { 'Đánh giá': worksheet }, SheetNames: ['Đánh giá'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, 'reviews.xlsx');
      }
    currentPage: number = 0;
    totalPages: number = 0;
    pageSize: number = 10;
    selectedCourseId: number = 0;

    instructor_courses: any[] = [];
    reviews: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        let params = new HttpParams();
            params = params.set('page', 0);
            params = params.set('size', 100);
            params = params.set('keyword','');
        this.http.get<any>(`http://localhost:8080/instructor/my-courses`,{params}).subscribe((response) => {
            this.instructor_courses = response.data.content;
        });

        // Gọi mặc định lần đầu tiên để load tất cả
        this.getReviews(0);
    }

    onCourseChange(event: Event) {
        const selectedCourseId = Number((event.target as HTMLSelectElement).value);
        this.getReviews(selectedCourseId);
    }

    getReviews(courseId: number, page: number = 0) {
        this.selectedCourseId = courseId;
        this.currentPage = page;

        const url = `http://localhost:8080/review/instructor/special/${courseId}?page=${page}&size=${this.pageSize}`;
        this.http.get<any>(url).subscribe((res) => {
            this.reviews = res.data?.content || [];
            this.totalPages = res.data?.totalPages || 0;
        });
    }
    goToPage(page: number) {
        if (page >= 0 && page < this.totalPages) {
            this.getReviews(this.selectedCourseId, page);
        }
    }
}

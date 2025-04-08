import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';

interface Course {
    imageUrl: string;
    name: string;
    duration: string;
    language: string;
    rating: number;
    inventoryStatus?: string;
}
export interface RevenueInstructorResponse {
    revenue: number;
    totalStudents: number;
    totalCourses: number;
    revenueCourseInstructors: RevenueCourseInstructor[];
}

export interface RevenueCourseInstructor {
    id: number;
    courseName: string;
    price: number;
    enrolledStudents: number;
    revenue: number;
}
@Component({
    selector: 'app-view-instructor',
    standalone: true,
    imports: [TabsModule, ButtonModule, CommonModule, FormsModule, TableModule,RouterLink],
    styles: ``,
    template: `
        <div class="card" style="padding: 6px; margin: 8px; background-color: transparent;">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <!-- <p-button label="Back" icon="pi pi-arrow-left" class="me-5" [routerLink]="['/admin/courses/list']" /> -->
                    <p-button label="Back" icon="pi pi-arrow-left" class="me-5" [routerLink]="['/admin/account/list-instructor']"/>
                    <span class="font-semibold text-xl">View instructor</span>
                </div>
                
            </div>
        </div>

        <div class="card mx-8 mt-4">
            <p-tabs value="2">
                <p-tablist>
                    <p-tab value="0" class="text-lg">Thông tin cá nhân</p-tab>
                    <p-tab value="1" class="text-lg">Khóa học đã tạo</p-tab>
                    <p-tab value="2" class="text-lg">Doanh thu</p-tab>
                    <!-- <p-tab value="3" class="text-lg">Đánh giá từ học viên</p-tab> -->
                </p-tablist>
                <p-tabpanels>
                    <p-tabpanel value="0">
                        <p class="p-4">hello</p>
                    </p-tabpanel>

                    <p-tabpanel value="1">
                        <div *ngIf="courses.length === 0" class="p-4 text-red-500">Không có khóa học nào để hiển thị.</div>
                        <div class="space-y-4">
                            <div *ngFor="let course of courses; let i = index" class="course-card flex flex-col sm:flex-row items-center p-4 bg-white rounded-lg">
                                <div class="relative w-12 h-12 sm:w-20 sm:h-20">
                                    <img class="w-full h-full object-cover rounded-lg" [src]="course.imageUrl" [alt]="course.name" (error)="handleImageError($event)" />
                                    <span
                                        *ngIf="course.inventoryStatus"
                                        class="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded"
                                        [ngClass]="{
                                            'bg-green-500': getSeverity(course) === 'success',
                                            'bg-yellow-500': getSeverity(course) === 'warning',
                                            'bg-red-500': getSeverity(course) === 'danger'
                                        }"
                                    >
                                        {{ course.inventoryStatus }}
                                    </span>
                                </div>
                                <div class="flex-1 p-4">
                                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <span class="text-sm text-gray-500">{{ course.language }}</span>
                                            <h2 class="text-lg font-medium text-gray-900 mt-1">{{ course.name }}</h2>
                                        </div>
                                        <!-- <div class="bg-gray-100 rounded-full">
                      <div class="flex items-center gap-1 px-2">
                        <span class="text-sm font-medium text-gray-900">{{ course.rating }}</span>
                        <i class="pi pi-star-fill text-yellow-500"></i>
                      </div>
                    </div> -->
                                    </div>
                                    <div class="mt-2 text-gray-600">Thời lượng: {{ course.duration }}</div>
                                </div>
                                <div class="flex flex-col sm:items-end gap-2">
                                    <div class="flex space-x-2">
                                        <!-- <p-button
                      icon="pi pi-heart"
                      [outlined]="true"
                      (click)="addToFavorites(course)"
                      class="p-button-sm"
                    /> -->
                                        <p-button label="Xem chi tiết" icon="pi pi-info-circle" styleClass="p-button-success p-button-sm" (click)="viewCourseDetails(course)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Phân trang thủ công (nếu cần) -->
                        <div class="flex justify-center mt-4" *ngIf="courses.length > 5">
                            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" (click)="prevPage()" [disabled]="currentPage === 1">Previous</button>
                            <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
                            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
                        </div>
                    </p-tabpanel>
                    <p-tabpanel value="2">
                        <!-- here -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="card border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4">
                                <div class="flex justify-between">
                                    <div>
                                        <span class="block text-muted-color font-medium mb-4">Doanh thu</span>
                                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                                            {{ revenueData?.revenue | currency: 'VND' }}
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="card border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4">
                                <div class="flex justify-between">
                                    <div>
                                        <span class="block text-muted-color font-medium mb-4">Số học sinh</span>
                                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                                            {{ revenueData?.totalStudents }}
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-users text-orange-500 !text-xl"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="card border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4">
                                <div class="flex justify-between">
                                    <div>
                                        <span class="block text-muted-color font-medium mb-4">Tổng khóa học</span>
                                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                                        {{ revenueData?.totalCourses }}
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full" style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-book text-cyan-500 !text-xl"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="card rounded-lg p-4">
                            </div>
                        </div>

                        <hr />
                        <p-table [value]="courseRevenueList" class="p-datatable-striped p-datatable-hover">
                            <ng-template pTemplate="header">
                                <tr>
                                    <th class="text-center bg-gray-100 dark:bg-gray-800 py-3 text-gray-700 dark:text-gray-300">Khóa học</th>
                                    <th class="text-center bg-gray-100 dark:bg-gray-800 py-3 text-gray-700 dark:text-gray-300">Giá</th>
                                    <th class="text-center bg-gray-100 dark:bg-gray-800 py-3 text-gray-700 dark:text-gray-300">Số học viên</th>
                                    <th class="text-center bg-gray-100 dark:bg-gray-800 py-3 text-gray-700 dark:text-gray-300">Doanh thu</th>
                                </tr>
                            </ng-template>

                            <ng-template pTemplate="body" let-course>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="text-center p-3 text-gray-800 dark:text-gray-200">{{ course.courseName }}</td>
                                    <td class="text-center p-3 text-green-600 font-medium">{{ course.price | currency: 'VND' }}</td>
                                    <td class="text-center p-3 text-blue-600 font-medium">{{ course.enrolledStudents }}</td>
                                    <td class="text-center p-3 text-orange-600 font-medium">{{ course.revenue | currency: 'VND' }}</td>
                                </tr>
                            </ng-template>

                            <ng-template pTemplate="emptymessage">
                                <tr>
                                    <td colspan="4" class="text-center p-4 text-gray-500">Không có dữ liệu để hiển thị</td>
                                </tr>
                            </ng-template>
                        </p-table>

                        <!--here  -->
                    </p-tabpanel>
                    <!-- <p-tabpanel value="3"> </p-tabpanel> -->
                </p-tabpanels>
            </p-tabs>
        </div>
    `,
    providers: []
})
export class ViewInstructorComponent implements OnInit {
    items: any[] = [];

    courses: Course[] = [
        {
            imageUrl: 'https://th.bing.com/th/id/OIF.cHcR9RNGeslvhw6dAwJC1A?rs=1&pid=ImgDetMain',
            name: 'Lập trình JavaScript Cơ Bản',
            duration: '12 giờ',
            language: 'Tiếng Việt',
            rating: 5,
            inventoryStatus: 'INSTOCK'
        },
        {
            imageUrl: 'https://th.bing.com/th/id/OIF.cHcR9RNGeslvhw6dAwJC1A?rs=1&pid=ImgDetMain',
            name: 'Thiết Kế UI/UX Nâng Cao',
            duration: '15 giờ',
            language: 'Tiếng Anh',
            rating: 4,
            inventoryStatus: 'INSTOCK'
        },
        {
            imageUrl: 'https://th.bing.com/th/id/OIF.cHcR9RNGeslvhw6dAwJC1A?rs=1&pid=ImgDetMain',
            name: 'Học Python Từ Số 0',
            duration: '20 giờ',
            language: 'Tiếng Việt',
            rating: 4,
            inventoryStatus: 'LOWSTOCK'
        },
        {
            imageUrl: 'https://th.bing.com/th/id/OIF.cHcR9RNGeslvhw6dAwJC1A?rs=1&pid=ImgDetMain',
            name: 'Phát Triển Ứng Dụng Web Với React',
            duration: '18 giờ',
            language: 'Tiếng Anh',
            rating: 5,
            inventoryStatus: 'INSTOCK'
        },
        {
            imageUrl: 'https://th.bing.com/th/id/OIF.cHcR9RNGeslvhw6dAwJC1A?rs=1&pid=ImgDetMain',
            name: 'Kỹ Năng Quản Lý Dự Án CNTT',
            duration: '10 giờ',
            language: 'Tiếng Việt',
            rating: 3,
            inventoryStatus: 'OUTOFSTOCK'
        },
        {
            imageUrl: 'https://th.bing.com/th/id/OIF.cHcR9RNGeslvhw6dAwJC1A?rs=1&pid=ImgDetMain',
            name: 'Lập Trình Python Nâng Cao',
            duration: '25 giờ',
            language: 'Tiếng Anh',
            rating: 4,
            inventoryStatus: 'LOWSTOCK'
        }
    ];

    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalPages: number = Math.ceil(6 / 5); // Tính toán tổng số trang
    constructor(private http: HttpClient) {}
    revenueData: any = null;
    courseRevenueList: any[] = [];
    ngOnInit(): void {
        const instructorId = 1; // ID giảng viên
        this.http.get(`http://localhost:8080/revenue/${instructorId}`).subscribe((data: any) => {
            this.revenueData = data.data; // Dữ liệu từ API
            this.courseRevenueList = data.data.revenueCourseInstructors;
        });
    }

    viewCourseDetails(course: Course) {
        console.log('Xem chi tiết khóa học:', course.name);
    }

    addToFavorites(course: Course) {
        console.log('Thêm vào yêu thích:', course.name);
    }

    handleImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = 'https://via.placeholder.com/100';
    }

    getSeverity(course: Course) {
        switch (course.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    prevPage() {
        if (this.currentPage > 1) this.currentPage--;
    }

    nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
    }

    get paginatedCourses() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.courses.slice(start, end);
    }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavBarComponent } from './component/navbar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from './star-rating';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { ToastService } from '../service/toast.service';

@Component({
    selector: 'app-favorite',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CommonModule, StarRatingComponent, FormsModule],
    template: `
        <div class="mt-5 w-full">
            <div class="max-w-[80%] mx-auto flex flex-col">
                <!-- Header + Search in one row -->
                <div class="flex items-center justify-between px-5 py-2">
                    <h1 class="text-4xl font-bold">Favorite</h1>

                    <input type="text" [(ngModel)]="searchKeyword" (input)="onSearchChange()" placeholder="Search courses..." class="w-[20%] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <ul class="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 list-none p-0">
                    <li class=" rounded-lg cursor-pointer" *ngFor="let course of courses">
                        <div class="relative inline-block w-full overflow-hidden rounded-md">
                            <img
                                [src]="course.courseResponse.thumbnail || 'https://s.udemycdn.com/meta/default-meta-image-v2.png'"
                                alt=""
                                class="w-full h-[140px] object-cover rounded-md border border-gray-400 box-border transition duration-300 ease-in-out"
                            />

                            <!-- Menu icon -->
                            <div class="absolute top-2 right-2 z-10">
                                <div class="relative" (click)="toggleMenu(course.courseResponse.id)">
                                    <i class="fa-solid fa-ellipsis-vertical text-white bg-black/60 rounded-full p-2 cursor-pointer"></i>

                                    <!-- Dropdown menu -->
                                    <div *ngIf="activeMenuId === course.courseResponse.id" class="absolute right-0 mt-2 w-[140px] bg-white shadow-lg rounded-md z-20 border border-gray-200">
                                        <button class="w-full px-4 py-2 text-left text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition" (click)="removeFromFavorite(course)">
                                            <i class="fa-solid fa-trash"></i>
                                            Remove
                                        </button>
                                        <button class="w-full px-4 py-2 text-left text-sm flex items-center gap-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition" (click)="moveToCart(course)">
                                            <i class="fa-solid fa-cart-plus"></i>
                                            Move to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Course title and author -->
                        <p class="text-base font-semibold text-black mb-1">{{ course.courseResponse.title }}</p>
                        <p class="text-sm text-gray-600 mb-1">{{ course.courseResponse.authorName }}</p>

                        <div class="flex items-center text-sm text-yellow-500">
                            <span class="mr-1">{{ course.courseResponse.avgRating }}</span>
                            <app-star-rating [rating]="course.courseResponse.avgRating" />
                            <span class="ml-1 text-gray-500">({{ course.courseResponse.countRating }})</span>
                        </div>

                        <p class="text-sm text-gray-500 mb-1">{{ course.totalHour }} total hours • {{ course.totalLectures }} lectures</p>

                        <p class="text-base font-bold text-black">đ{{ course.courseResponse.discount_price | number: '1.0-0' }}</p>
                    </li>
                </ul>

                <!-- Pagination -->
                <div *ngIf="totalPages > 1" class="mt-5 flex gap-2 items-center justify-center">
                    <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 0" class="px-3 py-2 bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed">Previous</button>

                    <button
                        *ngFor="let page of [].constructor(totalPages); let i = index"
                        (click)="goToPage(i)"
                        [class.bg-purple-700]="i === currentPage"
                        [class.text-white]="i === currentPage"
                        [class.font-bold]="i === currentPage"
                        class="px-3 py-2 bg-gray-200"
                    >
                        {{ i + 1 }}
                    </button>

                    <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages - 1" class="px-3 py-2 bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed">Next</button>
                </div>

                <!-- No courses found -->
                <p *ngIf="courses.length === 0" class="text-center mt-4 text-gray-600">No courses found.</p>
            </div>
        </div>
    `,
    styles: ``
})
export class FavoriteComponent implements OnInit {
    onSearchChange() {
        throw new Error('Method not implemented.');
    }
    courses: any[] = []; // Danh sách khóa học yêu thích
    currentPage: number = 0; // Trang hiện tại
    pageSize: number = 8; // Số khóa học mỗi trang
    totalPages: number = 0; // Tổng số trang
    activeMenuId: number | null = null; // ID của khóa học đang mở menu
    searchKeyword: any;

    constructor(private http: HttpClient,
      private cartService:CartService,
      private toastService:ToastService
    ) {}

    ngOnInit(): void {
        this.fetchCourses();
        
    }

    // Lấy danh sách khóa học từ API
    fetchCourses(): void {
        const params = new HttpParams().set('page', this.currentPage.toString()).set('size', this.pageSize.toString());

        this.http.get<any>('http://localhost:8080/favorite', { params }).subscribe({
            next: (res) => {
                this.courses = res.data.content; // Cập nhật danh sách khóa học
                this.totalPages = res.data.totalPages; // Cập nhật tổng số trang
            },
            error: (err) => {
                console.error('Error fetching favorite courses:', err);
            }
        });
    }

    // Chuyển đến trang khác
    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
            this.currentPage = page;
            this.fetchCourses(); // Lấy dữ liệu cho trang mới
        }
    }

    // Toggle menu cho mỗi khóa học
    toggleMenu(courseId: number): void {
        this.activeMenuId = this.activeMenuId === courseId ? null : courseId;
    }

    removeFromFavorite(course: any): void {
        this.http.delete<any>(`http://localhost:8080/favorite/${course.id}`).subscribe({
            next: () => {
                this.courses = this.courses.filter((c) => c.id !== course.id);
            },
            error: (err) => {
                console.error('Error removing course from favorite:', err);
            }
        });
    }

    moveToCart(course: any): void {
        this.cartService.moveToCart(course.courseResponse.id).subscribe(() => {
            this.cartService.loadCart();
            this.fetchCourses();
            this.toastService.addToast("success","Di chuyển sang giỏ hàng thành công")
        }
        )
    }
}

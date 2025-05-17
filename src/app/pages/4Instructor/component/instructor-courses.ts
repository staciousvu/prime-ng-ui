import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../../4User/star-rating';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { ToastService } from '../../service/toast.service';

@Component({
    selector: 'app-instructor-courses',
    standalone: true,
    imports: [StarRatingComponent, FormsModule, CommonModule, RouterLink],
    template: `
        <div class="p-10">
            <div class="w-full">
                <h1 class="text-4xl font-bold mb-6">Khóa học của giảng viên</h1>
            </div>
            <div class="w-full mt-5">
                <!-- Header -->
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center space-x-2">
                        <input (input)="load()" [(ngModel)]="this.keyword" class="w-[300px] border border-gray-300 rounded px-4 py-3" placeholder="Tìm khóa học của bạn bằng từ khóa" type="text" />
                        <button class="bg-blue-600 text-white px-4 py-3 rounded">
                            <i class="fas fa-search"> </i>
                        </button>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button (click)="openModal()" class="bg-blue-600 text-white px-4 py-3 rounded">Thêm khóa học mới</button>
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
                                class="bg-blue-600 text-white text-sm px-4 py-2 rounded shadow 
         hover:bg-blue-700 active:scale-95 transition transform duration-200"
                            >
                                Chỉnh sửa khóa học
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

                            <p  class="text-gray-500">
                                {{ course.subtitle }}
                            </p>
                            <p *ngIf="course.status=='ACCEPTED'" class="text-gray-500 flex items-center space-x-2">
                                <span>{{ course.avgRating | number: '1.0-1' }}</span>
                                <app-star-rating [rating]="course.avgRating"></app-star-rating>
                                <span>{{ course.countRating }} Reviews</span>
                            </p>

                            <p *ngIf="course.status=='ACCEPTED'" class="text-gray-500">đ{{ course.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Overlay -->
<div *ngIf="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <!-- Modal box -->
  <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Tạo khóa học mới</h2>
      <button (click)="closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
    </div>

    <!-- Form -->
    <form (ngSubmit)="saveCourse()" #courseForm="ngForm">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Tên khóa học</label>
        <input
          type="text"
          id="title"
          name="title"
          [(ngModel)]="courseTitle"
          required
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Nhập tên khóa học"
        />
      </div>

      <div class="flex justify-end space-x-2">
        <button type="button" (click)="closeModal()" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Lưu
        </button>
      </div>
    </form>
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
    constructor(private http: HttpClient,
        private toastService:ToastService,
        private route:Router
    ) {}
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
    isOpen = false;
  courseTitle = '';

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.courseTitle = '';
  }

  saveCourse() {
    if (!this.courseTitle.trim()) {
      alert('Vui lòng nhập tên khóa học');
      return;
    }
    this.http.post<any>(`http://localhost:8080/course/draft?title=${this.courseTitle}`,{}).subscribe(
        (res)=>{
            this.toastService.addToast("success","Tạo khóa học mới thành công");
            // this.route.navigate(['/edit-course', res.data, 'landing-page']);
            this.load();
        }
    )
    console.log('Đã lưu khóa học:', this.courseTitle);

    this.closeModal();
  }
}

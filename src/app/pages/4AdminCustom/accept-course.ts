import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { CourseService } from '../service/course.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Router, RouterModule } from '@angular/router';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseData } from '../service/data.service';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ImageModule } from 'primeng/image';
import { CourseReloadService } from '../service/course-reload.service';

@Component({
    selector: 'app-course-accept',
    standalone: true,
    imports: [
    RouterModule,
    Dialog,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    ButtonModule,
    TableModule,
    CommonModule,
    BadgeModule,
    RatingModule,
    FormsModule,
    TagModule,
    ImageModule
],
    template: `
        <div class="flex justify-end mb-4">
            <div class="relative">
                <input (input)="loadCourses()"  type="text" [(ngModel)]="keyword" placeholder="Tìm kiếm khóa học..." class="border border-gray-400 rounded-md px-3 py-2 text-base w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                <button (click)="loadCourses()" class="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="overflow-x-auto w-full">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead class="bg-gray-100 text-gray-700 text-left">
                    <tr>
                        <th class="p-3">ID</th>
                        <th class="p-3">Hình ảnh</th>
                        <th class="p-3">Tiêu đề</th>
                        <th class="p-3">Tác giả</th>
                        <th class="p-3">Giá</th>
                        <th class="p-3">Trình độ</th>
                        <th class="p-3 min-w-[100px]">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let course of courses" class="border-t hover:bg-gray-50">
                        <td class="p-3">{{ course.id }}</td>

                        <td class="p-3">
                            <p-image *ngIf="course.thumbnail" [src]="course.thumbnail" [preview]="true" alt="Image" styleClass="w-24 h-16 object-cover">
                                <ng-template #indicator><i class="pi pi-search"></i></ng-template>
                                <ng-template #image><img [src]="course.thumbnail" alt="image" width="250" /></ng-template>
                                <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                                    <img [src]="course.thumbnail" alt="image" [style]="style" (click)="previewCallback()" />
                                </ng-template>
                            </p-image>
                        </td>

                        <td class="p-3">
                            <div>{{ course.title }}</div>
                        </td>
                        <td class="p-3">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                    <img *ngIf="course.authorAvatar" [src]="course.authorAvatar" alt="user avatar" class="object-cover w-full h-full" />
                                    <div *ngIf="!course.authorAvatar" class="flex items-center justify-center w-full h-full text-gray-500">No Image</div>
                                </div>
                                <div class="flex flex-col">
                                    <div class="font-semibold text-gray-800">{{ course.authorName }}</div>
                                    <a [href]="'mailto:' + course.authorEmail" class="text-blue-600 text-sm hover:underline">{{ course.authorEmail }}</a>
                                </div>
                            </div>
                        </td>
                        <td class="p-3">{{ course.price | number: '1.0-0' }} VND</td>

                        <td class="p-3">
                            <p-tag [value]="course.level" [severity]="getSeverity(course.level)" />
                        </td>

                        <td class="p-3 space-x-2">
                            <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Xem</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        
    `,
    styles: ``,
})
export class CourseAcceptComponent implements OnInit {
  totalRecords:number=0;
  courses: any[]=[];
  selectedCourses!: any;
  
    constructor(
        private router: Router,
        private http:HttpClient,
        private courseReloadService:CourseReloadService
    ) {}

    page: number = 0;
    size: number = 10;
    keyword: string = '';

    ngOnInit() {
        this.courseReloadService.onReload().subscribe((source) => {
            if (source === 'accept') {
              this.loadCourses();
            }
          });
        this.loadCourses();
    }
    loadCourses() {
        const params = new HttpParams().set('page', this.page.toString()).set('size', this.size.toString()).set('keyword', this.keyword);
        console.log(params)
        this.http.get<any>(`http://localhost:8080/course/accept-courses`, { params }).subscribe((response) => {
            this.courses = response.data.content;
            console.log(this.courses);
        });
    }

  getSeverity(status: string) {
      switch (status) {
          case 'BEGINNER':
              return 'success';
          case 'INTERMEDIATE':
              return 'warn';
          case 'EXPERT':
              return 'danger';
          default:
              return 'info';
      }
  }
    view(id: string) {
        this.router.navigate(['/admin/courses/view-course', id]);
      }
}

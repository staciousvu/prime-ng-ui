import { Component, OnInit } from '@angular/core';
import { BreadcrumpComponent } from '../breadcrump';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ImageModule } from 'primeng/image';
import { ToastService } from '../../service/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report2',
    standalone: true,
    imports: [ImageModule, CommonModule, PaginatorModule, BreadcrumpComponent, ButtonModule, TableModule, RatingModule, FormsModule, DialogModule, ToastModule, RippleModule],
    template: `
        <app-breadcrump [apr]="'List reports'" [manager]="'Manage reports'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">List reports</div>
        <!-- Component chính -->
<div class="border border-blue-300 rounded-md p-6">
  <div class="flex">
    <!-- Phần danh sách báo cáo -->
    <div class="w-3/4 pr-4">
      <!-- Card báo cáo đầu tiên -->
      <div class="border border-gray-300 rounded-md p-4 mb-4">
        <div class="text-red-500 font-medium">Mã báo cáo : #43h4g3</div>
        <div class="text-lg font-bold mt-2">Tiêu đề : Nội dung không phù hợp</div>
        <div class="text-base mt-1">Mô tả : Bài giảng quá dễ</div>
        
        <div class="flex items-center mt-3">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white mr-2"></div>
            <span class="text-blue-500">Thanh Hải</span>
          </div>
        </div>
        
        <div class="mt-3">
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Chờ xử lí
          </button>
        </div>
        
        <div class="mt-3 flex">
          <a href="#" class="text-blue-500 hover:underline flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Xem chi tiết
          </a>
          <a href="#" class="text-blue-500 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Xem khóa học
          </a>
        </div>
      </div>
      
      <!-- Card báo cáo thứ hai (giống card đầu tiên) -->
      <div class="border border-gray-300 rounded-md p-4">
        <div class="text-red-500 font-medium">Mã báo cáo : #43h4g3</div>
        <div class="text-lg font-bold mt-2">Tiêu đề : Nội dung không phù hợp</div>
        <div class="text-base mt-1">Mô tả : Bài giảng quá dễ</div>
        
        <div class="flex items-center mt-3">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white mr-2"></div>
            <span class="text-blue-500">Thanh Hải</span>
          </div>
        </div>
        
        <div class="mt-3">
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Chờ xử lí
          </button>
        </div>
        
        <div class="mt-3 flex">
          <a href="#" class="text-blue-500 hover:underline flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Xem chi tiết
          </a>
          <a href="#" class="text-blue-500 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Xem khóa học
          </a>
        </div>
      </div>
    </div>
    
    <!-- Phần lọc bên phải -->
    <div class="w-1/4 pl-4">
      <div class="text-lg font-bold mb-4">Lọc</div>
      
      <div class="flex flex-col space-y-2">
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Chờ xử lí
        </button>
        
        <button class="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Đã duyệt
        </button>
        
        <button class="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Từ chối
        </button>
      </div>
    </div>
  </div>
</div>
        <!-- ✅ Đóng div scroll tại đây -->
    `
})
export class Report2Component implements OnInit {
    reports: any[] = [];
    constructor(
        private http: HttpClient,
        private toastService: ToastService,
        private router : Router 
    ) {}

    ngOnInit(): void {
        this.loadReports();
    }
    loadReports(): void {
        this.http.get<any>('http://localhost:8080/report/pending').subscribe({
            next: (res) => {
                this.reports = res.data;
            },
            error: (err) => {
                console.error('Lỗi khi tải báo cáo:', err);
            }
        });
    }

    approveReport(reportId: number): void {
        this.http.put<any>(`http://localhost:8080/report/${reportId}/approve`, {}).subscribe({
            next: () => {
                this.toastService.addToast('success', 'Báo cáo được phê duyệt');
                this.loadReports();
            },
            error: (err) => {
                console.error('Lỗi phê duyệt:', err);
                alert('Lỗi phê duyệt báo cáo!');
            }
        });
    }

    rejectReport(reportId: number): void {
        this.http.put<any>(`http://localhost:8080/report/${reportId}/reject`, {}).subscribe({
            next: () => {
                this.toastService.addToast('success', 'Báo cáo được từ chối');
                this.loadReports();
            },
            error: (err) => {
                console.error('Lỗi từ chối:', err);
                alert('Lỗi từ chối báo cáo!');
            }
        });
    }
    viewReport(courseId: any) {
        this.router.navigate(['/review/course', courseId, 'admin', 'report']);
    }
}

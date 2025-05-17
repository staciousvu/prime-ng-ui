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
    selector: 'app-report3',
    standalone: true,
    imports: [ImageModule, CommonModule, PaginatorModule, BreadcrumpComponent, ButtonModule, TableModule, RatingModule, FormsModule, DialogModule, ToastModule, RippleModule],
    template: `
        <app-breadcrump [apr]="'List reports'" [manager]="'Manage reports'"></app-breadcrump>

        <!-- Component chính -->
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Quản lý báo cáo</h1>
                <div class="search-container">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21 21L15.5 15.5M15.5 15.5C17.0913 13.9087 18 11.7543 18 9.5C18 5.08172 14.4183 1.5 10 1.5C5.58172 1.5 2 5.08172 2 9.5C2 13.9183 5.58172 17.5 10 17.5C12.2543 17.5 14.4087 16.5913 16 15L15.5 15.5Z"
                            stroke="#A0AEC0"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <input type="text" class="search-input" placeholder="Tìm kiếm báo cáo..." />
                </div>
            </div>

            <div class="dashboard">
                <div class="report-list">
                    <!-- Report Card 1 -->
                    <div *ngFor="let report of reports" class="report-card">
                        <div class="report-header">
                            <div class="flex justify-between items-center">
                                <span class="report-id">Mã báo cáo #{{ report.id }}</span>
                                <span class="report-id">Ngày báo cáo {{ report.createdAt | date: 'dd/MM/yyyy' }}</span>
                            </div>

                            <!-- <span class="report-id">#{{ report.id }}</span> -->
                            <h3 class="report-title">{{ report.reason }}</h3>
                            <p class="report-desc">{{ report.description }}</p>
                        </div>
                        <div class="report-content">
                            <div class="reporter">
                                <img class="avatar" [src]="report.userAvatar" alt="Avatar" />
                                <span class="reporter-name">{{ report.userFullName }}</span>
                            </div>
                        </div>
                        <div class="report-footer">
                            <div class="status-badge status-pending cursor-pointer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 6px;">
                                    <path
                                        d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                Chờ xử lý
                            </div>
                            <div class="report-actions">
                                <a class="action-link cursor-pointer" (click)="viewReport(report.id)"> 
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="action-icon">
                                        <path
                                            d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    Xem chi tiết
                                </a>
                                <a class="action-link cursor-pointer" (click)="viewCourse(report.courseId)">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="action-icon">
                                        <path
                                            d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    Xem khóa học
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="filter-section">
                    <div class="filter-header">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="filter-icon">
                            <path
                                d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V6.58579C21 6.851 20.8946 7.10536 20.7071 7.29289L14.2929 13.7071C14.1054 13.8946 14 14.149 14 14.4142V17L10 21V14.4142C10 14.149 9.89464 13.8946 9.70711 13.7071L3.29289 7.29289C3.10536 7.10536 3 6.851 3 6.58579V4Z"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        Lọc báo cáo
                    </div>

                    <div class="filter-buttons">
                        <button class="filter-btn filter-btn-active">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="filter-btn-icon">
                                <path
                                    d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            Chờ xử lý
                            <span class="filter-count">{{reports.length}}</span>
                        </button>

                        <button class="filter-btn filter-btn-inactive">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="filter-btn-icon">
                                <path
                                    d="M7 13L10 16L17 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            Đã duyệt
                            <span class="filter-count filter-inactive-count">8</span>
                        </button>

                        <button class="filter-btn filter-btn-inactive">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="filter-btn-icon">
                                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Từ chối
                            <span class="filter-count filter-inactive-count">5</span>
                        </button>

                        <button class="filter-btn filter-btn-inactive">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="filter-btn-icon">
                                <path
                                    d="M9 12H15M9 16H15M9 8H15M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            Tất cả báo cáo
                            <span class="filter-count filter-inactive-count">25</span>
                        </button>
                    </div>

                    <div class="filter-stats">
                        <h4 class="stats-title">Thống kê báo cáo</h4>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-value">25</div>
                                <div class="stat-label">Tổng báo cáo</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">12</div>
                                <div class="stat-label">Chờ xử lý</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">8</div>
                                <div class="stat-label">Đã duyệt</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">5</div>
                                <div class="stat-label">Đã từ chối</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p-dialog header="Chi tiết báo cáo" [(visible)]="displayReportDetailModal" [modal]="true" [style]="{ width: '700px' }" [baseZIndex]="10000" [closable]="true" [dismissableMask]="true" styleClass="shadow-lg rounded-lg">
            <div *ngIf="reportDetail" class="p-4 space-y-6">
                <!-- Grid layout cho thông tin cơ bản -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Mã báo cáo -->
                    <div class="flex items-center">
                        <label class="w-40 font-semibold text-gray-700">Mã báo cáo:</label>
                        <p class="text-gray-900 border-b border-gray-200 flex-1">{{ reportDetail.id }}</p>
                    </div>

                    <!-- Ngày báo cáo -->
                    <div class="flex items-center">
                        <label class="w-40 font-semibold text-gray-700">Ngày báo cáo:</label>
                        <p class="text-gray-900 border-b border-gray-200 flex-1">{{ reportDetail.createdAt | date: 'dd/MM/yyyy HH:mm' }}</p>
                    </div>
                </div>

                <!-- Khóa học bị báo cáo -->
                <div class="flex items-start">
                    <label class="w-40 font-semibold text-gray-700 pt-1">Khóa học bị báo cáo:</label>
                    <p class="text-gray-900 bg-gray-50 p-2 rounded flex-1">{{ reportDetail.courseTitle }}</p>
                </div>

                <!-- Tiêu đề báo cáo -->
                <div class="flex items-start">
                    <label class="w-40 font-semibold text-gray-700 pt-1">Tiêu đề báo cáo:</label>
                    <p class="text-gray-900 font-medium flex-1">{{ reportDetail.reason }}</p>
                </div>

                <!-- Lý do báo cáo -->
                <div class="flex items-start">
                    <label class="w-40 font-semibold text-gray-700 pt-1">Lý do báo cáo:</label>
                    <p class="text-gray-900 bg-gray-50 p-3 rounded-md border border-gray-100 flex-1">{{ reportDetail.description }}</p>
                </div>

                <!-- Ảnh bằng chứng -->
                <div class="flex items-start">
                    <label class="w-40 font-semibold text-gray-700 pt-1">Ảnh bằng chứng:</label>
                    <div class="flex-1">
                        <div *ngIf="reportDetail.imageUrl" class="mt-1">
                            <img [src]="reportDetail.imageUrl" alt="Ảnh bằng chứng" class="rounded-lg shadow max-h-64 cursor-pointer hover:opacity-90 transition-opacity" (click)="viewFullImage(reportDetail.evidenceImage)" />
                        </div>
                        <div *ngIf="!reportDetail.imageUrl" class="italic text-gray-500 mt-1">
                            <p>Không có hình ảnh bằng chứng.</p>
                        </div>
                    </div>
                </div>

                <!-- Trạng thái -->
                <div class="flex items-center">
                    <label class="w-40 font-semibold text-gray-700">Trạng thái:</label>
                    <p class="flex-1">
                        <span
                            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                            [ngClass]="{
                                'bg-yellow-100 text-yellow-800': reportDetail.status === 'PENDING',
                                'bg-green-100 text-green-800': reportDetail.status === 'RESOLVED',
                                'bg-red-100 text-red-800': reportDetail.status === 'REJECTED'
                            }"
                        >
                            <span
                                class="h-2 w-2 rounded-full mr-2"
                                [ngClass]="{
                                    'bg-yellow-400': reportDetail.status === 'PENDING',
                                    'bg-green-500': reportDetail.status === 'RESOLVED',
                                    'bg-red-500': reportDetail.status === 'REJECTED'
                                }"
                            ></span>
                            {{ getStatusText(reportDetail.status) }}
                        </span>
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <ng-template pTemplate="footer">
                <div class="flex justify-between items-center flex-wrap gap-2">
                    <!-- Nút hành động viết bằng Tailwind, không dùng PrimeNG -->
                    <div class="flex space-x-3" *ngIf="reportDetail.status === 'PENDING'">
                        <p-button label="Từ chối báo cáo" severity="danger" (click)="rejectReport(reportDetail.id)" />
                        <p-button label="Duyệt báo cáo" severity="info" (click)="approveReport(reportDetail.id)" />
                    </div>
                    <p-button *ngIf="reportDetail.status !== 'PENDING'" label="Đóng" severity="secondary" (click)="closeDialog()" />
                </div>
            </ng-template>
        </p-dialog>
    `,
    styles: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            background-color: #f5f7fa;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .page-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #1a202c;
        }

        .search-container {
            position: relative;
            width: 100%;
            max-width: 400px;
        }

        .search-input {
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 3rem;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background-color: white;
            font-size: 0.9rem;
            transition: all 0.2s;
        }

        .search-input:focus {
            outline: none;
            border-color: #3182ce;
            box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
        }

        .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #a0aec0;
        }

        .dashboard {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 2rem;
        }

        .report-list {
            display: grid;
            gap: 1.5rem;
        }

        .report-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .report-header {
            padding: 0.5rem 1.5rem;
            // border-bottom: 1px solid #f0f2f5;
        }

        .report-id {
            font-size: 0.9rem;
            font-weight: 500;
            color: rgb(223, 63, 97);
            background-color: rgba(184, 109, 120, 0.13);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            display: inline-block;
        }

        .report-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin: 1rem 0 0.5rem;
            color: #2d3748;
        }

        .report-desc {
            font-size: 0.95rem;
            color: #4a5568;
            // margin-bottom: 0.5rem;
        }

        .report-content {
            padding: 0 1.5rem;
        }

        .reporter {
            display: flex;
            align-items: center;
            // padding: 0.5rem 0;
        }

        .avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            margin-right: 0.75rem;
        }

        .reporter-name {
            font-weight: 500;
            color: rgb(37, 37, 38);
        }

        .report-footer {
            display: flex;
            justify-content: space-between;
            padding: 1rem 1.5rem 1.5rem;
        }

        .status-badge {
            justify-content: center;
            width: 200px;
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 500;
            font-size: 0.875rem;
        }

        .status-pending {
            background-color: #3182ce;
            color: white;
        }

        .status-approved {
            background-color: #48bb78;
            color: white;
        }

        .status-rejected {
            background-color: #e53e3e;
            color: white;
        }

        .report-actions {
            display: flex;
            gap: 1rem;
        }

        .action-link {
            display: flex;
            align-items: center;
            color:rgb(90, 90, 90);
            font-size: 0.875rem;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.2s;
        }

        .action-link:hover {
            color: rgba(90, 90, 90, 0.73);
        }

        .action-icon {
            margin-right: 0.5rem;
        }

        .filter-section {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            padding: 1.5rem;
            position: sticky;
            top: 2rem;
        }

        .filter-header {
            font-size: 1.25rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
        }

        .filter-icon {
            margin-right: 0.5rem;
        }

        .filter-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .filter-btn {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            border: none;
            font-weight: 500;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .filter-btn-active {
            background-color: #3182ce;
            color: white;
        }

        .filter-btn-inactive {
            background-color: white;
            color: #4a5568;
            border: 1px solid #e2e8f0;
        }

        .filter-btn-inactive:hover {
            background-color: #f7fafc;
        }

        .filter-btn-icon {
            margin-right: 0.75rem;
        }

        .filter-count {
            margin-left: auto;
            background-color: rgba(255, 255, 255, 0.2);
            padding: 0.2rem 0.5rem;
            border-radius: 20px;
            font-size: 0.75rem;
        }

        .filter-inactive-count {
            background-color: #edf2f7;
            color: #4a5568;
        }

        .filter-stats {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e2e8f0;
        }

        .stats-title {
            font-size: 1rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 1rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
        }

        .stat-card {
            background-color: #f7fafc;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2d3748;
        }

        .stat-label {
            font-size: 0.75rem;
            color: #718096;
            margin-top: 0.25rem;
        }

        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
        }

        .page-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            margin: 0 0.25rem;
            font-weight: 500;
            transition: all 0.2s;
            cursor: pointer;
        }

        .page-btn-active {
            background-color: #4f46e5;
            color: white;
        }

        .page-btn-inactive {
            background-color: white;
            color: #4a5568;
            border: 1px solid #e2e8f0;
        }

        .page-btn-inactive:hover {
            background-color: #f7fafc;
        }

        @media (max-width: 768px) {
            .dashboard {
                grid-template-columns: 1fr;
            }

            .page-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }

            .search-container {
                max-width: 100%;
            }
        }
        .evidence-img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            border: 1px solid #ccc;
            margin-top: 8px;
        }
    `
})
export class Report3Component implements OnInit {
    reports: any[] = [];


    displayReportDetailModal = false;
    // Thêm vào component
    getStatusText(status: string): string {
        switch (status) {
            case 'PENDING':
                return 'Đang chờ xử lý';
            case 'RESOLVED':
                return 'Đã duyệt';
            case 'REJECTED':
                return 'Đã từ chối';
            default:
                return status;
        }
    }
    reportDetail:any;
    viewReport(id:any){
      this.http.get<any>(`http://localhost:8080/report/${id}`).subscribe({
            next: (res) => {
                this.reportDetail = res.data;
                this.displayReportDetailModal=true;
            },
            error: (err) => {
                console.error('Lỗi khi tải báo cáo:', err);
            }
        });
    }


    viewFullImage(imageUrl: string): void {
        // Xử lý hiển thị ảnh đầy đủ, có thể mở dialog hoặc lightbox
        console.log('Xem ảnh đầy đủ:', imageUrl);
    }

    closeDialog(): void {
        this.displayReportDetailModal = false;
    }

    constructor(
        private http: HttpClient,
        private toastService: ToastService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadPendingReports();
    }
    loadPendingReports(): void {
        this.http.get<any>('http://localhost:8080/report/pending').subscribe({
            next: (res) => {
              
                this.reports = res.data;
                console.log('reportttt:',this.reports)
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
                this.displayReportDetailModal=false;
                this.loadPendingReports();
            },
            error: (err) => {
                console.error('Lỗi phê duyệt:', err);
                this.displayReportDetailModal=false;
            }
        });
    }

    rejectReport(reportId: number): void {
        this.http.put<any>(`http://localhost:8080/report/${reportId}/reject`, {}).subscribe({
            next: () => {
                this.toastService.addToast('success', 'Báo cáo được từ chối');
                this.displayReportDetailModal=false;
                this.loadPendingReports();
            },
            error: (err) => {
                console.error('Lỗi từ chối:', err);
                this.displayReportDetailModal=false;
            }
        });
    }
    viewCourse(courseId: any) {
        this.router.navigate(['/review/course', courseId, 'admin', 'report']);
    }
}

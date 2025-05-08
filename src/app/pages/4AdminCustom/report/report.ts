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

@Component({
    selector: 'app-report',
    standalone: true,
    imports: [ImageModule, CommonModule, PaginatorModule, BreadcrumpComponent, ButtonModule, TableModule, RatingModule, FormsModule, DialogModule, ToastModule, RippleModule],
    template: `
        <app-breadcrump [apr]="'List reports'" [manager]="'Manage reports'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">List reports</div>
        <div class="overflow-x-auto w-full">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead class="bg-gray-100 text-gray-700 text-left">
                    <tr>
                        <th class="p-3">ID</th>
                        <th class="p-3">Người báo cáo</th>
                        <th class="p-3">Khóa học</th>
                        <th class="p-3">Lý do</th>
                        <th class="p-3">Mô tả</th>
                        <th class="p-3">Bằng chứng</th>
                        <th class="p-3 min-w-[250px]">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let report of reports" class="border-t hover:bg-gray-50">
                        <td class="p-3">{{ report.id }}</td>

                        <!-- Người báo cáo -->
                        <td class="p-3">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                    <img *ngIf="report.userAvatar" [src]="report.userAvatar" alt="user avatar" class="object-cover w-full h-full" />
                                    <div *ngIf="!report.userAvatar" class="flex items-center justify-center w-full h-full text-gray-500">No Image</div>
                                </div>
                                <div class="flex flex-col">
                                    <div class="font-semibold text-gray-800">{{ report.userFullName }}</div>
                                    <a [href]="'mailto:' + report.userEmail" class="text-blue-600 text-sm hover:underline">{{ report.userEmail }}</a>
                                </div>
                            </div>
                        </td>

                        <!-- Khóa học -->
                        <td class="p-3">
                            <div class="flex items-center space-x-3">
                                <div class="w-20 bg-gray-100 overflow-hidden rounded">
                                    <p-image *ngIf="report.courseThumbnail" [src]="report.courseThumbnail" [preview]="true" alt="Image" styleClass="w-16 h-12 object-cover">
                                        <ng-template #indicator><i class="pi pi-search"></i></ng-template>
                                        <ng-template #image><img [src]="report.courseThumbnail" alt="image" width="250" /></ng-template>
                                        <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                                            <img [src]="report.courseThumbnail" alt="image" [style]="style" (click)="previewCallback()" />
                                        </ng-template>
                                    </p-image>
                                    <div *ngIf="!report.courseThumbnail" class="text-gray-400 text-sm flex items-center justify-center w-full h-full">No Image</div>
                                </div>
                                <div>{{ report.courseTitle }}</div>
                            </div>
                        </td>

                        <td class="p-3">{{ report.reason }}</td>
                        <td class="p-3">{{ report.description }}</td>

                        <!-- Bằng chứng -->
                        <td class="p-3">
                            <p-image *ngIf="report.imageUrl" [src]="report.imageUrl" [preview]="true" alt="Image" styleClass="w-24 h-16 object-cover">
                                <ng-template #indicator><i class="pi pi-search"></i></ng-template>
                                <ng-template #image><img [src]="report.imageUrl" alt="image" width="250" /></ng-template>
                                <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                                    <img [src]="report.imageUrl" alt="image" [style]="style" (click)="previewCallback()" />
                                </ng-template>
                            </p-image>
                        </td>

                        <!-- Hành động -->
                        <td class="p-3 space-x-2">
                            <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700" (click)="viewReport(report)">Xem</button>
                            <button class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700" (click)="approveReport(report.id)" [disabled]="report.status !== 'PENDING'">Phê duyệt</button>
                            <button class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700" (click)="rejectReport(report.id)" [disabled]="report.status !== 'PENDING'">Từ chối</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- ✅ Đóng div scroll tại đây -->
    `
})
export class ReportComponent implements OnInit {
viewReport(_t18: any) {
throw new Error('Method not implemented.');
}
    reports: any[] = [];

    constructor(
        private http: HttpClient,
        private toastService: ToastService
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
}

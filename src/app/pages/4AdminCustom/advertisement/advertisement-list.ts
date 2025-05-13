import { Component, OnInit } from '@angular/core';
import { BreadcrumpComponent } from '../breadcrump';
import { ClassicEditor } from 'ckeditor5';
import { CKEDITOR_CONFIG } from '../../models/ckeditor-config';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageModule } from 'primeng/image';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseReloadService } from '../../service/course-reload.service';
import { ToastService } from '../../service/toast.service';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-advertisement-list',
    standalone: true,
    imports: [BreadcrumpComponent, CommonModule, CKEditorModule, ImageModule, FormsModule,DialogModule],
    template: `
        <app-breadcrump [apr]="'List advertisements'" [manager]="'Manage advertisement'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">List Advertisement</div>
        <div class="flex justify-between items-center mb-4">
            <span class="text-gray-700 text-sm ml-2">Có tổng cộng {{ totalAds }} yêu cầu chờ phê duyệt</span>

            <div class="relative">
                <input (input)="loadAdvertisements()" type="text" placeholder="Tìm kiếm ..." class="border border-gray-400 rounded-md px-3 py-2 text-base w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                <button (click)="loadAdvertisements()" class="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
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
                        <th class="p-3">Tác giả</th>
                        <th class="p-3">Gói quảng cáo</th>
                        <th class="p-3">Khóa học</th>
                        <th class="p-3">Ảnh</th>
                        <th class="p-3">Trạng thái</th>
                        <th class="p-3 min-w-[100px]">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let ads of advertisements" class="border-t hover:bg-gray-50">
                        <td class="p-3">{{ ads.applyId }}</td>
                        <td class="p-3">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                    <img *ngIf="ads.authorAvatar" [src]="ads.authorAvatar" alt="user avatar" class="object-cover w-full h-full" />
                                    <div *ngIf="!ads.authorAvatar" class="flex items-center justify-center w-full h-full text-gray-500">No Image</div>
                                </div>
                                <div class="flex flex-col">
                                    <div class="font-semibold text-gray-800">{{ ads.authorName }}</div>
                                    <a [href]="'mailto:' + ads.authorEmail" class="text-blue-600 text-sm hover:underline">{{ ads.authorEmail }}</a>
                                </div>
                            </div>
                        </td>
                        <td class="p-3">
                            <div>{{ ads.packageName }}</div>
                        </td>
                        <td class="p-3">
                            <div>{{ ads.courseTitle }}</div>
                        </td>
                        <td class="p-3">
                            <p-image *ngIf="ads.courseThumbnail" [src]="ads.courseThumbnail" [preview]="true" alt="Image" styleClass="w-24 h-16 object-cover">
                                <ng-template #indicator><i class="pi pi-search"></i></ng-template>
                                <ng-template #image><img [src]="ads.courseThumbnail" alt="image" width="250" /></ng-template>
                                <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                                    <img [src]="ads.courseThumbnail" alt="image" [style]="style" (click)="previewCallback()" />
                                </ng-template>
                            </p-image>
                        </td>

                        <td class="p-3">
                            <div>PENDING</div>
                        </td>

                        <td class="p-3 space-x-2">
                            <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700" (click)="viewPending(ads.courseId)">Xem</button>
                            <button class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700" (click)="confirmApproval(ads.applyId)">Phê duyệt</button>
                            <button class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700" (click)="openRejectModal(ads.applyId)">Từ chối</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Modal từ chối -->
        <p-dialog 
  [(visible)]="isRejectModalOpen" 
  [header]="'Từ chối quảng cáo'" 
  [modal]="true" 
  [style]="{ width: '450px' }"
  [closable]="false"
>
  <div class="p-fluid">
    <div class="field mb-3">
      <label for="rejectReason" class="block text-sm font-medium text-gray-700 mb-2">Lý do từ chối</label>
      <textarea
        id="rejectReason"
        [(ngModel)]="rejectReason"
        rows="4"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Nhập lý do từ chối..."
      ></textarea>
    </div>

    <div class="flex justify-end space-x-2 mt-4">
      <button
        (click)="closeRejectModal()"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        Hủy
      </button>
      <button
        (click)="submitRejection()"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Từ chối
      </button>
    </div>
  </div>
</p-dialog>

    `,
    styles: ``
})
export class AdvertisementAdminComponent implements OnInit {
    isRejectModalOpen = false;
rejectReason: string = '';
selectedAdsIdToReject: number | null = null;

openRejectModal(adsId: number) {
  this.selectedAdsIdToReject = adsId;
  this.rejectReason = '';
  this.isRejectModalOpen = true;
}

closeRejectModal() {
  this.isRejectModalOpen = false;
  this.rejectReason = '';
  this.selectedAdsIdToReject = null;
}

submitRejection() {
  if (!this.rejectReason.trim()) {
    Swal.fire('Cảnh báo', 'Vui lòng nhập lý do từ chối.', 'warning');
    return;
  }

  const body = {
    reason: this.rejectReason
  };

  this.http.post<any>(`http://localhost:8080/advertisements/reject/${this.selectedAdsIdToReject}`, body).subscribe({
    next: () => {
      Swal.fire('Thành công', 'Đã từ chối quảng cáo.', 'success');
      this.closeRejectModal();
      this.loadAdvertisements();
    },
    error: (err) => {
      console.error(err);
      Swal.fire('Lỗi', 'Không thể từ chối quảng cáo.', 'error');
    }
  });
}
    totalAds: any;

    confirmApproval(id: number) {
        Swal.fire({
            title: 'Xác nhận?',
            text: 'Bạn sẽ không thể thay đổi sau khi phê duyệt quảng cáo!',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Duyệt',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                this.http.post<any>(`http://localhost:8080/advertisements/approve/${id}`, {}).subscribe((res) => {
                    this.loadAdvertisements();
                    this.toastService.addToast('success', 'Phê duyệt quảng cáo thành công');
                });
            }
        });
    }

    // confirmReject(id: number) {
    //     Swal.fire({
    //         title: 'Xác nhận?',
    //         text: 'Bạn sẽ không thể thay đổi sau khi từ chối quảng cáo!',
    //         icon: 'question',
    //         showCancelButton: true,
    //         cancelButtonText: 'Hủy',
    //         confirmButtonText: 'Từ chối',
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             this.http.post<any>(`http://localhost:8080/advertisements/reject/${id}`, {}).subscribe((res) => {
    //                 this.loadAdvertisements();
    //                 this.toastService.addToast('success', 'Từ chối quảng cáo thành công');
    //             });
    //         }
    //     });
    // }
    advertisements: any[] = [];
    course: any;
    constructor(
        private router: Router,
        private http: HttpClient,
        private toastService: ToastService,
        private courseReloadService: CourseReloadService
    ) {}

    ngOnInit() {
        this.loadAdvertisements();
    }
    loadAdvertisements() {
        this.http.get<any>(`http://localhost:8080/advertisements/pending-applies`).subscribe((response) => {
            this.advertisements = response.data;
            this.totalAds = this.advertisements.length;
        });
    }
    viewPending(id: string) {
        this.router.navigate(['/review/course', id, 'admin', 'advertisement']);
    }
}

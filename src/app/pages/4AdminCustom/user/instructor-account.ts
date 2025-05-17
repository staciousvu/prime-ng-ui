import { Component, OnInit } from '@angular/core';
import { BreadcrumpComponent } from '../breadcrump';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-instructor-account',
    standalone: true,
    imports: [TagModule, RouterLink, ToastModule, BreadcrumpComponent, ButtonModule, TabsModule, TableModule, ToolbarModule, FormsModule, CommonModule, TagModule],
    template: `
        <app-breadcrump [apr]="'List account'" [manager]="'Manage account'"></app-breadcrump>
        <div class="font-semibold text-xl mb-4">Danh sách tài khoản</div>

        <p-toolbar styleClass="mb-4 shadow-sm bg-white rounded-lg px-4">
  <ng-template #start>
    <!-- <h2 class="text-lg font-semibold text-gray-800"> Danh sách giảng viên</h2> -->
  </ng-template>
  <ng-template #end>
    <div class="flex items-center ml-auto gap-2">
      <span class="pi pi-search text-gray-500"></span>
      <input
        pInputText
        type="text"
        [(ngModel)]="keyword"
        (ngModelChange)="fetchInstructors()"
        placeholder="Tìm kiếm theo tên, email..."
        class="p-inputtext-sm px-3 py-1"
        style="width: 250px"
      />
    </div>
  </ng-template>
</p-toolbar>

<p-table
  [value]="instructors"
  [paginator]="true"
  [rows]="10"
  [rowsPerPageOptions]="[10, 15, 20]"
  [responsiveLayout]="'scroll'"
  class="p-datatable-striped"
  [tableStyle]="{ 'min-width': '70rem' }"
>
  <ng-template pTemplate="header">
    <tr>
      <th>Ảnh đại diện</th>
      <th>Họ & Tên</th>
      <th>Email</th>
      <th>Ngày sinh</th>
      <th>Khóa học</th>
      <th>Học sinh</th>
      <th>Trạng thái</th>
      <th>Thao tác</th>
    </tr>
  </ng-template>

  <ng-template pTemplate="body" let-admin>
    <tr>
      <td>
        <img
          [src]="admin.avatar || defaultAvatar"
          class="w-12 h-12 rounded-full border shadow-sm object-cover"
          alt="avatar"
        />
      </td>

      <td>
        <span class="text-blue-700 font-medium cursor-pointer hover:underline" (click)="view(admin.id)">
          {{ admin.name }}
        </span>
      </td>

      <td class="text-sm text-gray-700">{{ admin.email }}</td>
      <td class="text-sm text-gray-600">{{ admin.birthDate | date }}</td>

      <td>
        <span class="text-sm font-semibold text-indigo-700">{{ admin.totalCourses }}</span>
      </td>

      <td>
        <span class="text-sm font-semibold text-green-700">{{ admin.totalStudents }}</span>
      </td>

      <td>
        <p-tag
          [value]="admin.isEnabled ? 'Hoạt động' : 'Đã khóa'"
          [severity]="admin.isEnabled ? 'success' : 'danger'"
        />
      </td>

      <td>
        <!-- <p-button
          icon="pi pi-eye"
          class="p-button-sm"
          [rounded]="true"
          [outlined]="true"
          (click)="view(admin.id)"
          tooltip="Xem chi tiết"
        /> -->
        <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700" (click)="view(admin.id)">Xem chi tiết</button>
      </td>
    </tr>
  </ng-template>
</p-table>

        <p-toast></p-toast>
    `,
    styles: `
        .search-input {
            width: 100%;
            max-width: 300px;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: border-color 0.3s ease;
        }
        .search-input:focus {
            border-color: #007bff;
            outline: none;
        }
    `,
    providers: [MessageService]
})
export class InstructorAccountComponent implements OnInit {
    view(id: number) {
        this.router.navigate(['/admin/account/view-instructor',id]);
    }
    instructors: any[] = [];
    keyword: string = '';
    defaultAvatar = 'https://www.w3schools.com/howto/img_avatar.png'; // Ảnh mặc định

    constructor(
        private http: HttpClient,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.fetchInstructors();
        console.log(this.instructors);
    }

    fetchInstructors() {
        const keyword = this.keyword ? this.keyword : '';
        this.http.get<any>(`http://localhost:8080/instructor/all?keyword=${keyword}`).subscribe((response) => {
            this.instructors = response.data;
        });
    }

    blockAdmin(adminId: number) {
        this.http.put(`http://localhost:8080/admin/${adminId}/block`, {}).subscribe(
            () => {
                this.instructors = this.instructors.filter((s) => s.id != adminId);

                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'User đã bị chặn!'
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Block thất bại!'
                });
                console.error('Error saving admin:', error);
            }
        );
    }
}

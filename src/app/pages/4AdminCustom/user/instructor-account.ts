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
        <app-breadcrump [apr]="'List instructor'" [manager]="'Manage account'"></app-breadcrump>
        <div class="font-semibold text-xl mb-4">List instructor</div>

        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="New" icon="pi pi-plus" class="mr-2" [routerLink]="['/admin/account/add-admin']" />
            </ng-template>
            <ng-template #end>
                <div class="flex items-center ml-auto">
                    <input pInputText type="text" [(ngModel)]="keyword" (ngModelChange)="fetchInstructors()" placeholder="Search keyword" class="search-input" />
                </div>
            </ng-template>
        </p-toolbar>

        <p-table [value]="instructors" [paginator]="true" [rows]="10" [tableStyle]="{ 'min-width': '70rem' }" [rowsPerPageOptions]="[10, 15, 20]" [scrollable]="true">
            <ng-template #header>
                <tr>
                    <th style="min-width: 8rem">Avatar</th>
                    <th style="min-width: 8rem">Họ & Tên</th>
                    <th style="min-width: 8rem">Email</th>
                    <th style="min-width: 8rem">Giới tính</th>
                    <th style="min-width: 8rem">Ngày sinh</th>
                    <th style="min-width: 8rem">Số khóa học</th>
                    <th style="min-width: 8rem">Số học sinh</th>
                    <th style="min-width: 8rem">Trạng thái</th>
                    <th style="min-width: 10rem">Thao tác</th>
                </tr>
            </ng-template>
            <ng-template #body let-admin>
                <tr>
                    <td><img [src]="admin.avatar || defaultAvatar" class="w-12 h-12 rounded-full" /></td>
                    <td style="color: blue; text-decoration: underline; cursor: pointer;">
                        {{ admin.name }}
                    </td>

                    <td>{{ admin.email }}</td>
                    <td>
                        <p-tag [value]="admin.gender ? 'Nam' : 'Nữ'" [severity]="admin.gender ? 'info' : 'warn'"></p-tag>
                    </td>

                    <td>{{ admin.birthDate }}</td>
                    <td>{{ admin.totalCourses }}</td>
                    <td>{{ admin.totalStudents }}</td>
                    <td>
                        <p-tag [value]="admin.isEnabled ? 'Active' : 'Blocked'" [severity]="admin.isEnabled ? 'success' : 'danger'" />
                    </td>
                    <td>
                        <p-button icon="pi pi-eye" class="mr-2" [rounded]="true" [outlined]="true" (click)="view(admin.id)" />
                        <p-button icon="pi pi-ban" severity="danger" [rounded]="true" [outlined]="true" (click)="blockAdmin(admin.id)" />
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
        this.router.navigate(['/admin/account/view-instructor', id]);
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

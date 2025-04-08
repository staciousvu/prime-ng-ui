import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumpComponent } from '../breadcrump';

@Component({
    selector: 'app-admin-account',
    standalone: true,
    imports: [ProgressSpinnerModule,BreadcrumpComponent, CalendarModule, DropdownModule, CardModule, CommonModule, FormsModule, ButtonModule, FluidModule, FileUploadModule, ProgressSpinnerModule, ToastModule, InputTextModule, RouterLink],
    template: `
        <app-breadcrump [apr]="'Update admin'" [manager]="'Manage account'"></app-breadcrump>
        <div class="mb-4">
            <p-button label="Back" icon="pi pi-arrow-left" class="me-5" [routerLink]="['/admin/account/list-admin']" />
        </div>
        <p-fluid>
            <!-- Block chứa toàn bộ nội dung -->
            <div class="card p-6">
                <!-- Nút Save trong một block riêng -->
                <div class="flex justify-end mb-4">
                    <div class="save-button-container">
                        <p-button label="Save" icon="pi pi-check" iconPos="right" (click)="save()" [style]="{ 'min-width': '120px' }"></p-button>
                    </div>
                </div>

                <!-- Trạng thái loading -->
                <div *ngIf="loading" class="text-center py-4">Loading admin data...</div>

                <!-- Nội dung chính -->
                <div *ngIf="!loading" class="flex flex-col md:flex-row gap-6 content-wrapper">
                    <!-- Phần thông tin admin -->
                    <div class="md:w-1/2">
                        <div class="flex flex-col gap-5">
                            <div class="font-semibold text-xl">Admin Profile Update</div>

                            <div class="flex flex-col gap-2">
                                <label>First Name</label>
                                <input pInputText type="text" [(ngModel)]="admin.firstName" class="w-full" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label>Last Name</label>
                                <input pInputText type="text" [(ngModel)]="admin.lastName" class="w-full" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label>Birthdate</label>
                                <p-calendar
                                    [(ngModel)]="admin.birthDate"
                                    dateFormat="yy-mm-dd"
                                    [showIcon]="true"
                                    [yearNavigator]="true"
                                    [monthNavigator]="true"
                                    yearRange="1900:2030"
                                    placeholder="Select birthdate"
                                    [readonlyInput]="false"
                                    inputId="birthdate"
                                    class="w-full"
                                ></p-calendar>
                            </div>

                            <div class="flex flex-col gap-2">
                                <label>Password</label>
                                <input pInputText type="password" [(ngModel)]="admin.password" class="w-full" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label>Gender</label>
                                <p-dropdown [options]="genders" [(ngModel)]="admin.gender" optionLabel="label" optionValue="value" placeholder="Select gender" class="w-full" />
                            </div>
                        </div>
                    </div>

                    <!-- Phần upload avatar -->
                    <div class="md:w-1/2">
                        <div class="flex flex-col gap-4">
                            <div class="font-semibold text-xl">Upload Avatar</div>

                            <div class="flex flex-col gap-2">
                                <p-fileUpload name="avatarUpload" mode="basic" accept="image/*" (onSelect)="onAvatarSelected($event)" chooseLabel="Choose Avatar" [auto]="true" [style]="{ width: '100%' }" />
                            </div>

                            <div *ngIf="avatarPreviewUrl" class="grid grid-cols-12 gap-2">
                                <div class="col-span-12 flex justify-center" *ngIf="isUploadingAvatar">
                                    <p-progressSpinner strokeWidth="4" />
                                </div>

                                <div class="col-span-12 flex justify-center" *ngIf="!isUploadingAvatar && avatarPreviewUrl">
                                    <img [src]="avatarPreviewUrl" alt="Admin Avatar" class="w-full max-w-xs rounded-lg shadow-lg border" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </p-fluid>

        <p-toast></p-toast>
    `,
    styles: `
        .save-button-container {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 8px;
        }

        .card {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            border: 1px solid #e9ecef;
        }

        .text-primary {
            color: #007bff;
        }

        label {
            font-weight: 500;
            color: #495057;
        }

        input,
        p-calendar,
        p-dropdown,
        p-fileUpload {
            transition: all 0.2s ease-in-out;
        }

        input:focus,
        p-calendar:focus,
        p-dropdown:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        /* Thêm đường phân cách */
        .content-wrapper {
            position: relative;
        }

        @media (min-width: 768px) {
            /* Tương ứng với md: trong Tailwind */
            .content-wrapper::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 50%;
                width: 1px;
                background-color: #e9ecef;
                transform: translateX(-50%);
            }
        }
    `,
    providers: [MessageService]
})
export class UpdateAccountAdminComponent implements OnInit {
    adminId: string | null | undefined;
    admin: any = {
        id: null,
        firstName: '',
        lastName: '',
        birthDate: null,
        password: '',
        gender: '',
        avatar: null,
        isEnable: true
    };
    loading = false;
    avatarPreviewUrl: string | null = null;
    isUploadingAvatar: boolean = false;
    genders = [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' }
    ];

    // Ánh xạ từ boolean sang chuỗi
    private genderMapFromApi: { [key: string]: string } = {
        true: 'male',
        false: 'female'
    };

    // Ánh xạ từ chuỗi sang boolean
    private genderMapToApi: { [key: string]: boolean } = {
        male: true,
        female: false
    };

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.adminId = this.route.snapshot.paramMap.get('id');
        if (this.adminId) {
            this.loadAdmin(this.adminId);
            this.avatarPreviewUrl = this.admin.avatar;
            console.log(this.avatarPreviewUrl);
        }
    }

    loadAdmin(id: string) {
        this.loading = true;
        this.http.get<any>(`http://localhost:8080/admin/${id}`).subscribe(
            (response) => {
                const genderFromApi = response.data.gender; // API trả về true/false
                this.admin = {
                    ...response.data,
                    birthDate: response.data.birthDate ? new Date(response.data.birthDate) : null,
                    gender: this.genderMapFromApi[genderFromApi.toString()] || '', // Chuyển boolean thành chuỗi
                    avatar: response.data.avatar || null
                };
                this.avatarPreviewUrl = this.admin.avatar; // Hiển thị avatar nếu có
                console.log('Admin data loaded:', this.admin);
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Không thể tải dữ liệu admin'
                });
                console.error('Error loading admin:', error);
            }
        );
    }
    // selectedAvatar: File | null = null;

    onAvatarSelected(event: any) {
        const file = event.files[0];
        if (file) {
            // this.selectedAvatar = file;
            this.isUploadingAvatar = true;
            const formData = new FormData();
            formData.append('avatar', file);
            this.http.post<any>(`http://localhost:8080/admin/upload-avatar`, formData).subscribe(
                (response) => {
                this.isUploadingAvatar = false;
                const reader = new FileReader();
                reader.onload = () => {
                    this.avatarPreviewUrl = reader.result as string;
                    this.admin.avatar = this.avatarPreviewUrl; // Lưu vào admin.avatar để gửi lên API
                    this.isUploadingAvatar = false;
                };
                reader.readAsDataURL(file);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Upload avatar thành công !'
                });
                },
                (error) => {
                    this.isUploadingAvatar = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail: 'Upload avatar thất bại!'
                    });
                }
        );
        }
    }


    save() {
        if (!this.adminId) return;

        // Chuẩn bị dữ liệu gửi lên API, chuyển gender từ chuỗi sang boolean
        const dataToSave = {
            ...this.admin,
            gender: this.genderMapToApi[this.admin.gender], // Chuyển chuỗi thành boolean
            birthDate: this.admin.birthDate ? this.admin.birthDate.toISOString().split('T')[0] : null // Định dạng lại birthDate
        };

        this.http.put(`http://localhost:8080/admin/edit/${this.adminId}`, dataToSave).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Thông tin đã được cập nhật!'
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Cập nhật thông tin thất bại!'
                });
                console.error('Error saving admin:', error);
            }
        );
    }


}

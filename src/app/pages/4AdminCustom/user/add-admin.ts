import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumpComponent } from '../breadcrump';

@Component({
    selector: 'app-add-admin',
    standalone: true,
    imports: [
        ProgressSpinnerModule,
        BreadcrumpComponent,
        CalendarModule,
        DropdownModule,
        CardModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        FluidModule,
        FileUploadModule,
        ProgressSpinnerModule,
        ToastModule,
        InputTextModule,
        RouterLink
    ],
    template: `
        <app-breadcrump [apr]="'Add new admin'" [manager]="'Manage account'"></app-breadcrump>
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

                <!-- Nội dung chính -->
                <div class="flex flex-col md:flex-row gap-6 content-wrapper">
                    <!-- Phần thông tin admin -->
                    <div class="md:w-1/2">
                        <div class="flex flex-col gap-5">
                            <div class="font-semibold text-xl">Add New Admin</div>

                            <div class="flex flex-col gap-2">
                                <label>First Name</label>
                                <input pInputText type="text" [(ngModel)]="admin.firstName" class="w-full" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label>Last Name</label>
                                <input pInputText type="text" [(ngModel)]="admin.lastName" class="w-full" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label>Email</label>
                                <input pInputText type="text" [(ngModel)]="admin.email" class="w-full" />
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
export class AddAdminComponent implements OnInit {
    admin: any = {
        firstName: '',
        lastName: '',
        birthDate: null,
        email:'',
        password: '',
        gender: '',
        avatar: null,
        isEnable: true
    };
    avatarPreviewUrl: string | null = null;
    isUploadingAvatar: boolean = false;
    genders = [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' }
    ];

    // Ánh xạ từ chuỗi sang boolean để gửi lên API
    private genderMapToApi: { [key: string]: boolean } = {
        male: true,
        female: false
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private router:Router
    ) {}

    ngOnInit(): void {
        // Khởi tạo admin rỗng khi thêm mới
        this.admin = {
            firstName: '',
            lastName: '',
            email:'',
            birthDate: null,
            password: '',
            gender: '',
            avatar: null,
            isEnable: true
        };
    }

    onAvatarSelected(event: any) {
        const file = event.files[0];
        if (file) {
            this.isUploadingAvatar = true;
            const formData = new FormData();
            formData.append('avatar', file);
            this.http.post<any>(`http://localhost:8080/admin/upload-avatar`, formData).subscribe(
                (response) => {
                    this.admin.avatar =response.data;
                    const reader = new FileReader();
                    reader.onload = () => {
                        this.avatarPreviewUrl = reader.result as string;
                        this.isUploadingAvatar = false;
                    };
                    reader.readAsDataURL(file);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Upload avatar thành công!'
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
        const dataToSave = {
            ...this.admin,
            gender: this.genderMapToApi[this.admin.gender], // Chuyển chuỗi thành boolean
            birthDate: this.admin.birthDate ? this.admin.birthDate.toISOString().split('T')[0] : null // Định dạng lại birthDate
        };
        console.log(this.admin)

        this.http.post(`http://localhost:8080/admin/add-admin`, dataToSave).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Admin mới đã được thêm!'
                });
                this.router.navigate(['/admin/account/list-admin']);
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Thêm admin mới thất bại!'
                });
                console.error('Error adding admin:', error);
            }
        );
    }
}
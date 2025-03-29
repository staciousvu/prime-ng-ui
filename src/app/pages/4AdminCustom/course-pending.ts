import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product, ProductService } from '../service/product.service';
import { Customer, CustomerService } from '../service/customer.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { CourseService } from '../service/course.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { SpeedDial } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { Toolbar, ToolbarModule } from 'primeng/toolbar';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { Select } from 'primeng/select';
import { Router, RouterModule } from '@angular/router';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseData } from '../service/data.service';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumpComponent } from './breadcrump';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'app-course-pending',
    standalone: true,
    imports: [ToastModule,RouterModule, Dialog, DialogModule, ConfirmDialogModule, InputTextModule, InputIconModule, IconFieldModule, ButtonModule, TableModule, CommonModule, BadgeModule, RatingModule, FormsModule, TagModule],
    template: `
        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-md mb-4">
            <p class="font-bold text-xl flex items-center">
                <svg class="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 100-20 10 10 0 000 20z" />
                </svg>
                Có {{ totalRecords }} khóa học mới đang chờ phê duyệt
            </p>
        </div>
        <style>
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
        </style>

        <p-table [value]="courses" [paginator]="true" [rows]="10" [tableStyle]="{ 'min-width': '70rem' }" [rowsPerPageOptions]="[10, 15, 20]" [(selection)]="selectedCourses" [scrollable]="true">
            <ng-template #header>
                <tr>
                    <th style="min-width: 10rem">Hình ảnh</th>
                    <th style="min-width: 10rem">Tiêu đề</th>
                    <th style="min-width: 14rem">Tác giả</th>
                    <th>Giá</th>
                    <th>Thời lượng</th>
                    <!-- <th style="min-width: 10rem">Ngôn ngữ</th> -->
                    <th>Trình độ</th>
                    <th>Trạng thái</th>
                    <th style="min-width: 10rem">Phê duyệt</th>
                    <th style="min-width: 10rem">Thao tác</th>
                </tr>
            </ng-template>
            <ng-template #body let-course>
                <tr>
                    <td>
                        <img src="https://th.bing.com/th/id/OIF.cHcR9RNGeslvhw6dAwJC1A?rs=1&pid=ImgDetMain" alt="thumbnail" class="w-50 rounded" />
                    </td>
                    <td>{{ course.title }}</td>
                    <td>
                        <div class="flex items-center gap-2">
                            <!-- <img [src]="course.authorAvatar" width="50" style="vertical-align: middle"/> -->
                            <img src="https://www.aceshowbiz.com/images/still/avatar09.jpg" width="50" style="vertical-align: middle" />
                            <span class="font-bold ml-2">{{ course.authorName }}</span>
                        </div>
                    </td>
                    <td>{{ course.price | currency: 'USD' }}</td>
                    <td>{{ course.duration }} giờ</td>
                    <!-- <td>{{ course.language }}</td> -->
                    <td>
                        <p-tag [value]="course.level" [severity]="getSeverity(course.level)" />
                    </td>
                    <td>
                        <p-tag [value]="'PENDING'" [severity]="'warn'" />
                    </td>
                    <td>
                        <p-button icon="pi pi-check" class="mr-2" [rounded]="true" [outlined]="true" (click)="openConfirmation(course.id)" />
                        <p-button icon="pi pi-times-circle" severity="danger" [rounded]="true" [outlined]="true" (click)="openReject(course.id)" />
                    </td>
                    <td>
                        <p-button icon="pi pi-eye" class="mr-2" [rounded]="true" [outlined]="true" (click)="view(course.id)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>
        <p-dialog header="Confirmation" [(visible)]="displayConfirmation" [style]="{ width: '350px' }" [modal]="true">
            <div class="flex items-center justify-center">
                <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem"> </i>
                <span>Bạn có chắc muốn phê duyệt khóa học này?</span>
            </div>
            <ng-template #footer>
                <p-button label="Không" icon="pi pi-times" (click)="closeConfirmation()" text severity="secondary" />
                <p-button label="Có" icon="pi pi-check" (click)="confirmApproval()" severity="danger" outlined autofocus />
            </ng-template>
        </p-dialog>

        <p-dialog header="Reject" [(visible)]="displayReject" [style]="{ width: '350px' }" [modal]="true">
            <div class="flex items-center justify-center">
                <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem"> </i>
                <span>Bạn có chắc muốn từ chối khóa học?</span>
            </div>
            <ng-template #footer>
                <p-button label="Không" icon="pi pi-times" (click)="closeReject()" text severity="secondary" />
                <p-button label="Có" icon="pi pi-check" (click)="confirmReject()" severity="danger" outlined autofocus />
            </ng-template>
        </p-dialog>

        <!-- dialog -->
        <p-toast></p-toast>
    `,
    styles: `
    .p-toast {
  @apply w-96; /* width 24rem */
}

.p-toast-message {
  @apply text-base p-4 rounded-xl;
}
    `,
    providers: [CourseService, CourseData,MessageService]
})
export class CoursePendingComponent implements OnInit {
    totalRecords: number = 0;
    courses: any[] = [];
    selectedCourses!: any;
    visible: boolean = false;
    displayConfirmation: boolean = false;
    displayReject: boolean = false;

    selectedCourseId: number | null = null;
    closeConfirmation() {
        this.displayConfirmation = false;
        this.cdr.detectChanges()
    }
    closeReject() {
        this.displayReject = false;
        this.cdr.detectChanges()
    }
    confirmApproval() {
        if (this.selectedCourseId) {
            this.http.put<any>(`http://localhost:8080/course/${this.selectedCourseId}/accept`,{}).subscribe(
                (res)=>{
                        this.displayConfirmation = false;
                        this.courses = this.courses.filter(course => course.id !== this.selectedCourseId);
                        this.totalRecords = this.courses.length;
                        this.showAccept()
                        this.cdr.detectChanges()
                }
            );

        }
    }
    
    confirmReject() {
        if (this.selectedCourseId) {
            this.http.put<any>(`http://localhost:8080/course/${this.selectedCourseId}/reject`,{}).subscribe(
                (res)=>{
                this.displayReject = false;
                this.courses = this.courses.filter(course => course.id !== this.selectedCourseId);
                this.totalRecords = this.courses.length;
                this.showReject();
                this.cdr.detectChanges()
                }
            );
        }
    }
    
    openConfirmation(courseId: number) {
        this.selectedCourseId = courseId;
        this.displayConfirmation = true;
        this.cdr.detectChanges()
    }

    openReject(courseId: number) {
        this.selectedCourseId = courseId;
        this.displayReject = true;
        this.cdr.detectChanges()
    }
    showDialog() {
        this.visible = true;
        this.cdr.detectChanges()
    }
    constructor(
        private courseService: CourseService,
        private router: Router,
        private http:HttpClient,
        private cdr:ChangeDetectorRef,
        private messageService:MessageService
    ) {}

    ngOnInit() {
        this.courseService.getPendingCourses().subscribe((response) => {
            this.courses = response.data;
            this.totalRecords = this.courses.length;
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
        this.router.navigate(['/courses/view-course', id]);
    }
    showAccept() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Đã phê duyệt!' });
    }
    showReject() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Đã từ chối!' });
    }
}

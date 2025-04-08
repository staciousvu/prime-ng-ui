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
import { Select, SelectModule } from 'primeng/select';
import { Router, RouterModule } from '@angular/router';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseData } from '../service/data.service';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumpComponent } from './breadcrump';

@Component({
    selector: 'app-course-label',
    standalone: true,
    imports: [
        TagModule,
        SelectModule,
        BreadcrumpComponent,
        RouterModule,
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
        TagModule
    ],
    template: `
        <app-breadcrump [apr]="'Label course'" [manager]="'Manage course'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">Label Course</div>
        <div class="flex gap-4 mb-4">
            <!-- Dropdown sắp xếp theo thời gian tạo -->
            <p-select [options]="sortDirections"[(ngModel)]="selectedSortDirections.createdAt" (ngModelChange)="performSearch()" placeholder="Sort by Created At" class="w-56" />

            <!-- Dropdown sắp xếp theo số lượng đánh giá -->
            <p-select [options]="sortDirections" [(ngModel)]="selectedSortDirections.countRating" (ngModelChange)="performSearch()" placeholder="Sort by Count Rating" class="w-56" />

            <!-- Dropdown sắp xếp theo điểm trung bình -->
            <p-select [options]="sortDirections" [(ngModel)]="selectedSortDirections.avgRating" (ngModelChange)="performSearch()" placeholder="Sort by Avg Rating" class="w-56" />

            <!-- Dropdown sắp xếp theo số người đăng ký -->
            <p-select [options]="sortDirections" [(ngModel)]="selectedSortDirections.countEnrolled" (ngModelChange)="performSearch()" placeholder="Sort by Count Enrolled" class="w-56" />
        </div>
        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2 ml-auto">
                <p-button icon="pi pi-refresh" label="Reload" severity="warn" (click)="refresh()" />
                <input type="text" placeholder="Tìm kiếm..." class="px-4 py-2 border-2 rounded" />
            </div>
        </div>
        <!-- Thêm 4 nút chức năng -->
        <div class="flex mb-3 items-center gap-2">
        <div class="flex items-center space-x-2 ml-auto">
        <p-button label="Gán nhãn Bestseller" icon="pi pi-star" severity="success" (click)="setLabel('BESTSELLER')"/>
    <p-button label="Gán nhãn High Rating" icon="pi pi-thumbs-up" severity="info" (click)="setLabel('HIGHRATING')"/>
    <p-button label="Gán nhãn Trending" icon="pi pi-chart-line" severity="primary" (click)="setLabel('TRENDING')"/>
    <p-button label="Bỏ nhãn" icon="pi pi-times" severity="danger" (click)="setLabel('NONE')"/>
            </div>
        </div>

        <p-table #dt [value]="courses" [paginator]="true" [rows]="10" [tableStyle]="{ 'min-width': '70rem' }" [rowsPerPageOptions]="[10, 15, 20]" [(selection)]="selectedCourses" [scrollable]="true" selectionMode="multiple" dataKey="id">
            <ng-template pTemplate="header">
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                    </th>
                    <th style="min-width: 10rem">Hình ảnh</th>
                    <th style="min-width: 10rem">Tiêu đề</th>
                    <th style="min-width: 14rem">Tác giả</th>
                    <th>Tổng đăng kí</th>
                    <th>Avg Rating</th>
                    <th>Count Rating</th>
                    <th>Label</th>
                    <th>Status</th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-course>
                <tr [pSelectableRow]="course">
                    <td>
                        <p-tableCheckbox [value]="course"></p-tableCheckbox>
                    </td>
                    <td>
                        <img [src]="course.thumbnail" alt="thumbnail" width="90" class="rounded" />
                    </td>
                    <td>{{ course.title }}</td>
                    <td>
                        <div class="flex items-center gap-2">
                            <img src="https://www.aceshowbiz.com/images/still/avatar09.jpg" width="50" style="vertical-align: middle" />
                            <span class="font-bold ml-2">{{ course.authorName }}</span>
                        </div>
                    </td>
                    <td>{{ course.countEnrolled }}</td>
                    <td><p-rating [(ngModel)]="course.avgRating" [readonly]="true" /></td>
                    <td>{{ course.countRating }}</td>
                    <!--  -->
                    <td>
                        <p-tag [value]="course.label" [severity]="getSeverity(course.label)" />
                    </td>
                    <td>
                        <p-tag [value]="'ACCEPT'" [severity]="'success'" />
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `,
    styles: ``,
    providers: [CourseService, CourseData]
})
export class CourseLabelComponent implements OnInit {
    courses: any[] = [];
    selectedCourses: any[] = [];
    totalRecords: number = 0;

    // Danh sách hướng sắp xếp
    sortDirections = [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'desc' }
    ];

    // Chứa hướng sắp xếp của từng tiêu chí
    selectedSortDirections: any = {
        createdAt: 'desc', // Mặc định mới nhất trước
        countRating: null,
        avgRating: null,
        countEnrolled: null
    };
    refresh() {
        this.selectedSortDirections = {
            createdAt: 'desc', // Mặc định sắp xếp theo ngày tạo
            countRating: null,
            avgRating: null,
            countEnrolled: null
        };
        this.performSearch(); // Gọi lại API để load dữ liệu mới
    }

    constructor(
        private courseService: CourseService,
        private coursedata: CourseData,
        private router: Router
    ) {}

    ngOnInit() {
        this.performSearch();
    }

    // Gửi yêu cầu API lấy danh sách khóa học có sắp xếp
    performSearch() {
        const sortBy: string[] = [];
        const sortDirection: string[] = [];

        // Thêm các trường có giá trị sắp xếp vào danh sách
        for (const key in this.selectedSortDirections) {
            if (this.selectedSortDirections[key]) {
                sortBy.push(key);
                sortDirection.push(this.selectedSortDirections[key]);
            }
        }

        this.courseService.getAllCourses(sortBy, sortDirection, 0, 200).subscribe({
            next: (response) => {
                this.courses = response.data;
                this.totalRecords = response.totalRecords;
            },
            error: (err) => console.error('Lỗi khi lấy danh sách khóa học:', err)
        });
    }

    getSeverity(level: string) {
        switch (level) {
            case 'BESTSELLER':
                return 'success';
            case 'HIGHRATING':
                return 'warn';
            case 'TRENDING':
                return 'danger';
            default:
                return 'info';
        }
    }
    setLabel(label: string) {
        console.log(this.selectedCourses)
        if (this.selectedCourses.length > 0) {
            const labelRequest = { ids: this.selectedCourses.map(course => course.id) };
    
            this.courseService.addLabel(label, labelRequest).subscribe({
                next: () => {
                    // Cập nhật lại UI sau khi API thành công
                    this.selectedCourses.forEach(selectedCourse => {
                        const courseIndex = this.courses.findIndex(course => course.id === selectedCourse.id);
                        if (courseIndex !== -1) {
                            this.courses[courseIndex] = { ...this.courses[courseIndex], label: label };
                        }
                    });
    
                    this.selectedCourses = [];
                },
                error: (err) => {
                    console.error("Error updating label:", err);
                }
            });
        }
    }
    
    
}

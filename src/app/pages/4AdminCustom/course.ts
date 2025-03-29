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
export class FilterRequest {
  keyword?: string;
  language?: string;
  level?: string;
  categoryId?: number;
  isFree?: boolean;
  minDuration?: number;
  maxDuration?: number;
  avgRatings?: number;
  sortByList: string[] = [];
  sortDirectionList: string[] = [];
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [FormsModule,BreadcrumpComponent, Select, RouterModule, Dialog, DialogModule, ConfirmDialogModule, InputTextModule,
    InputIconModule, IconFieldModule, Toolbar, ButtonModule, TableModule, CommonModule, BadgeModule, RatingModule, FormsModule, TagModule],
  template: `
  <app-breadcrump [apr]="'List course'" [manager]="'Manage course'"></app-breadcrump>

<div class="font-semibold text-xl mb-4">List Course</div>
<div class="card">
  <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 rounded-lg shadow-md mb-4">
    <p class="font-bold text-xl flex items-center">
      <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16l4-4 4 4M16 12l-4-4-4 4M4 12a8 8 0 1016 0 8 8 0 00-16 0z"/>
      </svg>
      Có tổng cộng {{ totalRecords }} khóa học trong danh sách
    </p>
  </div>

  <div class="flex flex-wrap gap-4 mb-4">
    <p-select [options]="sortDirections" [(ngModel)]="selectedPriceSortDirection" (ngModelChange)="performSearch()" placeholder="Sort by price" class="w-full md:w-56" />
    <p-select [options]="sortDirections" [(ngModel)]="selectedRatingSortDirection" (ngModelChange)="performSearch()" placeholder="Sort by rating" class="w-full md:w-56" />
    <p-select [options]="levels" [(ngModel)]="selectedLevel" (ngModelChange)="performSearch()" placeholder="Select level" class="w-full md:w-56" />
    <p-select [options]="authors" [(ngModel)]="selectedAuthor" (ngModelChange)="performSearch()" placeholder="Select author" class="w-full md:w-56" />
    <p-select [options]="sortDirections" [(ngModel)]="selectedDurationSortDirection" (ngModelChange)="performSearch()" placeholder="Sort by duration" class="w-full md:w-56" />
    <p-button severity="warn" icon="pi pi-sync" outlined (click)="reset()"/>
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

  <p-toolbar styleClass="mb-6">
    <ng-template #start>
      <p-button label="New" icon="pi pi-plus" class="mr-2" (click)="showDialog()" />
      <p-button severity="danger" label="Delete" icon="pi pi-trash" outlined />
    </ng-template>
    <ng-template #end>
      <div class="flex items-center ml-auto">
        <input pInputText type="text" [(ngModel)]="keyword" (ngModelChange)="performSearch()" placeholder="Search keyword" class="search-input" />
      </div>
    </ng-template>
  </p-toolbar>
  <p-table
    [value]="courses"
    [paginator]="true"
    [rows]="10"
    [tableStyle]="{ 'min-width': '70rem' }"
    [rowsPerPageOptions]="[10, 15, 20]"
    [(selection)]="selectedCourses"
    [scrollable]="true"
  >

    <ng-template #header>
      <tr>

        <th><p-tableHeaderCheckbox /></th>
        <th style="min-width: 10rem">Hình ảnh</th>
        <th style="min-width: 10rem">Tiêu đề</th>
        <th style="min-width: 10rem">Tác giả</th>
        <!-- <th >Danh mục</th> -->
        <th >Giá</th>
        <th >Thời lượng</th>
        <th >Reviews</th>
        <th style="min-width: 10rem">Ngôn ngữ</th>
        <th >Trình độ</th>
        <th style="min-width: 14rem">
          Thao tác
        </th>
      </tr>
    </ng-template>
    <ng-template #body let-course>
      <tr>
        <td>
            <p-tableCheckbox [value]="course" />
        </td>

        <td>
          <img src="https://th.bing.com/th/id/OIF.cHcR9RNGeslvhw6dAwJC1A?rs=1&pid=ImgDetMain" alt="thumbnail" class="w-50 rounded"/>
        </td>
        <td>{{ course.title }}</td>
        <td>
        <div class="flex items-center gap-2">
                    <!-- <img [src]="course.authorAvatar" width="50" style="vertical-align: middle"/> -->
                    <img src="https://www.aceshowbiz.com/images/still/avatar09.jpg" width="50" style="vertical-align: middle"/>
                    <span class="font-bold ml-2">{{ course.authorName }}</span>
                </div>
        </td>
        <!-- <td>{{ course.categoryName }}</td> -->
        <td>{{ course.price | currency:'USD' }}</td>
        <td>{{ course.duration }} giờ</td>
        <td><p-rating [(ngModel)]="course.avgRating" [readonly]="true" /></td>
        <td>{{ course.language }}</td>
        <td>
        <p-tag [value]="course.level" [severity]="getSeverity(course.level)" />
        </td>
        <td>
        <p-button icon="pi pi-eye" class="mr-2" [rounded]="true" [outlined]="true" (click)="view(course.id)" />
        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true"  (click)="edit(course.id)"/>
        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true"  />
        </td>
      </tr>
    </ng-template>
  </p-table>
  

  <p-dialog header="Create new course" [modal]="true" [(visible)]="visible" [style]="{ width: '25rem' }">
    <div class="flex flex-col gap-2 mb-4">
      <label for="name1">Title</label>
      <input pInputText id="name1" type="text" [(ngModel)]="title"/>
    </div>
    <div class="flex justify-end gap-2">
      <p-button label="Cancel" severity="secondary" (click)="visible = false" />
      <p-button label="Save" (click)="save()" />
    </div>
  </p-dialog>
</div>

    `,
  providers: [CustomerService, CourseData]
})
export class CourseList implements OnInit {
  title:string='';
  // Các biến cho select
  sortDirections = ['Ascending', 'Descending', 'None'];
  levels = ['Beginner', 'Intermediate', 'Expert'];
  authors: string[] = []; // Sẽ lấy từ API

  selectedPriceSortDirection: string | undefined;
  selectedRatingSortDirection: string | undefined;
  selectedDurationSortDirection: string | undefined;
  selectedLevel: string | undefined;
  selectedAuthor: string | undefined;
  keyword: string = ''; // Từ khóa tìm kiếm từ input

  courses: any[] = [];
  selectedCourses: any[] = [];
  visible: boolean = false;
  currentPage: number = 0;
  currentSize: number = 200;
  totalRecords: number = 0;

  items: MenuItem[] = [];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.loadAuthors(); // Tải danh sách tác giả
    this.performSearch(); // Tải dữ liệu ban đầu

    this.items = [
      { icon: 'pi pi-pencil' },
      { icon: 'pi pi-refresh' },
      { icon: 'pi pi-trash' },
      { icon: 'pi pi-upload', routerLink: ['/fileupload'] },
      { icon: 'pi pi-external-link', target: '_blank', url: 'http://angular.io' }
    ];
  }


  // Xây dựng FilterRequest từ lựa chọn người dùng
  getFilterRequest(): FilterRequest {
    const filterRequest = new FilterRequest();
    filterRequest.keyword = this.selectedAuthor || this.keyword;
    filterRequest.level = this.selectedLevel;
    filterRequest.sortByList = [];
    filterRequest.sortDirectionList = [];

    if (this.selectedPriceSortDirection && this.selectedPriceSortDirection !== 'None') {
      filterRequest.sortByList.push('price');
      filterRequest.sortDirectionList.push(this.selectedPriceSortDirection === 'Ascending' ? 'ASC' : 'DESC');
    }
    if (this.selectedRatingSortDirection && this.selectedRatingSortDirection !== 'None') {
      filterRequest.sortByList.push('avgRating');
      filterRequest.sortDirectionList.push(this.selectedRatingSortDirection === 'Ascending' ? 'ASC' : 'DESC');
    }
    if (this.selectedDurationSortDirection && this.selectedDurationSortDirection !== 'None') {
      filterRequest.sortByList.push('duration');
      filterRequest.sortDirectionList.push(this.selectedDurationSortDirection === 'Ascending' ? 'ASC' : 'DESC');
    }

    return filterRequest;
  }
  reset() {
    this.selectedPriceSortDirection = undefined;
    this.selectedRatingSortDirection = undefined;
    this.selectedDurationSortDirection = undefined;
    this.selectedLevel = undefined;
    this.selectedAuthor = undefined;
    this.keyword = '';
  
    this.performSearch(); // Gọi lại API để tải danh sách mới
  }
  

  // Thực hiện tìm kiếm
  performSearch() {
    const filterRequest = this.getFilterRequest();
    console.log(filterRequest);
    this.courseService.searchCourses(filterRequest, this.currentPage, this.currentSize).subscribe({
      next: (response: any) => {
        this.courses = response.data.content;
        console.log(this.courses);
        this.totalRecords = response.data.totalElements;
      },
      error: (error: any) => console.error('Error fetching courses:', error)
    });
  }


  // Các hành động
  showDialog() {
    this.visible = true;
  }

  save() {
    this.visible = false;
    this.courseService.createDraftCourse(this.title).subscribe(
      (response: any) => {
        this.router.navigate(['/courses/update-course', response.data]);
      }
    );
    
  }

  edit(id: string) {
    this.router.navigate(['/courses/update-course', id]);
  }

  view(id: string) {
    this.router.navigate(['/courses/view-course', id]);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'BEGINNER': return 'success';
      case 'INTERMEDIATE': return 'warn';
      case 'EXPERT': return 'danger';
      default: return 'info';
    }
  }
}











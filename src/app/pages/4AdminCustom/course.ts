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
import { ApproveCourseComponent } from './approve-course';
import { BreadcrumpComponent } from './breadcrump';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [BreadcrumpComponent,Select, RouterModule, Dialog, ConfirmDialog,DialogModule,ConfirmDialogModule,InputTextModule,
    InputIconModule, IconField, IconFieldModule, InputIcon, Toolbar, ButtonModule, TableModule, CommonModule, BadgeModule, RatingModule, FormsModule, TagModule, SpeedDial],
  template: `
  <app-breadcrump [apr]="'List course'" [manager]="'Manage course'"></app-breadcrump>

<div class="font-semibold text-xl mb-4">List Course</div>
    <div class="card">
  <!-- <div class="font-semibold text-xl mb-4">Manage Course</div> -->

        <div class="flex flex-wrap gap-4 mb-4">
  <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Sort by price" class="w-full md:w-56" />
  <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Sort by rating" class="w-full md:w-56" />
  <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select level" class="w-full md:w-56" />
  <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select author" class="w-full md:w-56" />
  <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Sort by duration" class="w-full md:w-56" />

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
        <p-button label="New" icon="pi pi-plus" class="mr-2" (click)="showDialog()"/>
            <!-- <p-button label="New" icon="pi pi-plus" class="mr-2" [routerLink]="['/courses/add-course']"/> -->
            <p-button severity="danger" label="Delete" icon="pi pi-trash" outlined />
        </ng-template>

        <ng-template #end>
            <div class="flex items-center ml-auto">
            <input pInputText type="text" placeholder="Search keyword" class="search-input" />
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
        <th style="min-width: 10rem">
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
        <p-button icon="pi pi-eye" class="mr-2" [rounded]="true" [outlined]="true"  />
        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true"  />
        </td>
      </tr>
    </ng-template>
  </p-table>
  <p-dialog header="Create new course" [modal]="true" [(visible)]="visible" [style]="{ width: '25rem' }">
        <!-- <span class="p-text-secondary block mb-8">Update your information.</span> -->
        <div class="flex flex-col gap-2 mb-4">
            <label for="name1">Title</label>
            <input pInputText id="name1" type="text" />
        </div>
        <div class="flex justify-end gap-2">
            <p-button label="Cancel" severity="secondary" (click)="visible = false" />
            <p-button label="Save" (click)="save(5)" />
        </div>
    </p-dialog>
</div>

    `,
  providers: [CustomerService,CourseData]
})
export class CourseList implements OnInit {
  cities!: City[] | undefined

  selectedCity: City | undefined;
  items!: MenuItem[] | [];
  courses: any[] = [];
  filterRequest = { name: '', category: '' };
  page = 0;
  size = 200;
  selectedCourses!: any;
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
    save(id:number){
      this.visible=false;
      this.router.navigate(['/courses/update-course', id]);
    }
  constructor(private courseService: CourseService,private data:CourseData,
    private router: Router
  ) { }

  ngOnInit() {
    // this.searchCourses();
    this.courses = this.data.getAllCourses()
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.items = [
      {
        icon: 'pi pi-pencil',

      },
      {
        icon: 'pi pi-refresh',

      },
      {
        icon: 'pi pi-trash',

      },
      {
        icon: 'pi pi-upload',
        routerLink: ['/fileupload']
      },
      {
        icon: 'pi pi-external-link',
        target: '_blank',
        url: 'http://angular.io'
      }
    ];
  }


  searchCourses(): void {
    this.courseService.searchCourses(this.filterRequest, this.page, this.size).subscribe({
      next: (response) => {
        this.courses = response.data.content || [];
      },
      error: (error) => {
        console.error('Lỗi khi lấy danh sách khóa học:', error);
      },
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
}

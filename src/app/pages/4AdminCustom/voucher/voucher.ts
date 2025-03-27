import { Component, OnInit } from "@angular/core";
import { BreadcrumpComponent } from "../breadcrump";
import { CourseData } from "../../service/data.service";
import { CourseService } from "../../service/course.service";
import { Router } from "@angular/router";
import { TableModule } from "primeng/table";
import { TabsModule } from "primeng/tabs";
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { CommonModule } from "@angular/common";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { FormsModule } from "@angular/forms";
import { VoucherService } from "../../service/voucher.service";


@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [BreadcrumpComponent, TableModule, TagModule, ButtonModule, CommonModule, ToggleSwitchModule, FormsModule],
  template: `
      <app-breadcrump [apr]="'List vouchers'" [manager]="'Manage vouchers'"></app-breadcrump>

<div class="font-semibold text-xl mb-4">List vouchers</div>
<div class="card">
    <!-- test -->
    <div class="w-full mx-auto bg-green-100 border-l-4 border-green-500 text-green-900 p-4 rounded-lg shadow-md">
    <div class="flex items-center gap-2">
        <svg class="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 4a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-semibold">Voucher đang kích hoạt</p>
    </div>
</div>




     <!-- test -->
<p-table
    [value]="vouchers1"
    
    [rows]="10"
    [tableStyle]="{ 'min-width': '70rem' }"
    [rowsPerPageOptions]="[10, 15, 20]"
    [(selection)]="selectedVouchers"
    [scrollable]="true"
  >
    <ng-template #header>
      <tr>
        <th style="min-width: 8rem">Code</th>
        <th style="min-width: 10rem">Mô tả</th>
        <th style="min-width: 10rem">Kiểu giảm Giá</th>
        <th >Ngày bắt đầu</th>
        <th >Ngày kết thúc</th>
        <th style="min-width: 7rem">Hết hạn</th>
        <th>Trạng thái</th>
        <th style="min-width: 10rem">
          Thao tác
        </th>
      </tr>
    </ng-template>
    <ng-template #body let-voucher>
    <tr>
      <td>{{ voucher.code }}</td>
      <td>{{ voucher.description }}</td>
      <td>
      <p-tag [value]="voucher.discountType" [severity]="getSeverityDiscountType(voucher.discountType)" />
      </td>
      <td>{{ voucher.startDate}}</td>
      <td>{{ voucher.endDate}}</td>
      <td>
      <p-tag [value]="isExpired(voucher.endDate)" [severity]="getSeverityExpired(voucher.endDate)"></p-tag>

      </td>
      <td>
      <p-tag
  [value]="voucher.isActive ? 'Active' : 'Inactive'"
  [severity]="getSeverityStatus(voucher.isActive)"
></p-tag>
      </td>
      <td>
      <p-toggleSwitch 
          [(ngModel)]="voucher.isActive" 
          (ngModelChange)="toggleStatus(voucher)">
        </p-toggleSwitch>
      </td>
    </tr>
    </ng-template>
  </p-table>
  
</div>
<div class="card">
    <!-- test -->
    <div class="w-full mx-auto bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-lg shadow-md">
    <div class="flex items-center gap-2">
        <svg class="w-6 h-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-semibold">Voucher chưa kích hoạt</p>
    </div>
</div>





     <!-- test -->
<p-table
    [value]="vouchers2"
    [paginator]="true"
    [rows]="5"
    [tableStyle]="{ 'min-width': '70rem' }"
    [rowsPerPageOptions]="[5, 10, 15]"
    [(selection)]="selectedVouchers"
    [scrollable]="true"
  >
    <ng-template #header>
      <tr>
        <th style="min-width: 10rem">Code</th>
        <th style="min-width: 10rem">Mô tả</th>
        <th style="min-width: 10rem">Kiểu giảm Giá</th>
        <th >Ngày bắt đầu</th>
        <th >Ngày kết thúc</th>
        <th style="min-width: 8rem">Hết hạn</th>
        <th>Trạng thái</th>
        <th style="min-width: 10rem">
          Thao tác
        </th>
      </tr>
    </ng-template>
    <ng-template #body let-voucher>
    <tr>
      <td>{{ voucher.code }}</td>
      <td>{{ voucher.description }}</td>
      <td>
      <p-tag [value]="voucher.discountType" [severity]="getSeverityDiscountType(voucher.discountType)" />
      </td>
      <td>{{ voucher.startDate}}</td>
      <td>{{ voucher.endDate}}</td>
      <td>
      <p-tag [value]="isExpired(voucher.endDate)" [severity]="getSeverityExpired(voucher.endDate)"></p-tag>

      </td>
      <td>
      <p-tag
  [value]="voucher.isActive ? 'Active' : 'Inactive'"
  [severity]="getSeverityStatus(voucher.isActive)"
></p-tag>
      </td>
      <td>
      <p-toggleSwitch 
          [(ngModel)]="voucher.isActive" 
          (ngModelChange)="toggleStatus(voucher)">
        </p-toggleSwitch>
      </td>
    </tr>
    </ng-template>
  </p-table>
</div>
<div class="card">
    <!-- test -->
    <div class="w-full mx-auto bg-red-100 border-l-4 border-red-500 text-red-900 p-4 rounded-lg shadow-md">
    <div class="flex items-center gap-2">
        <svg class="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <p class="text-lg font-semibold">Voucher đã hết hạn</p>
    </div>
</div>





     <!-- test -->
<p-table
    [value]="vouchers3"
    [paginator]="true"
    [rows]="10"
    [tableStyle]="{ 'min-width': '70rem' }"
    [rowsPerPageOptions]="[10, 15, 20]"
    [(selection)]="selectedVouchers"
    [scrollable]="true"
  >
    <ng-template #header>
      <tr>
        <th style="min-width: 10rem">Code</th>
        <th style="min-width: 10rem">Mô tả</th>
        <th style="min-width: 10rem">Kiểu giảm Giá</th>
        <th >Ngày bắt đầu</th>
        <th >Ngày kết thúc</th>
        <th style="min-width: 8rem">Hết hạn</th>
        <th>Trạng thái</th>
        <!-- <th style="min-width: 10rem">
          Thao tác
        </th> -->
      </tr>
    </ng-template>
    <ng-template #body let-voucher>
    <tr>
      <td>{{ voucher.code }}</td>
      <td>{{ voucher.description }}</td>
      <td>
      <p-tag [value]="voucher.discountType" [severity]="getSeverityDiscountType(voucher.discountType)" />
      </td>
      <td>{{ voucher.startDate}}</td>
      <td>{{ voucher.endDate}}</td>
      <td>
      <p-tag [value]="isExpired(voucher.endDate)" [severity]="getSeverityExpired(voucher.endDate)"></p-tag>

      </td>
      <td>
      <p-tag
  [value]="voucher.isActive ? 'Active' : 'Inactive'"
  [severity]="getSeverityStatus(voucher.isActive)"
></p-tag>
      </td>
      <!-- <td>
        <p-button icon="pi pi-eye" class="mr-2" [rounded]="true" [outlined]="true"></p-button>
      </td> -->
    </tr>
    </ng-template>
  </p-table>
</div>
<div class="card">
    <!-- test -->
    <div class="w-full mx-auto bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 rounded-lg shadow-md">
    <div class="flex items-center gap-2">
        <svg class="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 15h14M5 19h7" />
        </svg>
        <p class="text-lg font-semibold">Voucher hẹn lịch</p>
    </div>
</div>





     <!-- test -->
<p-table
    [value]="vouchers4"
    [paginator]="true"
    [rows]="10"
    [tableStyle]="{ 'min-width': '70rem' }"
    [rowsPerPageOptions]="[10, 15, 20]"
    [(selection)]="selectedVouchers"
    [scrollable]="true"
  >
    <ng-template #header>
      <tr>
        <th style="min-width: 10rem">Code</th>
        <th style="min-width: 10rem">Mô tả</th>
        <th style="min-width: 10rem">Kiểu giảm Giá</th>
        <th >Ngày bắt đầu</th>
        <th >Ngày kết thúc</th>
        <th style="min-width: 8rem">Hết hạn</th>
        <th>Trạng thái</th>
        <th style="min-width: 10rem">
          Thao tác
        </th>
      </tr>
    </ng-template>
    <ng-template #body let-voucher>
    <tr>
      <td>{{ voucher.code }}</td>
      <td>{{ voucher.description }}</td>
      <td>
      <p-tag [value]="voucher.discountType" [severity]="getSeverityDiscountType(voucher.discountType)" />
      </td>
      <td>{{ voucher.startDate}}</td>
      <td>{{ voucher.endDate}}</td>
      <td>
      <p-tag [value]="isExpired(voucher.endDate)" [severity]="getSeverityExpired(voucher.endDate)"></p-tag>

      </td>
      <td>
      <p-tag
  [value]="voucher.isActive ? 'Active' : 'Inactive'"
  [severity]="getSeverityStatus(voucher.isActive)"
></p-tag>
      </td>
      <td>
        <p-button icon="pi pi-eye" class="mr-2" [rounded]="true" [outlined]="true"></p-button>
      </td>
    </tr>
    </ng-template>
  </p-table>
</div>
    `
  , providers: [CourseData]
})
export class VoucherComponent implements OnInit {
  checked: boolean = false;
  isExpired(endDate: string): string {
    return new Date(endDate) < new Date() ? 'Hết hạn' : 'Còn hạn';
  }

  getSeverityDiscountType(discountType: string) {
    switch (discountType.toUpperCase()) {
      case 'PERCENTAGE':
        return 'info';
      case 'FIXED_AMOUNT':
        return 'success';
      default:
        return 'warn';
    }
  }

  getSeverityExpired(endDate: string) {
    const now = new Date();
    const expiryDate = new Date(endDate);
    return expiryDate < now ? 'danger' : 'success';
  }

  getSeverityStatus(status: boolean) {
    return status == true ? 'success' : 'warn';
  }
  toggleStatus(voucher: any) {
    // console.log(`User ${voucher.id} status changed to: ${user.active ? 'Active' : 'Inactive'}`);
    this.voucherService.toggleActiveVoucher(voucher.id,).subscribe();
    this.voucherService.updateLatest().subscribe();
    this.voucherService.getActiveVoucherNonExpired().subscribe(
      (response: any) => {
        this.vouchers1 = response?.data ?? []; // Nếu response hoặc response.data là null, gán thành mảng rỗng
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
        this.vouchers1 = []; // Đảm bảo không bị lỗi khi API thất bại
      }
    );
    console.log(this.vouchers1);
    this.voucherService.getInactiveVoucherNonExpired().subscribe(
      (response) => {
        this.vouchers2 = response.data;
      }
    );
  }
  selectedVouchers!: any;
  vouchers1: any;
  vouchers2: any;
  vouchers3: any;
  vouchers4: any;
  constructor(private courseService: CourseService, private data: CourseData, private voucherService: VoucherService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.voucherService.updateLatest().subscribe();
    this.voucherService.getActiveVoucherNonExpired().subscribe(
      (response: any) => {
        this.vouchers1 = response?.data ?? []; // Nếu response hoặc response.data là null, gán thành mảng rỗng
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
        this.vouchers1 = []; // Đảm bảo không bị lỗi khi API thất bại
      }
    );
    console.log(this.vouchers1);
    this.voucherService.getInactiveVoucherNonExpired().subscribe(
      (response) => {
        this.vouchers2 = response.data;
      }
    );
    this.voucherService.getInactiveVoucherExpired().subscribe(
      (response) => {
        this.vouchers3 = response.data;
      }
    )
    this.voucherService.getInactiveNotStarted().subscribe(
      (response) => {
        this.vouchers4 = response.data;
      }
    )

    console.log(this.vouchers1);
  }

}
import { Component } from "@angular/core";
import { BreadcrumpComponent } from "../breadcrump";
import { SelectItem } from "primeng/api";
import { DatePickerModule } from "primeng/datepicker";
import { SelectModule } from "primeng/select";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputNumberModule } from "primeng/inputnumber";
import { TextareaModule, TextareaStyle } from "primeng/textarea";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { ToggleButtonModule } from "primeng/togglebutton";
import { VoucherService } from "../../service/voucher.service";


@Component({
    selector: 'app-add-voucher',
    standalone:true,
    imports:[ToggleButtonModule,ToggleSwitchModule,ButtonModule,BreadcrumpComponent,DatePickerModule,SelectModule,CommonModule,FormsModule,InputNumberModule,TextareaModule,InputTextModule],
        template: `
          <app-breadcrump [apr]="'Add voucher'" [manager]="'Manage vouchers'"></app-breadcrump>
    
    <div class="font-semibold text-xl mb-4">Add voucher</div>
    <div class="flex">
    <div class="w-1/2">
        <div class="card bg-white p-6 rounded shadow-md flex flex-col gap-5">
            <div class="font-semibold text-xl">Add Voucher</div>
            <div class="flex flex-col gap-2">
                <label for="code">Code</label>
                <input pInputText id="code" type="text" [(ngModel)]="code" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="description">Description</label>
                <textarea pTextarea id="description" rows="5" [(ngModel)]="description"></textarea>
            </div>
            <div class="flex flex-wrap gap-6">
                <div class="flex flex-col grow basis-0 gap-2">
                    <label for="discountType">Discount type</label>
                    <p-select 
  [options]="discountTypes" 
  [(ngModel)]="selectedDiscountType" 
  optionLabel="label" 
  optionValue="value" 
  placeholder="Select discount type" 
  class="w-full" 
/>
                </div>
                <div class="flex flex-col grow basis-0 gap-2">
                    <label for="discountValue">Discount value</label>
                    <p-inputNumber id="discountValue" [(ngModel)]="discountValue"></p-inputNumber>
                </div>
            </div>
            <div class="flex flex-wrap gap-6">
                <div class="flex flex-col grow basis-0 gap-2">
                    <label for="startDate">Start date</label>
                    <p-datepicker id="startDate" [(ngModel)]="startDate" (onSelect)="onDateChange('start', $event)" showIcon="true"></p-datepicker>
                </div>
                <div class="flex flex-col grow basis-0 gap-2">
                    <label for="enddate">End date</label>
                    <p-datepicker id="enddate" [(ngModel)]="endDate" (onSelect)="onDateChange('endend', $event)" showIcon="true"></p-datepicker>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <label for="isActive">Active</label>
                <p-toggle-switch id="isActive" [(ngModel)]="isActive"/>
            </div>
            <div class="flex justify-end">
                <button pButton type="submit" label="Add Voucher" (click)="createVoucher()"></button>
            </div>
        </div>
    </div>
    <div class="w-1/2 bg-gray-100 p-6 flex flex-col gap-6">
        <!-- Hình ảnh voucher -->
        <div class="flex justify-center">
            <img src="https://glutenfree4u.com.au/wp-content/uploads/2020/05/Gift-Voucher.jpg" alt="Voucher Image" class="max-w-full h-auto rounded-lg shadow-md" style="max-height: 300px;" />
        </div>

        <!-- Preview và Generator nằm ngang -->
        <div class="flex flex-row gap-6 flex-1">
            <!-- Voucher Preview -->
            <div class="w-1/2 flex justify-center items-center">
                <div class="voucher-preview bg-white p-4 rounded-lg shadow-md w-full text-center">
                    <h2 class="text-lg font-bold text-green-600">
                        {{ selectedDiscountType === 'PERCENTAGE' ? (discountValue + '%') : ('$' + discountValue) }} OFF
                    </h2>
                    <p class="text-md font-semibold mt-2">{{ code || 'VOUCHER_CODE' }}</p>
                    <p class="text-sm text-gray-600 mt-2">{{ description || 'Enter description' }}</p>
                    <p class="text-xs text-gray-500 mt-2">
                        Valid from {{ startDate | date:'shortDate' }} to {{ endDate | date:'shortDate' }}
                    </p>
                </div>
            </div>

            <!-- Voucher Code Generator -->
            <div class="w-1/2 flex flex-col justify-center items-center gap-4 p-4 bg-white rounded-lg shadow-md">
                <h3 class="font-semibold">Voucher Code Suggestion</h3>
                <p class="text-lg font-mono">{{ suggestedCode }}</p>
                <div class="flex gap-4">
                    <button pButton label="Generate" (click)="generateCode()"></button>
                    <button pButton label="Use Code" (click)="applySuggestedCode()" class="p-button-secondary"></button>
                </div>
            </div>
        </div>
    </div>
</div>
        `
})
export class AddVoucherComponent {
    onDateChange(type: string, event: Date) {
        if (type === 'start') {
            this.startDate = new Date(event); // Cập nhật startDate
        } else {
            this.endDate = new Date(event); // Cập nhật endDate
        }
    }
    
    createVoucher() {
        const voucher = {
            code: this.code,
            description: this.description,
            discountType: this.selectedDiscountType,
            discountValue: this.discountValue,
            startDate: this.startDate.toISOString(), // Đảm bảo key là "startDate" khớp với server
            endDate: this.endDate.toISOString(),     // Đảm bảo key là "endDate" khớp với server
            isActive: this.isActive
        };

        this.voucher.createVoucher(voucher).subscribe({
            next: (res) => alert('Voucher created successfully!'),
            error: (err) => console.error('Error:', err)
        });
    }
      constructor(private voucher:VoucherService){}
    // Dữ liệu cho form
    discountTypes: SelectItem[] = [
        { label: 'PERCENTAGE', value: 'PERCENTAGE' },
        { label: 'FIXED_AMOUNT', value: 'FIXED_AMOUNT' }
    ];
    code: string = '';
    description: string = '';
    selectedDiscountType: string = 'PERCENTAGE';
    discountValue: number = 0;
    startDate: Date = new Date(); 
    endDate: Date = new Date();   
    isActive: boolean = true;
    // Dữ liệu cho Code Generator
    suggestedCode: string = 'SAVE10';

    // Tạo mã voucher ngẫu nhiên
    generateCode() {
        const randomNum = Math.floor(Math.random() * 10000);
        this.suggestedCode = `VOUCHER${randomNum}`;
    }

    // Áp dụng mã gợi ý vào form
    applySuggestedCode() {
        this.code = this.suggestedCode;

    }
}
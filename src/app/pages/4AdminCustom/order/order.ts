import { Component } from '@angular/core';
import { BreadcrumpComponent } from '../breadcrump';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [CommonModule, PaginatorModule, BreadcrumpComponent, ButtonModule, TableModule, RatingModule, FormsModule, DialogModule, ToastModule, RippleModule],
    template: `
        <app-breadcrump [apr]="'List orders'" [manager]="'Manage orders'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">List orders</div>

        <div class="flex justify-between items-center mb-4">
            <input
                [(ngModel)]="searchEmail"
                (ngModelChange)="loadPayments()"
                type="text"
                placeholder="Tìm kiếm email..."
                class="px-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ease-in-out duration-300"
            />
        </div>

        <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead class="bg-gray-100 text-gray-700 text-left">
                <tr>
                    <th class="p-3">Transaction ID</th>
                    <th class="p-3">Email</th>
                    <th class="p-3">Information</th>
                    <th class="p-3">Method</th>
                    <th class="p-3">Status</th>
                    <th class="p-3">Total</th>
                    <th class="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let payment of payments" class="border-t hover:bg-gray-50">
                    <td class="p-3">{{ payment.transactionId }}</td>
                    <td class="p-3">
                        <div class="flex items-center space-x-4">
                            <!-- Hình ảnh người dùng -->
                            <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                <img *ngIf="payment.avatar" [src]="payment.avatar" alt="user avatar" class="object-cover w-full h-full" />
                                <div *ngIf="!payment.avatar" class="flex items-center justify-center w-full h-full text-gray-500">No Image</div>
                            </div>

                            <!-- Thông tin người dùng -->
                            <div class="flex flex-col">
                                <div class="font-semibold text-gray-800">{{ payment.fullName }}</div>
                                <a [href]="'mailto:' + payment.email" class="text-blue-600 text-sm hover:underline">
                                    {{ payment.email }}
                                </a>
                            </div>
                        </div>
                    </td>

                    <td class="p-3">{{ payment.paymentInformation }}</td>
                    <td class="p-3">{{ payment.paymentMethod }}</td>
                    <td class="p-3">
                        <span
                            class="px-2 py-1 rounded text-sm"
                            [ngClass]="{
                                'bg-yellow-100 text-yellow-700': payment.paymentStatus === 'PENDING',
                                'bg-green-100 text-green-700': payment.paymentStatus === 'SUCCESS',
                                'bg-red-100 text-red-700': payment.paymentStatus === 'FAILED'
                            }"
                        >
                            {{ payment.paymentStatus }}
                        </span>
                    </td>
                    <td class="p-3">{{ payment.totalAmount | currency: 'VND' }}</td>
                    <td class="p-3">
                        <button (click)="viewDetails(payment)" class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Xem chi tiết</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <p-paginator [rows]="pageSize" [totalRecords]="totalRecords" [first]="page * pageSize" (onPageChange)="onPageChange($event)" class="mt-4"></p-paginator>

        <!-- Dialog for Payment Details -->
        <p-dialog header="Chi tiết thanh toán" [(visible)]="showDialog" [modal]="true" [style]="{ width: '50vw' }">
            <div *ngIf="selectedPayment">
                <div *ngFor="let detail of selectedPayment.paymentDetails" class="mb-4 flex items-center space-x-4">
                    <div class="w-24 h-24 bg-gray-200 rounded overflow-hidden">
                        <img *ngIf="detail.urlImage" [src]="detail.urlImage" alt="course image" class="object-cover w-full h-full" />
                        <div *ngIf="!detail.urlImage" class="flex items-center justify-center w-full h-full text-gray-500">No Image</div>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-lg text-gray-800">{{ detail.courseName }}</div>
                        <div class="text-sm text-gray-600">{{ detail.courseDescription }}</div>
                    </div>
                    <div class="text-right text-lg font-semibold text-gray-800">{{ detail.price | currency: 'VND' }}</div>
                </div>
            </div>
        </p-dialog>
    `
})
export class OrderComponent {
    payments: any[] = [];
    searchEmail: string = '';
    page = 0;
    pageSize = 8;
    totalRecords = 0;

    showDialog = false;
    selectedPayment: any = null;

    constructor(private http: HttpClient) {
        this.loadPayments();
    }

    loadPayments() {
        const params = {
            email: this.searchEmail,
            page: this.page,
            size: this.pageSize
        };

        this.http.get<any>('http://localhost:8080/payment', { params }).subscribe((res) => {
            this.payments = res.data.content;
            this.totalRecords = res.data.totalElements;
        });
    }

    onPageChange(event: any) {
        this.page = event.page;
        this.pageSize = event.rows;
        this.loadPayments();
    }

    viewDetails(payment: any) {
        this.selectedPayment = payment;
        this.showDialog = true;
    }
}

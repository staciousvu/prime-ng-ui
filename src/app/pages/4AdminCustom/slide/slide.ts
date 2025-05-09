import { Component, OnInit } from '@angular/core';
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
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToastService } from '../../service/toast.service';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-slide',
    standalone: true,
    imports: [CommonModule, BreadcrumpComponent, FormsModule, ToggleSwitchModule, ImageModule],
    template: `
        <app-breadcrump [apr]="'List slides'" [manager]="'Manage slides'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">List slides</div>
        <!-- Upload Button -->
        <div class="mb-6 p-4 border rounded shadow-sm bg-white">
            <div class="font-semibold text-lg mb-3">Tạo slide mới</div>
            <!-- Tabs -->
            <div class="flex space-x-4 mb-4">
                <button class="px-4 py-2 rounded border" [ngClass]="{ 'bg-blue-500 text-white': uploadMode === 'file', 'bg-gray-100': uploadMode !== 'file' }" (click)="uploadMode = 'file'">Upload File</button>
                <button class="px-4 py-2 rounded border" [ngClass]="{ 'bg-blue-500 text-white': uploadMode === 'url', 'bg-gray-100': uploadMode !== 'url' }" (click)="uploadMode = 'url'">Nhập URL ảnh</button>
            </div>

            <!-- Upload file -->
            <div *ngIf="uploadMode === 'file'" class="flex items-center space-x-3">
                <input type="file" (change)="onFileSelected($event)" class="border rounded px-2 py-1" />
                <button class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" (click)="uploadSlide()" [disabled]="!selectedFile">Upload Slide</button>
            </div>

            <!-- Nhập URL ảnh -->
            <div *ngIf="uploadMode === 'url'" class="flex items-center space-x-3">
                <input type="text" [(ngModel)]="imageUrl" placeholder="Nhập URL ảnh..." class="border rounded px-2 py-2 w-full" />
                <button class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" (click)="createSlideFromUrl()" [disabled]="!imageUrl">Lưu</button>
            </div>
        </div>

        <!-- Slide Table -->
        <table class="min-w-full bg-white border">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="py-2 px-4 border-b">Image</th>
                    <th class="py-2 px-4 border-b">Position</th>
                    <th class="py-2 px-4 border-b">Active</th>
                    <th class="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let slide of slides">
                    <td class="py-2 px-4 border-b">
                        <p-image [src]="slide.urlImage" [preview]="true" alt="Image" width="250">
                            <ng-template #indicator>
                                <i class="pi pi-search"></i>
                            </ng-template>
                            <ng-template #image>
                                <img [src]="slide.urlImage" alt="image" width="250" />
                            </ng-template>
                            <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                                <img [src]="slide.urlImage" alt="image" [style]="style" (click)="previewCallback()" />
                            </ng-template>
                        </p-image>
                        <!-- <img [src]="slide.urlImage" alt="Slide Image" class="w-60 h-auto rounded shadow" /> -->
                    </td>
                    <!-- <td class="py-2 px-4 border-b">{{ slide.position }}</td> -->
                    <td class="py-2 px-4 border-b text-left">
                        <div *ngIf="!slide.editing">
                            {{ slide.position }}
                            <button (click)="slide.editing = true" class="ml-2 text-blue-600 hover:text-blue-800">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                        </div>
                        <div *ngIf="slide.editing" class="flex items-center justify-start gap-2">
                            <input type="number" [(ngModel)]="slide.position" class="w-14 px-1 border rounded mr-2" />
                            <button (click)="updatePosition(slide)" class="text-green-600 hover:text-green-800"><i class="fa-solid fa-check"></i></button>
                            <button (click)="slide.editing = false" class="text-red-600 hover:text-red-800 ml-1"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </td> 
                    <td class="py-2 px-4 border-b">
                        <p-toggleswitch [(ngModel)]="slide.isActive" (onChange)="onToggleActive(slide)" [style]="{ width: '3rem' }"></p-toggleswitch>
                    </td>
                    <td class="py-2 px-4 border-b">
                        <button class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" (click)="deleteSlide(slide)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `
})
export class SlideComponent implements OnInit {
    uploadMode='file';
    imageUrl: any;
    createSlideFromUrl() {
        const request={
            urlImage:this.imageUrl
        }
        this.http.post<any>(`http://localhost:8080/slide/network`, request).subscribe((res) => {
            this.loadSlides();
            this.toastService.addToast('success', 'Thêm slide mới thành công');
        });
    }
    updatePosition(slide: any) {
        this.http.put<any>(`http://localhost:8080/slide/${slide.id}/position?newPosition=${slide.position}`, {}).subscribe((res) => {
            this.loadSlides();
            this.toastService.addToast('success', 'Cập nhật position cho slide thành công');
        });
    }
    onToggleActive(slide: any) {
        this.http.put<any>(`http://localhost:8080/slide/${slide.id}/toggle-active`, {}).subscribe((res) => {
            this.loadSlides();
            this.toastService.addToast('success', 'Cập nhật trạng thái cho slide thành công');
        });
    }
    onFileSelected($event: Event) {
        throw new Error('Method not implemented.');
    }
    uploadSlide() {
        throw new Error('Method not implemented.');
    }
    deleteSlide(slide: any) {
        this.http.delete<any>(`http://localhost:8080/slide/${slide.id}`, {}).subscribe((res) => {
            this.loadSlides();
            this.toastService.addToast('success', 'Xóa slide thành công');
        });
    }
    slides: any[] = [];
    selectedFile: any;
    constructor(
        private http: HttpClient,
        private toastService: ToastService
    ) {}
    ngOnInit(): void {
        this.loadSlides();
    }
    loadSlides() {
        this.http.get<any>(`http://localhost:8080/slide`).subscribe((res) => {
            this.slides = res.data;
        });
    }
}

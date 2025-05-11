import { Component, OnInit } from '@angular/core';
import { BreadcrumpComponent } from '../breadcrump';
import { ClassicEditor } from 'ckeditor5';
import { CKEDITOR_CONFIG } from '../../models/ckeditor-config';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageModule } from 'primeng/image';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseReloadService } from '../../service/course-reload.service';
import { ToastService } from '../../service/toast.service';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'app-post-list',
    standalone: true,
    imports: [BreadcrumpComponent, CommonModule, CKEditorModule,ImageModule,FormsModule,ToggleSwitchModule],
    template: `
        <app-breadcrump [apr]="'List posts'" [manager]="'Manage posts'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">List posts</div>
        <div class="flex justify-between items-center mb-4">
            <span class="text-gray-700 text-sm ml-2">Có tổng cộng {{ totalPosts }} bài viết trong danh sách</span>

            <div class="relative">
                <input (input)="loadPosts()" type="text" [(ngModel)]="keyword" placeholder="Tìm kiếm bài viết..." class="border border-gray-400 rounded-md px-3 py-2 text-base w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                <button (click)="loadPosts()" class="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="overflow-x-auto w-full">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead class="bg-gray-100 text-gray-700 text-left">
                    <tr>
                        <th class="p-3">ID</th>
                        <th class="p-3">Tác giả</th>
                        <th class="p-3">Hình ảnh</th>
                        <th class="p-3">Tiêu đề</th>
                        <th class="p-3">Nội dung</th>
                        <th class="p-3">Trạng thái</th>
                        <th class="p-3 min-w-[100px]">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let post of posts" class="border-t hover:bg-gray-50">
                        <td class="p-3">{{ post.id }}</td>
                        <td class="p-3">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                    <img *ngIf="post.authorAvatar" [src]="post.authorAvatar" alt="user avatar" class="object-cover w-full h-full" />
                                    <div *ngIf="!post.authorAvatar" class="flex items-center justify-center w-full h-full text-gray-500">No Image</div>
                                </div>
                                <div class="flex flex-col">
                                    <div class="font-semibold text-gray-800">{{ post.authorFullname }}</div>
                                    <a [href]="'mailto:' + post.authorEmail" class="text-blue-600 text-sm hover:underline">{{ post.authorEmail }}</a>
                                </div>
                            </div>
                        </td>

                        <td class="p-3">
                            <p-image *ngIf="post.imageUrl" [src]="post.imageUrl" [preview]="true" alt="Image" styleClass="w-24 h-16 object-cover">
                                <ng-template #indicator><i class="pi pi-search"></i></ng-template>
                                <ng-template #image><img [src]="post.imageUrl" alt="image" width="250" /></ng-template>
                                <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                                    <img [src]="post.imageUrl" alt="image" [style]="style" (click)="previewCallback()" />
                                </ng-template>
                            </p-image>
                        </td>

                        <td class="p-3">
                            <div>{{ post.title }}</div>
                        </td>
                        <td class="p-3">
                            <div [innerHTML]="post.content"></div>
                        </td>
                        <td class="p-3">
                            <p-toggleswitch [(ngModel)]="post.isPublished" (onChange)="onToggleActive(post)" [style]="{ width: '3rem' }"></p-toggleswitch>
                        </td>
                        <td class="p-3 space-x-2">
                            <button class="px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700" (click)="edit(post.slug)"><i class="pi pi-pen-to-square"></i></button>
                            <button class="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700" (click)="delete(post.id)"><i class="pi pi-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Pagination -->
        <div class="pagination" *ngIf="totalPages > 1">
            <button (click)="goToPage(page - 1)" [disabled]="page === 0">Previous</button>

            <button *ngFor="let p of [].constructor(totalPages); let i = index" (click)="goToPage(i)" [class.active]="i === page">
                {{ i + 1 }}
            </button>

            <button (click)="goToPage(page + 1)" [disabled]="page === totalPages - 1">Next</button>
        </div>

        <!-- dialog -->
    `,
    styles: `
        .pagination {
            margin-top: 20px;
            display: flex;
            gap: 8px;
            align-items: center;
            justify-content: center;
        }

        .pagination button {
            padding: 6px 12px;
            border: none;
            background-color: #eee;
            cursor: pointer;
        }

        .pagination button.active {
            background-color: blue;
            color: white;
            font-weight: bold;
        }

        .pagination button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    `
})
export class PostComponent implements OnInit {
delete(id: any) {
throw new Error('Method not implemented.');
}
    edit(slug: any) {
    this.router.navigate(['admin','post','edit',slug]);
    }
    posts: any[] = [];
    totalPosts = 0;
    confirmApproval(id: number) {
        Swal.fire({
            title: 'Xác nhận?',
            text: 'Bạn sẽ không thể thay đổi sau khi phê duyệt khóa học!',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Duyệt',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                this.http.put<any>(`http://localhost:8080/course/${id}/accept`, {}).subscribe((res) => {
                    this.courseReloadService.sendReload('accept');
                    this.loadPosts();
                    this.toastService.addToast('success', 'Phê duyệt khóa học thành công');
                });
            }
        });
    }

    confirmReject(id: number) {
        Swal.fire({
            title: 'Xác nhận?',
            text: 'Bạn sẽ không thể thay đổi sau khi từ chối khóa học!',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Từ chối',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                this.http.put<any>(`http://localhost:8080/course/${id}/reject`, {}).subscribe((res) => {
                    this.courseReloadService.sendReload('reject');
                    this.loadPosts();
                    this.toastService.addToast('success', 'Từ chối khóa học thành công');
                });
            }
        });
    }

    constructor(
        private router: Router,
        private http: HttpClient,
        private toastService: ToastService,
        private courseReloadService: CourseReloadService
    ) {}

    totalPages = 0;
    page: number = 0;
    size: number = 10;
    keyword: string = '';
    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
            this.page = page;
            this.loadPosts();
        }
    }

    ngOnInit() {
        this.loadPosts();
    }
    loadPosts() {
        const params = new HttpParams().set('page', this.page.toString()).set('size', this.size.toString()).set('keyword', this.keyword);
        console.log(params);
        this.http.get<any>(`http://localhost:8080/post/all`, { params }).subscribe((response) => {
            this.posts = response.data.content;
            this.totalPosts = response.data.totalElements;
            this.totalPages = response.data.totalPages;
            console.log(this.posts);
        });
    }
    onToggleActive(post: any) {
        this.http.put<any>(`http://localhost:8080/post/${post.id}/toggle-publish`, {}).subscribe((res) => {
            this.loadPosts();
            this.toastService.addToast('success', 'Cập nhật trạng thái cho post thành công');
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { BreadcrumpComponent } from '../breadcrump';
import { ClassicEditor } from 'ckeditor5';
import { CKEDITOR_CONFIG } from '../../models/ckeditor-config';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../service/toast.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-post-add',
    standalone: true,
    imports: [FormsModule, BreadcrumpComponent, CommonModule, CKEditorModule, ToggleSwitchModule, ProgressSpinnerModule],
    template: `
        <app-breadcrump [apr]="'Add post'" [manager]="'Manage posts'"></app-breadcrump>

        <div class="font-bold text-xl mb-4 text-gray-800">Tạo bài viết mới</div>

        <div *ngIf="isSubmitPost" class="card flex justify-center">
            <p-progress-spinner strokeWidth="8" fill="transparent" animationDuration=".5s" [style]="{ width: '100px', height: '100px' }" />
        </div>
        <div *ngIf="!isSubmitPost" class="w-full mx-auto bg-white">
            <!-- Title -->
            <div class="space-y-10">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Tiêu đề</label>
                    <input id="title" [(ngModel)]="title" type="text" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Nhập tiêu đề bài viết" />
                </div>

                <!-- Upload -->
                <div>
                    <label for="upload" class="block text-sm font-medium text-gray-700">Hình ảnh</label>
                    <input
                        (change)="onFileSelected($event)"
                        id="upload"
                        type="file"
                        class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full
               file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700
               hover:file:bg-indigo-100"
                    />
                </div>

                <!-- Content (CKEditor) -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                    <div class="rounded-lg border border-gray-300 p-2 overflow-auto">
                        <ckeditor [editor]="Editor" [(ngModel)]="content" [config]="config" class="h-[200px]"></ckeditor>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phát hành</label>
                    <p-toggleswitch [(ngModel)]="isPublished" />
                </div>
                <!-- Submit -->
                <div class="pt-4">
                    <button (click)="submitPost()" type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition duration-300">Tạo bài viết</button>
                </div>
            </div>
        </div>
    `,
    styles: `
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');

        @media print {
            body {
                margin: 0 !important;
            }
        }
        .main-container {
            font-family: 'Lato';
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        }
        .ck-content {
            font-family: 'Lato';
            line-height: 1.6;
            word-break: break-word;
        }

        .editor-container_classic-editor .editor-container__editor {
            min-width: 795px;
            max-width: 795px;
        }
    `
})
export class PostAddComponent implements OnInit {
    isSubmitPost = false;
    ngOnInit(): void {
        this.isSubmitPost = false;
    }
    constructor(
        private http: HttpClient,
        private toastService: ToastService,
        private router: Router
    ) {}

    public Editor = ClassicEditor;
    public config = CKEDITOR_CONFIG;
    title = '';
    content = '';
    isPublished: boolean = false;
    imageFile: File | null = null;

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.imageFile = file;
        }
    }

    submitPost() {
        this.isSubmitPost = true;
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('content', this.content);
        formData.append('isPublished', this.isPublished.toString());
        if (this.imageFile) {
            formData.append('image', this.imageFile);
        }
        console.log('formmmm dataaaaa', formData);

        this.http.post('http://localhost:8080/post', formData).subscribe({
            next: (res) => {
                this.isSubmitPost = false;
                this.toastService.addToast('success', 'Tạo bài viết thành công');
                this.router.navigate(['/admin/post/list']);
            },
            error: (err) => {
                this.isSubmitPost = false;
                this.toastService.addToast('error', 'Tạo bài viết thất bại');
                console.error(err);
            }
        });
    }
}

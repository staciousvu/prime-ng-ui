import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { Select, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { CurriculumComponent } from '../curriculum';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Editor } from 'primeng/editor';
@Component({
    selector: 'app-update-basic-info',
    standalone: true,
    imports: [
        Editor,
        FileUploadModule,
        FluidModule,
        TabsModule,
        Select,
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
        TagModule,
        TextareaModule,
        ProgressSpinnerModule,
        ToastModule
    ],
    template: `
        <div class="flex justify-end">
            <p-button label="Save" icon="pi pi-check" iconPos="right" (click)="save()"></p-button>
        </div>

        <p-fluid>
            <div *ngIf="loading">Đang tải dữ liệu khóa học...</div>
            <div *ngIf="!loading">
                <div class="flex flex-col md:flex-row gap-2">
                    <div class="md:w-1/2">
                        <div class="card flex flex-col gap-5">
                            <div class="font-semibold text-xl">Course landing page</div>
                            <div class="flex flex-col gap-2">
                                <label>Course title</label>
                                <input pInputText type="text" [(ngModel)]="course.title" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label>Course subtitle</label>
                                <input pInputText type="text" [(ngModel)]="course.subtitle" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label>Description</label>
                                <!-- <textarea pTextarea rows="5" [(ngModel)]="course.description"></textarea> -->
                                <p-editor [(ngModel)]="course.description" [style]="{ height: '320px' }" />
                            </div>
                            <div class="flex flex-wrap gap-6">
                                <div class="flex flex-col grow basis-0 gap-2">
                                    <label>Category</label>
                                    <p-select [options]="rootCategories" [(ngModel)]="selectedRoot" (ngModelChange)="onRootChange()" optionLabel="name" placeholder="Select category" class="w-full" />
                                </div>
                                <div class="flex flex-col grow basis-0 gap-2">
                                    <label>Subcategory</label>
                                    <p-select [options]="subCategories" [(ngModel)]="selectedSub" (ngModelChange)="onSubChange()" optionLabel="name" placeholder="Select subcategory" class="w-full" />
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label>Topic</label>
                                <p-select [options]="topics" [(ngModel)]="selectedTopic" optionLabel="name" placeholder="Select topic" class="w-full" />
                            </div>
                            <div class="flex flex-wrap gap-6">
                                <div class="flex flex-col grow basis-0 gap-2">
                                    <label>Language</label>
                                    <p-select optionValue="name" [options]="languages" [(ngModel)]="course.language" optionLabel="name" placeholder="Select language" class="w-full" />
                                </div>
                                <div class="flex flex-col grow basis-0 gap-2">
                                    <label>Price</label>
                                    <p-select optionValue="value" [options]="priceTiers" [(ngModel)]="course.price" optionLabel="name" placeholder="Select price tier" class="w-full" />
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label>Level</label>
                                <p-select optionValue="value" [options]="levels" [(ngModel)]="course.level" optionLabel="name" placeholder="Select level" class="w-full" />
                            </div>
                        </div>
                    </div>
                    <div class="md:w-1/2">
                        <div class="card flex flex-col gap-4">
                            <div class="font-semibold text-xl">Upload Course Image</div>
                            <div class="flex flex-col gap-2">
                                <p-fileUpload name="imageUpload" mode="basic" accept="image/*" (onSelect)="onThumbnailSelected($event)" chooseLabel="Choose Image" />
                            </div>
                            <div *ngIf="previewUrl" class="grid grid-cols-12 gap-2">
                                <div class="col-span-12 flex justify-center" *ngIf="isUploadingThumbnail">
                                    <p-progressSpinner strokeWidth="4"></p-progressSpinner>
                                </div>
                                <div class="col-span-12 flex justify-center" *ngIf="!isUploadingThumbnail && previewUrl">
                                    <img [src]="previewUrl" alt="Course Image" class="w-100 rounded-lg shadow-lg border" />
                                </div>
                            </div>
                        </div>
                        <div class="card flex flex-col gap-4">
                            <div class="font-semibold text-xl">Upload Course Video</div>
                            <div class="flex flex-col gap-2">
                                <p-fileUpload name="videoUpload" mode="basic" accept="video/*" (onSelect)="onPreviewVideoSelected($event)" chooseLabel="Choose Video" />
                            </div>
                            <div *ngIf="videoUrl" class="grid grid-cols-12 gap-2">
                                <div class="col-span-12 flex justify-center" *ngIf="isUploadingVideo">
                                    <p-progressSpinner strokeWidth="4"></p-progressSpinner>
                                </div>

                                <div class="col-span-12 flex justify-center" *ngIf="!isUploadingVideo && videoUrl">
                                    <!-- <video [src]="videoUrl" controls class="w-100 rounded-lg shadow-lg border"></video> -->
                                    <video controls class="w-100 rounded-lg shadow-lg border">
                                        <source [src]="videoUrl" type="video/mp4" />
                                        Trình duyệt của bạn không hỗ trợ video.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </p-fluid>
        <p-toast></p-toast>
    `,
    providers: [MessageService],
    styles: `
        .p-toast {
            @apply w-96; /* width 24rem */
        }

        .p-toast-message {
            @apply text-base p-4 rounded-xl;
        }
    `
})
export class UpdateBasicInfoComponent implements OnInit, OnChanges {
    @Input() courseId: number | undefined;
    loading = false;
    course: any;

    rootCategories: any[] = [];
    subCategories: any[] = [];
    topics: any[] = [];

    selectedRoot: any = null;
    selectedSub: any = null;
    selectedTopic: any = null;

    languages = [
        { name: 'English', code: 'EN' },
        { name: 'Vietnamese', code: 'VI' },
        { name: 'French', code: 'FR' },
        { name: 'Japanese', code: 'JP' },
        { name: 'Chinese', code: 'CH' },
        { name: 'Korean', code: 'KR' },
        { name: 'Spanish', code: 'SP' }
    ];
    selectedLanguage: any = null;

    priceTiers = [
        { name: 'Free', value: 0 },
        { name: '$19.99', value: 19.99 },
        { name: '$49.99', value: 49.99 },
        { name: '$99.99', value: 99.99 }
    ];
    levels = [
        { name: 'ALL', value: 'ALL' },
        { name: 'INTERMEDIATE', value: 'INTERMEDIATE' },
        { name: 'BEGINNER', value: 'BEGINNER' },
        { name: 'EXPERT', value: 'EXPERT' }
    ];
    selectedPrice: any = null;

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadRootCategories();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['courseId'] && this.courseId) {
            this.loading = true;
            this.http.get<any>(`http://localhost:8080/course/basicinfo/${this.courseId}`).subscribe(
                (response) => {
                    this.course = response.data;
                    this.previewUrl = this.course.previewUrl;
                    console.log(this.previewUrl);
                    this.videoUrl = this.course.videoUrl;
                    console.log(this.videoUrl);
                    console.log('this .course = ' + response.data.id);
                    this.loading = false;
                    if (this.course.categoryId) {
                        console.log('hello');
                        this.loadCategoryHierarchy(this.course.categoryId);
                    }
                },
                (error) => {
                    console.error('Error fetching course details:', error);
                    this.loading = false;
                }
            );
        }
    }

    loadRootCategories() {
        this.http.get<any>('http://localhost:8080/categories/root').subscribe((res) => {
            this.rootCategories = res.data;
        });
    }

    loadCategoryHierarchy(topicId: number) {
        this.http.get<any>(`http://localhost:8080/categories/hierarchy?topicId=${topicId}`).subscribe((res) => {
            const categories = res.data;
            this.selectedRoot = categories[0] || null;
            this.selectedSub = categories[1] || null;
            this.selectedTopic = categories[2] || null;

            if (this.selectedRoot?.id && this.selectedSub?.id) {
                // Gọi loadSubcategories và khi nó load xong, gọi tiếp loadTopics
                this.http.get<any>(`http://localhost:8080/categories/subcategories?parentId=${this.selectedRoot.id}`).subscribe((subRes) => {
                    this.subCategories = subRes.data;

                    this.http.get<any>(`http://localhost:8080/categories/subcategories?parentId=${this.selectedSub.id}`).subscribe((topicRes) => {
                        this.topics = topicRes.data;
                    });
                });
            }
        });
    }

    loadSubcategories(rootId: number, preSelectedSub?: number) {
        this.http.get<any>(`http://localhost:8080/categories/subcategories?parentId=${rootId}`).subscribe((res) => {
            this.subCategories = res.data;
            if (!preSelectedSub) this.selectedSub = null;
            this.selectedTopic = null;
            this.topics = [];
        });
    }

    loadTopics(subId: number) {
        this.http.get<any>(`http://localhost:8080/categories/subcategories?parentId=${subId}`).subscribe((res) => {
            this.topics = res.data;
            console.log('this topics:' + res.data);
            this.selectedTopic = null;
        });
    }

    onRootChange() {
        if (this.selectedRoot?.id) {
            this.loadSubcategories(this.selectedRoot.id);
        } else {
            this.subCategories = [];
            this.topics = [];
            this.selectedSub = null;
            this.selectedTopic = null;
        }
    }

    onSubChange() {
        if (this.selectedSub?.id) {
            this.loadTopics(this.selectedSub.id);
        } else {
            this.topics = [];
            this.selectedTopic = null;
        }
    }
    previewUrl: any;
    videoUrl: any;
    selectedThumbnail: File | null = null;
    selectedVideo: File | null = null;
    isUploadingVideo: boolean = false;
    isUploadingThumbnail: boolean = false;
    onThumbnailSelected(event: any) {
        const file = event.files?.[0];
        if (file) {
            this.selectedThumbnail = file;
            this.uploadThumbnail();
        }
    }

    uploadThumbnail() {
        if (!this.selectedThumbnail) return;
        this.isUploadingThumbnail = true;
        const formData = new FormData();
        formData.append('file', this.selectedThumbnail);

        this.http.post(`http://localhost:8080/course/${this.courseId}/thumbnail`, formData).subscribe({
            next: (res) => {
                console.log('✅ Thumbnail uploaded', res);

                if (this.selectedThumbnail) {
                    const reader = new FileReader();
                    reader.onload = (e: ProgressEvent<FileReader>) => {
                        this.previewUrl = e.target?.result ?? null;
                    };
                    reader.readAsDataURL(this.selectedThumbnail);
                    this.isUploadingThumbnail = false;
                }
            },
            error: (err) => {
                console.error('❌ Thumbnail upload failed', err);

                this.isUploadingThumbnail = false;
            }
        });
    }
    onPreviewVideoSelected(event: any) {
        const file = event.files?.[0];
        if (file) {
            this.selectedVideo = file;
            this.uploadPreviewVideo();
        }
    }

    uploadPreviewVideo() {
        if (!this.selectedVideo) return;
        this.isUploadingVideo = true; // Bắt đầu loading

        const formData = new FormData();
        formData.append('file', this.selectedVideo);

        this.http.post(`http://localhost:8080/course/${this.courseId}/preview-video`, formData).subscribe({
            next: (res) => {
                console.log('✅ Preview video uploaded', res);

                // Render preview sau khi upload thành công
                if (this.selectedVideo) {
                    const reader = new FileReader();
                    reader.onload = (e: ProgressEvent<FileReader>) => {
                        this.videoUrl = e.target?.result ?? null;
                    };
                    reader.readAsDataURL(this.selectedVideo);
                    this.isUploadingVideo = false;
                }
            },
            error: (err) => {
                console.error('❌ Preview video upload failed', err);
                this.isUploadingVideo = false;
            }
        });
    }
    save() {
        const data = {
            title: this.course.title,
            subtitle: this.course.subtitle,
            price: this.course.price,
            description: this.course.description,
            language: this.course.language,
            level: this.course.level,
            categoryId: this.selectedTopic.id
        };
        this.http.put<any>(`http://localhost:8080/course/${this.courseId}`, data).subscribe((res) => {
            this.showSuccess();
        });
    }
    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cập nhật khóa học thành công!' });
    }
}

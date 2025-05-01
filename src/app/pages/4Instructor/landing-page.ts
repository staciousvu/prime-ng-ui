import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HeaderControlService } from '../service/header.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../service/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Editor } from 'primeng/editor';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-edit-course-landing-page',
    standalone: true,
    encapsulation:ViewEncapsulation.None, 
    imports: [RouterModule, FormsModule, CommonModule, Editor, SelectModule],
    template: `
        <section class="bg-white rounded-md shadow-sm flex-grow w-full min-w-0 border border-[#E2E8F0] pb-14" aria-label="Intended learners">
        <header class="border-b border-[#E2E8F0] px-10 py-2 flex justify-center items-center">
                <h1 class="text-2xl font-semibold text-[#1E293B] mb-0">Course landing page</h1>
            </header>
            <div class="px-10 pt-10 space-y-8 text-[#334155] text-base font-normal max-w-4xl">
                <p>
                    Trang đích khóa học của bạn đóng vai trò quan trọng đối với thành công của bạn trên Udemy. Nếu thực hiện đúng, nó cũng có thể giúp bạn tăng khả năng hiển thị trên các công cụ tìm kiếm như Google. Khi bạn hoàn thành phần này, hãy
                    nghĩ đến việc tạo Trang đích khóa học hấp dẫn để chứng minh lý do tại sao ai đó muốn đăng ký khóa học của bạn. Tìm hiểu thêm về cách tạo <a href="#" class="text-purple-700 underline hover:text-purple-800">landing page</a>.
                </p>
                <form class="space-y-6">
                    <!-- Course title -->
                    <div>
                        <label for="course-title" class="block font-semibold text-gray-900 mb-1"> Course title </label>
                        <div class="flex items-center border border-gray-400 rounded-md overflow-hidden">
                            <input id="course-title" type="text" [(ngModel)]="course.title" name="title" placeholder="Insert your course title." maxlength="60" class="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none" />
                            <span class="text-gray-600 px-4 select-none">{{ 60 - (course.title?.length || 0) }}</span>
                        </div>
                        <p class="mt-1 text-xs text-gray-600">Tiêu đề của bạn phải là sự kết hợp giữa sự thu hút, thông tin rõ ràng và được tối ưu hóa cho tìm kiếm.</p>
                    </div>

                    <!-- Course subtitle -->
                    <div>
                        <label for="course-subtitle" class="block font-semibold text-gray-900 mb-1"> Course subtitle </label>
                        <div class="flex items-center border border-gray-400 rounded-md overflow-hidden">
                            <input
                                id="course-subtitle"
                                type="text"
                                [(ngModel)]="course.subtitle"
                                name="subtitle"
                                placeholder="Insert your course subtitle."
                                maxlength="120"
                                class="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                            <span class="text-gray-600 px-4 select-none">{{ 120 - (course.subtitle?.length || 0) }}</span>
                        </div>
                        <p class="mt-1 text-xs text-gray-600">Sử dụng 1 hoặc 2 từ khóa liên quan và đề cập đến 3-4 lĩnh vực quan trọng nhất mà bạn đã học trong suốt khóa học.</p>
                    </div>

                    <!-- Course description -->
                    <div>
                        <label for="course-description" class="block font-semibold text-gray-900 mb-1"> Course description </label>
                        <!-- <p-editor class="" [(ngModel)]="course.description" name="description" [style]="{ height: '250px' }" /> -->
                        <p-editor [(ngModel)]="course.description" name="description" [style]="{ height: '250px' }">
                            <ng-template #header>
                                <span class="ql-formats">
                                    <button type="button" class="ql-bold" aria-label="Bold"></button>
                                    <button type="button" class="ql-italic" aria-label="Italic"></button>
                                    <button type="button" class="ql-underline" aria-label="Underline"></button>
                                </span>
                            </ng-template>
                        </p-editor>
                        <p class="mt-1 text-xs text-gray-600">Mô tả phải có ít nhất 200 từ.</p>
                    </div>

                    <div class="flex space-x-4">
                        <div class="max-w-sm flex-1">
                            <label for="language" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select language</label>
                            <select
                                id="language"
                                [(ngModel)]="course.language"
                                name="language"
                                class="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option [ngValue]="null" disabled>Choose a language</option>
                                <option *ngFor="let lang of languages" [ngValue]="lang.name">{{ lang.name }}</option>
                            </select>
                        </div>
                        <div class="max-w-sm flex-1">
                            <label for="level" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select level</label>
                            <select
                                id="level"
                                [(ngModel)]="course.level"
                                name="level"
                                class="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option [ngValue]="null" disabled>Choose a level</option>
                                <option *ngFor="let lvl of levels" [ngValue]="lvl.value">{{ lvl.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex space-x-4">
                        <div class="max-w-sm flex-1">
                            <label for="root-category" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select category</label>
                            <select
                                id="root-category"
                                [(ngModel)]="selectedRoot"
                                (ngModelChange)="onRootChange()"
                                name="rootCategory"
                                class="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option [ngValue]="null" disabled>Choose a category</option>
                                <option *ngFor="let cat of rootCategories; trackBy: trackById" [ngValue]="cat">{{ cat.name }}</option>
                            </select>
                        </div>
                        <div class="max-w-sm flex-1">
                            <label for="sub-category" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select subcategory</label>
                            <select
                                id="sub-category"
                                [(ngModel)]="selectedSub"
                                (ngModelChange)="onSubChange()"
                                [disabled]="!selectedRoot"
                                name="subCategory"
                                class="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option [ngValue]="null" disabled>Choose a subcategory</option>
                                <option *ngFor="let sub of subCategories; trackBy: trackById" [ngValue]="sub">{{ sub.name }}</option>
                            </select>
                        </div>
                        <div class="max-w-sm flex-1">
                            <label for="topic" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select topic</label>
                            <select
                                id="topic"
                                [(ngModel)]="selectedTopic"
                                [disabled]="!selectedSub"
                                name="topic"
                                class="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option [ngValue]="null" disabled>Choose a topic</option>
                                <option *ngFor="let topic of topics; trackBy: trackById" [ngValue]="topic">{{ topic.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex space-y-8">
                        <!-- Image Upload Section -->
                        <div class="flex flex-col md:flex-row items-center gap-6 bg-white">
                        <div class="w-full md:w-1/2 flex justify-center items-center border border-dashed border-gray-300 rounded-lg p-6 h-64">
                        <img *ngIf="instructorImageUrl; else placeholderImage" [src]="instructorImageUrl" alt="Course Image" class="max-w-full max-h-full object-contain" />
                        <ng-template #placeholderImage>
                            <img src="/assets/default-image.png" alt="Placeholder" class="max-w-full max-h-full object-contain opacity-50" />
                        </ng-template>
                        </div>

                        <div class="w-full md:w-1/2 flex flex-col gap-4">
                            <h2 class="text-lg font-bold text-gray-800">Course Image</h2>
                            <p class="text-gray-600 text-sm">
                            Upload your course image here. Guidelines: 750x422 pixels; .jpg, .jpeg, .gif, or .png. No text on the image.
                            </p>
                            <input type="file" accept="image/*" (change)="onInstructorImageSelected($event)"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
                            <span *ngIf="isUploadingInstructorImage" class="text-purple-600 text-sm">Uploading image...</span>
                        </div>
                        </div>

                    </div>
                    <div class="flex space-y-8">
                        <div class="flex flex-col md:flex-row items-center gap-6 bg-white p-4 mt-8 rounded-lg shadow-sm">
                        <div class="w-full md:w-1/2 flex justify-center items-center border border-dashed border-gray-300 rounded-lg p-6 h-64">
                        <video *ngIf="showInstructorVideo" class="max-w-full max-h-full object-contain" controls>
                            <source [src]="instructorVideoUrl" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <!-- <ng-template #placeholderVideo>
                            <video class="max-w-full max-h-full object-contain opacity-50" controls>
                            <source src="" />
                            </video>
                        </ng-template> -->
                        </div>

                            <div class="w-full md:w-1/2 flex flex-col gap-4">
                                <h2 class="text-lg font-bold text-gray-800">Course Video</h2>
                                <p class="text-gray-600 text-sm">
                                Upload your course video here. Recommended formats: .mp4, .mov, .avi. Max size: 500MB.
                                </p>
                                <input type="file" accept="video/*" (change)="onInstructorVideoSelected($event)"
                                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
                                <span *ngIf="isUploadingInstructorVideo" class="text-purple-600 text-sm">Uploading video...</span>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </section>
    `,
    styles: `


    `
})
export class EditCourseLandingPageComponent implements OnInit, OnDestroy {


    courseId: number = 0;
    course: any | null;
    rootCategories: Category[] = [];
    subCategories: Category[] = [];
    topics: Category[] = [];

    selectedRoot: Category | null = null;
    selectedSub: Category | null = null;
    selectedTopic: Category | null = null;

    languages = [
        { name: 'English', code: 'EN' },
        { name: 'Vietnamese', code: 'VI' },
        { name: 'French', code: 'FR' },
        { name: 'Japanese', code: 'JP' },
        { name: 'Chinese', code: 'CH' },
        { name: 'Korean', code: 'KR' },
        { name: 'Spanish', code: 'SP' }
    ];

    priceTiers = [
        { name: 'Free', value: 0 },
        { name: '$129.000', value: 129000 },
        { name: '$229.000', value: 229000 },
        { name: '$349.000', value: 349000 },
        { name: '$449.000', value: 449000 }
    ];
    levels = [
        { name: 'All', value: 'ALL' },
        { name: 'Intermediate', value: 'INTERMEDIATE' },
        { name: 'Beginner', value: 'BEGINNER' },
        { name: 'Expert', value: 'EXPERT' }
    ];
    constructor(
        private headerService: HeaderControlService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.parent?.paramMap.subscribe((params) => {
            this.courseId = +params.get('id')!;
        });
        this.loadRootCategories();
        this.http.get<any>(`http://localhost:8080/course/basicinfo/${this.courseId}`).subscribe(
            (response) => {
                this.course = response.data;
                this.instructorImageUrl = this.course.previewUrl;
                this.instructorVideoUrl = this.course.videoUrl;
                if (this.course.categoryId) {
                    this.loadCategoryHierarchy(this.course.categoryId);
                }
            },
            (error) => {
                console.error('Error fetching course details:', error);
            }
        );
        this.headerService.setControls([
            {
                type: 'button',
                label: 'Save',
                action: () => this.save(),
                disabled: false
            },
            {
                type: 'button',
                label: 'Continue',
                action: () => console.log('heelo'),
                disabled: false
            }
        ]);
    }

    ngOnDestroy(): void {
        this.headerService.clearControls();
    }
    loadRootCategories() {
        this.http.get<any>('http://localhost:8080/categories/root').subscribe((res) => {
            this.rootCategories = res.data;
        });
    }
    loadCategoryHierarchy(topicId: number) {
        this.http.get<any>(`http://localhost:8080/categories/hierarchy?topicId=${topicId}`).subscribe((res) => {
            const categories = res.data; // List<CategoryDTO>
            // Tìm danh mục gốc từ rootCategories
            this.selectedRoot = this.rootCategories.find((cat) => cat.id === categories[0]?.id) || null;

            if (this.selectedRoot?.id) {
                // Tải danh mục con
                this.http.get<any>(`http://localhost:8080/categories/subcategories?parentId=${this.selectedRoot.id}`).subscribe((subRes) => {
                    this.subCategories = subRes.data;
                    // Tìm danh mục con từ subCategories
                    this.selectedSub = this.subCategories.find((cat) => cat.id === categories[1]?.id) || null;

                    if (this.selectedSub?.id) {
                        // Tải chủ đề
                        this.http.get<any>(`http://localhost:8080/categories/subcategories?parentId=${this.selectedSub.id}`).subscribe((topicRes) => {
                            this.topics = topicRes.data;
                            // Tìm chủ đề từ topics
                            this.selectedTopic = this.topics.find((cat) => cat.id === categories[2]?.id) || null;
                        });
                    } else {
                        this.topics = [];
                        this.selectedTopic = null;
                    }
                });
            } else {
                this.subCategories = [];
                this.topics = [];
                this.selectedSub = null;
                this.selectedTopic = null;
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
    save() {
        console.log(this.course.description);
        const data = {
            title: this.course.title,
            subtitle: this.course.subtitle,
            price: this.course.price,
            description: this.course.description,
            language: this.course.language,
            level: this.course.level,
            categoryId: this.selectedTopic!.id
        };
        this.http.put<any>(`http://localhost:8080/course/${this.courseId}`, data).subscribe((res) => {
            this.toastService.addToast('success', 'Update landing page successfully');
        });
    }
    trackById(index: number, item: any): any {
        return item.id; // Giả sử mỗi item có trường id duy nhất
    }
    instructorImageUrl: any = null;
    instructorVideoUrl: any = null;

    isUploadingInstructorImage = false;
    isUploadingInstructorVideo = false;

    selectedInstructorImage: File | null = null;
    selectedInstructorVideo: File | null = null;
    onInstructorImageSelected(event: any) {
        const file = event.target.files?.[0];
        if (file) {
          this.selectedInstructorImage = file;
          this.uploadInstructorImage();
        }
      }
    
      uploadInstructorImage() {
        if (!this.selectedInstructorImage) return;
        this.isUploadingInstructorImage = true;
    
        const formData = new FormData();
        formData.append('file', this.selectedInstructorImage);
    
        this.http.post(`http://localhost:8080/course/${this.courseId}/thumbnail`, formData).subscribe({
          next: () => {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
              this.instructorImageUrl = e.target?.result ?? null;
              this.isUploadingInstructorImage = false;
            };
            reader.readAsDataURL(this.selectedInstructorImage!);
          },
          error: (err) => {
            console.error('Upload image error:', err);
            this.isUploadingInstructorImage = false;
          }
        });
      }
    
      onInstructorVideoSelected(event: any) {
        const file = event.target.files?.[0];
        if (file) {
          this.selectedInstructorVideo = file;
          this.uploadInstructorVideo();
        }
      }
      showInstructorVideo = true;

    
      uploadInstructorVideo() {
        if (!this.selectedInstructorVideo) return;
        this.isUploadingInstructorVideo = true;
    
        const formData = new FormData();
        formData.append('file', this.selectedInstructorVideo);
    
        this.http.post<any>(`http://localhost:8080/course/${this.courseId}/preview-video`, formData).subscribe({
            next: (res) => {
                // Ép reload bằng cách thêm timestamp
                const timestamp = new Date().getTime();
                this.instructorVideoUrl = res.data + '?t=' + timestamp;

                // Nếu bạn dùng ChangeDetectorRef thì vẫn giữ lại
                this.cdr.detectChanges();

                // Ép render lại bằng cách bật tắt video (nếu cần)
                this.showInstructorVideo = false;
                setTimeout(() => {
                    this.showInstructorVideo = true;
                }, 50);

                this.isUploadingInstructorVideo = false;

            },
            error: (err) => {
              console.error('Upload video error:', err);
              this.isUploadingInstructorVideo = false;
            }
          });
      }
}
export interface Category {
    id: number;
    name: string;
}

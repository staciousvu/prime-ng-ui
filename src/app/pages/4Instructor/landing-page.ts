import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HeaderControlService } from '../service/header.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../service/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Editor } from 'primeng/editor';
import { SelectModule } from 'primeng/select';
import { ClassicEditor } from 'ckeditor5';
import { CKEDITOR_CONFIG } from '../models/ckeditor-config';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
    selector: 'app-edit-course-landing-page',
    standalone: true,
    encapsulation:ViewEncapsulation.None, 
    imports: [RouterModule, FormsModule, CommonModule, Editor, SelectModule,CKEditorModule],
    template: `
        <section class="bg-gradient-to-r from-indigo-50 to-purple-50 w-full">
  <div class="w-full mx-auto bg-white overflow-hidden">
    <!-- Header -->
    <!-- <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">
      <h1 class="text-2xl font-bold">Tạo khóa học mới</h1>
      <p class="text-indigo-100 mt-1">Điền thông tin chi tiết để tạo một khóa học hấp dẫn cho người học của bạn</p>
    </div> -->

    <!-- Form Content -->
    <div class="px-8 py-6 space-y-8 w-full">
      <form class="space-y-8 w-full">
        <!-- Course title section -->
        <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-sm w-full">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Thông tin cơ bản
          </h2>
          
          <div class="space-y-6 w-full">
            <div class="w-full">
              <label for="course-title" class="block text-sm font-medium text-gray-700 mb-1">Tiêu đề khóa học</label>
              <div class="relative rounded-md shadow-sm">
                <input 
                  id="course-title" 
                  type="text" 
                  [(ngModel)]="course.title" 
                  name="title" 
                  placeholder="Nhập tiêu đề khóa học của bạn" 
                  maxlength="60" 
                  class="block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">{{ 60 - (course.title?.length || 0) }}</span>
                </div>
              </div>
              <p class="mt-1 text-xs text-gray-500">Tiêu đề cần thu hút, cung cấp thông tin rõ ràng và được tối ưu hóa cho tìm kiếm</p>
            </div>

            <div>
              <label for="course-subtitle" class="block text-sm font-medium text-gray-700 mb-1">Phụ đề khóa học</label>
              <div class="relative rounded-md shadow-sm">
                <input
                  id="course-subtitle"
                  type="text"
                  [(ngModel)]="course.subtitle"
                  name="subtitle"
                  placeholder="Nhập phụ đề khóa học của bạn"
                  maxlength="120"
                  class="block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">{{ 120 - (course.subtitle?.length || 0) }}</span>
                </div>
              </div>
              <p class="mt-1 text-xs text-gray-500">Sử dụng 1-2 từ khóa và đề cập đến 3-4 lĩnh vực quan trọng của khóa học</p>
            </div>

            <div class="w-full">
              <label for="course-description" class="block text-sm font-medium text-gray-700 mb-1">Mô tả khóa học</label>
              <div class="w-full border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-indigo-500">
                <!-- <p-editor 
                  [(ngModel)]="course.description" 
                  name="description" 
                  [style]="{ height: '250px', fontSize: '15px' }"
                  styleClass="rounded-md overflow-hidden"
                >
                  <ng-template #header>
                    <div class="bg-gray-50 border-b border-gray-200 p-2 flex space-x-2">
                      <span class="ql-formats">
                        <button type="button" class="ql-bold hover:bg-gray-200 rounded p-1" aria-label="Bold"></button>
                        <button type="button" class="ql-italic hover:bg-gray-200 rounded p-1" aria-label="Italic"></button>
                        <button type="button" class="ql-underline hover:bg-gray-200 rounded p-1" aria-label="Underline"></button>
                      </span>
                    </div>
                  </ng-template>
                </p-editor> -->
                <ckeditor class="w-full" [editor]="Editor" [(ngModel)]="course.description" [config]="config"></ckeditor>
              </div>
              <p class="mt-1 text-xs text-gray-500">Mô tả phải có ít nhất 200 từ để giới thiệu đầy đủ về khóa học của bạn</p>
            </div>
          </div>
        </div>

        <!-- Categories and language -->
        <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
            Phân loại và ngôn ngữ
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="language" class="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
              <select 
                id="language" 
                [(ngModel)]="course.language" 
                name="language" 
                class="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white"
              >
                <option [ngValue]="null" disabled>Chọn ngôn ngữ</option>
                <option *ngFor="let lang of languages" [ngValue]="lang.name">{{ lang.name }}</option>
              </select>
            </div>
            
            <div>
              <label for="level" class="block text-sm font-medium text-gray-700 mb-1">Cấp độ</label>
              <select 
                id="level" 
                [(ngModel)]="course.level" 
                name="level" 
                class="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white"
              >
                <option [ngValue]="null" disabled>Chọn cấp độ</option>
                <option *ngFor="let lvl of levels" [ngValue]="lvl.value">{{ lvl.name }}</option>
              </select>
            </div>
            
            <div>
              <label for="root-category" class="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
              <select 
                id="root-category" 
                [(ngModel)]="selectedRoot" 
                (ngModelChange)="onRootChange()" 
                name="rootCategory" 
                class="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white"
              >
                <option [ngValue]="null" disabled>Chọn danh mục</option>
                <option *ngFor="let cat of rootCategories; trackBy: trackById" [ngValue]="cat">{{ cat.name }}</option>
              </select>
            </div>
            
            <div>
              <label for="sub-category" class="block text-sm font-medium text-gray-700 mb-1">Danh mục con</label>
              <select  
                id="sub-category" 
                [(ngModel)]="selectedSub" 
                (ngModelChange)="onSubChange()" 
                [disabled]="!selectedRoot" 
                name="subCategory" 
                class="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option [ngValue]="null" disabled>Chọn danh mục con</option>
                <option *ngFor="let sub of subCategories; trackBy: trackById" [ngValue]="sub">{{ sub.name }}</option>
              </select>
            </div>
            
            <div>
              <label for="topic" class="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
              <select 
                id="topic" 
                [(ngModel)]="selectedTopic" 
                [disabled]="!selectedSub" 
                name="topic" 
                class="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option [ngValue]="null" disabled>Chọn chủ đề</option>
                <option *ngFor="let topic of topics; trackBy: trackById" [ngValue]="topic">{{ topic.name }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Media uploads -->
        <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
            Hình ảnh và video
          </h2>
          
          <!-- Course image upload -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex flex-col space-y-4">
              <div class="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-64 bg-gray-50">
                <img *ngIf="instructorImageUrl; else placeholderImage" [src]="instructorImageUrl" alt="Course Image" class="max-w-full max-h-full object-contain" />
                <ng-template #placeholderImage>
                  <div class="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-500">Chưa có hình ảnh</p>
                  </div>
                </ng-template>
              </div>
            
              <div>
                <h3 class="text-sm font-medium text-gray-700">Hình ảnh khóa học</h3>
                <p class="text-xs text-gray-500 mt-1">
                  Tải lên hình ảnh khóa học. Kích thước tốt nhất là 750x422 pixels; Định dạng .jpg, .jpeg, .gif, hoặc .png.
                </p>
                <div class="mt-2">
                  <input 
                    type="file" 
                    accept="image/*" 
                    (change)="onInstructorImageSelected($event)"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
                <div *ngIf="isUploadingInstructorImage" class="mt-2 flex items-center text-sm text-indigo-600">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang tải hình ảnh...
                </div>
              </div>
            </div>
            
            <!-- Course video upload -->
            <div class="flex flex-col space-y-4">
              <div class="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-64 bg-gray-50">
                <video *ngIf="showInstructorVideo" class="max-w-full max-h-full object-contain" controls>
                  <source [src]="instructorVideoUrl" type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ thẻ video.
                </video>
                <div *ngIf="!showInstructorVideo" class="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p class="mt-2 text-sm text-gray-500">Chưa có video</p>
                </div>
              </div>
            
              <div>
                <h3 class="text-sm font-medium text-gray-700">Video khóa học</h3>
                <p class="text-xs text-gray-500 mt-1">
                  Tải lên video giới thiệu khóa học. Định dạng khuyến nghị: .mp4, .mov, .avi. Dung lượng tối đa: 500MB.
                </p>
                <div class="mt-2">
                  <input 
                    type="file" 
                    accept="video/*" 
                    (change)="onInstructorVideoSelected($event)"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
                <div *ngIf="isUploadingInstructorVideo" class="mt-2 flex items-center text-sm text-indigo-600">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang tải video...
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Form actions -->
        <div class="flex justify-end pt-6 border-t border-gray-200">
          <!-- <button 
            type="button" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Lưu bản nháp
          </button> -->
          
          <div class="flex space-x-3">
            <!-- <button 
              type="button" 
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Xem trước
            </button> -->
            
            <button 
              type="button" (click)="save()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
              Lưu
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
    `,
    styles: `
/* Style cho PrimeNG Editor */
  :host ::ng-deep .p-editor-container {
    border-radius: 0.375rem;
    overflow: hidden;
  }
  
  :host ::ng-deep .p-editor-toolbar {
    background-color: #f9fafb !important;
    border-bottom: 1px solid #e5e7eb !important;
    padding: 0.5rem !important;
  }
  
  :host ::ng-deep .p-editor-content {
    font-size: 0.875rem !important;
    min-height: 200px;
  }
  
  :host ::ng-deep .ql-toolbar button {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
  }
  
  :host ::ng-deep .ql-toolbar button:hover {
    background-color: #e5e7eb;
  }
  
  /* Hiệu ứng khi tải file */
  .file-input-animate {
    position: relative;
    overflow: hidden;
  }
  
  .file-input-animate::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

    `
})
export class EditCourseLandingPageComponent implements OnInit, OnDestroy {
  public Editor = ClassicEditor;
  public config = CKEDITOR_CONFIG;

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
        // this.headerService.setControls([
        //     {
        //         type: 'button',
        //         label: 'Save',
        //         action: () => this.save(),
        //         disabled: false
        //     },
        //     {
        //         type: 'button',
        //         label: 'Continue',
        //         action: () => console.log('heelo'),
        //         disabled: false
        //     }
        // ]);
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

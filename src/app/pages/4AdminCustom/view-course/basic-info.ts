import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Editor } from 'primeng/editor';
@Component({
    selector: 'app-view-course-info',
    standalone: true,
    imports: [Editor,
        CommonModule,FormsModule,InputTextModule // Only need CommonModule for basic Angular directives
    ],
    template: `
    <div *ngIf="loading">Loading course data...</div>
    <div *ngIf="!loading" class="flex flex-col md:flex-row gap-2">
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-5">
                <div class="font-semibold text-xl">Course Details</div>
                <div class="flex flex-col gap-2">
                    <label>Course title</label>
                    <input pInputText type="text" [(ngModel)]="course.title" readonly />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Course subtitle</label>
                    <input pInputText type="text" [(ngModel)]="course.subtitle" readonly />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Description</label>
                    <!-- <input pInputText type="text" [(ngModel)]="course.description" readonly /> -->
                    <p-editor [(ngModel)]="course.description" [style]="{ height: '320px' }" [readonly]="true"/>
                </div>
                <div class="flex flex-col gap-2">
                    <label>Category</label>
                    <input pInputText type="text" [value]="selectedRoot?.name" readonly />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Subcategory</label>
                    <input pInputText type="text" [value]="selectedSub?.name" readonly />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Topic</label>
                    <input pInputText type="text" [value]="selectedTopic?.name" readonly />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Language</label>
                    <input pInputText type="text" [(ngModel)]="course.language" readonly />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Price</label>
                    <input pInputText type="text" [value]="course.price | currency" readonly />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Level</label>
                    <input pInputText type="text" [(ngModel)]="course.level" readonly />
                </div>
            </div>
        </div>
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Course Image</div>
                <div *ngIf="previewUrl" class="grid grid-cols-12 gap-2">
                    <div class="col-span-12 flex justify-center">
                        <img [src]="previewUrl" alt="Course Image" class="w-100 rounded-lg shadow-lg border" />
                    </div>
                </div>
                <div *ngIf="!previewUrl">
                    <p>No image available</p>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Course Video</div>
                <div *ngIf="videoUrl" class="grid grid-cols-12 gap-2">
                    <div class="col-span-12 flex justify-center">
                        <video [src]="videoUrl" controls class="w-100 rounded-lg shadow-lg border"></video>
                    </div>
                </div>
                <div *ngIf="!videoUrl">
                    <p>No video available</p>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: `
    label {
        font-weight: bold;
    }
    p {
        margin: 0;
    }
    `
})
export class ViewCourseInfoComponent implements OnChanges {
    @Input() courseId: number | undefined;
    loading = false;
    course: any = {};
    selectedRoot: any = null;
    selectedSub: any = null;
    selectedTopic: any = null;
    previewUrl: any;
    videoUrl: any;

    constructor(private http: HttpClient) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['courseId'] && this.courseId) {
            this.loading = true;
            this.http.get<any>(`http://localhost:8080/course/basicinfo/${this.courseId}`).subscribe(
                (response) => {
                    this.course = response.data;
                    this.previewUrl = this.course.previewUrl;
                    this.videoUrl = this.course.videoUrl;
                    this.loading = false;
                    if (this.course.categoryId) {
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

    loadCategoryHierarchy(topicId: number) {
        this.http.get<any>(`http://localhost:8080/categories/hierarchy?topicId=${topicId}`).subscribe((res) => {
            const categories = res.data;
            this.selectedRoot = categories[0] || null;
            this.selectedSub = categories[1] || null;
            this.selectedTopic = categories[2] || null;
        });
    }
}
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

// Định nghĩa interface cho dữ liệu API
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

export interface CourseSectionLectureResponse {
    courseId: number;
    totalSections: number;
    totalLectures: number;
    duration: number;
    sections: SectionResponse[];
}

export interface SectionResponse {
    id?: number;
    title: string;
    description?: string;
    displayOrder?: number;
    totalLectures: number;
    lectures: LectureResponse[];
}

export interface LectureResponse {
    id?: number;
    title: string;
    type?: string;
    contentUrl?: string | null;
    displayOrder?: number;
    duration?: number;
}

@Component({
    selector: 'app-view-curriculum',
    standalone: true,
    imports: [CommonModule, AccordionModule],
    template: `
        <!-- Thông tin tổng quan -->
        <div class="flex flex-wrap gap-4 items-center mt-4 text-gray-700 text-sm md:text-base">
            <div class="flex items-center gap-2">
                <i class="pi pi-list text-blue-500"></i>
                <span>{{infoCourse?.totalSections}} Sections</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="pi pi-video text-green-500"></i>
                <span>{{infoCourse?.totalLectures}} Lectures</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="pi pi-clock text-orange-500"></i>
                <span>{{infoCourse?.duration}} giờ</span>
            </div>
        </div>

        <!-- Danh sách sections với accordion -->
        <div class="p-6 bg-gray-50 min-h-screen">
            <p-accordion [multiple]="true">
                <p-accordionTab *ngFor="let section of sections; let sectionIndex = index"
                                [header]="'Section ' + (sectionIndex + 1) + ': ' + section.title" class="text-lg">
                    <!-- Danh sách lectures -->
                    <div class="p-4">
                        <div *ngFor="let lecture of section.lectures; let lectureIndex = index"
                             class="mb-3 p-3 border rounded-lg bg-gray-100">
                            <div class="text-md font-medium">
                                <span>Lecture {{ lectureIndex + 1 }}: {{ lecture.title }}</span>
                            </div>
                            <!-- Hiển thị video nếu có contentUrl -->
                            <div *ngIf="lecture.contentUrl" class="flex justify-center items-center mt-4">
                                <video [src]="lecture.contentUrl" controls class="w-1/4 md:w-1/2 rounded-lg shadow-lg border"></video>
                            </div>
                        </div>
                    </div>
                </p-accordionTab>
            </p-accordion>
        </div>
    `,
    styles: [`
        :host {
            display: block;
        }
        .pi {
            font-size: 1.2rem;
        }

    `]
})
export class ViewCurriculumComponent implements OnChanges {
    @Input() courseId: number | undefined;
    sections: SectionResponse[] = [];
    infoCourse: CourseSectionLectureResponse | undefined;

    constructor(
        private http: HttpClient,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['courseId'] && this.courseId) {
            this.loadCourseData();
        }
    }

    private loadCourseData(): void {
        this.http.get<ApiResponse<CourseSectionLectureResponse>>(`http://localhost:8080/course/${this.courseId}/sections-lectures`)
            .subscribe({
                next: (response) => {
                    this.infoCourse = response.data;
                    this.sections = response.data.sections;
                    this.cdr.detectChanges();
                },
                error: (err) => console.error('Error loading course data:', err)
            });
    }
}
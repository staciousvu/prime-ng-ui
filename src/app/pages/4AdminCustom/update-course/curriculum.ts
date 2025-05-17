import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
    isUploading?: boolean;
    documentUrl?:string | null;
    isUploadingDocument?:boolean;
    previewable?:boolean;
}
@Component({
    selector: 'app-update-curriculum',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, FileUploadModule,ProgressSpinnerModule],
    template: `
    <div class="flex flex-wrap gap-4 items-center mt-4 text-gray-700 text-sm md:text-base">
    <div class="flex items-center gap-2">
        <i class="pi pi-list text-blue-500"></i>
        <span>{{infoCourse.totalSections}} Sections</span>
    </div>
    <div class="flex items-center gap-2">
        <i class="pi pi-video text-green-500"></i>
        <span>{{infoCourse.totalLectures}} Lectures</span>
    </div>
    <div class="flex items-center gap-2">
        <i class="pi pi-clock text-orange-500"></i>
        <span>{{infoCourse.duration}} giờ</span>
    </div>
</div>

        <div class="p-6 bg-gray-50 min-h-screen">
            <!-- Sections -->
            <div *ngFor="let section of sections; let sectionIndex = index" class="mb-4 p-4 bg-white shadow rounded-lg border border-gray-200">
                <!-- Section Header -->
                <div class="flex justify-between items-center mb-3">
                    <div *ngIf="editingSectionIndex !== sectionIndex" class="text-lg font-semibold">
                        <span>Section {{ sectionIndex + 1 }}: {{ section.title }}</span>
                    </div>
                    <div class="space-x-2" *ngIf="editingSectionIndex !== sectionIndex">
                        <p-button icon="pi pi-pencil" class="btn-edit" (click)="startEditSection(sectionIndex)" />
                        <p-button icon="pi pi-trash" class="btn-delete" (click)="deleteSection(sectionIndex, section.id)" />
                    </div>
                    <div *ngIf="editingSectionIndex === sectionIndex" class="flex items-center gap-2 w-full">
                        <input pInputText [(ngModel)]="editedSectionTitle" placeholder="Enter section title" class="input-text w-full" />
                        <p-button icon="pi pi-save" class="btn-save" (click)="saveEditedSection(sectionIndex, section.id)" />
                        <p-button icon="pi pi-times" class="btn-cancel" (click)="cancelEditSection()" />
                    </div>
                </div>

                <!-- Lectures -->
                <div class="p-4 bg-white shadow rounded-lg border border-gray-200">
                    <!-- <h3 class="text-lg font-semibold mb-3">Lectures</h3> -->
                    <div *ngFor="let lecture of section.lectures; let lectureIndex = index" class="mb-3 p-3 border rounded-lg bg-gray-100">
                        <div class="flex justify-between items-center">
                            <div *ngIf="editingLectureIndex !== lectureIndex || currentSectionIndex !== sectionIndex" class="text-md font-medium">
                                <span>Lecture {{ lectureIndex + 1 }}: {{ lecture.title }}</span>
                            </div>
                            <div class="space-x-2" *ngIf="editingLectureIndex !== lectureIndex || currentSectionIndex !== sectionIndex">
                                <p-button icon="pi pi-pencil" class="btn-edit" (click)="startEditLecture(sectionIndex, lectureIndex)" />
                                <p-button icon="pi pi-trash" class="btn-delete" (click)="deleteLecture(sectionIndex, lectureIndex, lecture.id)" />
                            </div>
                            <div *ngIf="editingLectureIndex === lectureIndex && currentSectionIndex === sectionIndex" class="flex items-center gap-2 w-full">
                                <input pInputText [(ngModel)]="editedLectureTitle" placeholder="Enter lecture title" class="input-text w-full" />
                                <p-button icon="pi pi-save" class="btn-save" (click)="saveEditedLecture(sectionIndex, lectureIndex, lecture.id)" />
                                <p-button icon="pi pi-times" class="btn-cancel" (click)="cancelEditLecture()" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 mt-2">
                            <p-fileUpload name="videoUpload" mode="basic" accept="video/*" (onSelect)="onVideoSelected($event, sectionIndex, lectureIndex, lecture.id)" chooseLabel="Choose Video" />
                            <!--  -->
                                <div class="col-span-12 flex justify-center" *ngIf="lecture.isUploading">
                                    <p-progressSpinner strokeWidth="4"></p-progressSpinner>
                                </div>

                                <!--  -->
                                <div *ngIf="lecture.contentUrl && !lecture.isUploading" class="flex justify-center items-center mt-4">
                                    <video [src]="lecture.contentUrl" controls class="w-1/6 md:w-1/4 rounded-lg shadow-lg border"></video>
                                </div>

                                <!--  -->

                            <!--  -->

                        </div>
                    </div>
                    <p-button label="Add Lecture" icon="pi pi-plus" class="btn-add" (click)="startAddingLecture(sectionIndex)" />
                    <div *ngIf="isAddingLecture && currentSectionIndex === sectionIndex" class="mt-3 flex items-center gap-2">
                        <input pInputText [(ngModel)]="newLectureTitle" placeholder="Enter lecture title haha.." class="input-text w-full" />
                        <p-button icon="pi pi-save" class="btn-save" (click)="saveLecture(section.id)" />
                    </div>
                </div>
            </div>

            <!-- Add New Section -->
            <div class="mt-6">
                <p-button label="Add Section" icon="pi pi-plus" class="btn-add" (click)="startAddingSection()" />
                <div *ngIf="isAddingSection" class="mt-3 flex items-center gap-2">
                    <input pInputText [(ngModel)]="newSectionTitle" placeholder="Enter section title" class="input-text w-full" />
                    <p-button icon="pi pi-save" class="btn-save" (click)="saveSection()" />
                </div>
            </div>
        </div>
    `
})
export class UpdateCurriculumComponent implements OnChanges {
    @Input() courseId: number | undefined;
    sections: SectionResponse[] = [];

    // Trạng thái thêm section
    isAddingSection = false;
    newSectionTitle = '';

    // Trạng thái chỉnh sửa section
    editingSectionIndex: number | null = null;
    editedSectionTitle = '';

    // Trạng thái thêm/chỉnh sửa lecture
    currentSectionIndex: number | null = null;
    isAddingLecture = false;
    newLectureTitle = '';
    editingLectureIndex: number | null = null;
    editedLectureTitle = '';

    constructor(
        private http: HttpClient,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['courseId'] && this.courseId) {
            this.loadCourseData();
        }
    }
    infoCourse:any;

    private loadCourseData(): void {
        this.http.get<ApiResponse<CourseSectionLectureResponse>>(`http://localhost:8080/course/${this.courseId}/sections-lectures`).subscribe({
            next: (response) => {
                this.infoCourse =response.data;
                this.sections = response.data.sections.map((section) => ({
                    ...section,
                    lectures: section.lectures.map((lecture) => ({ ...lecture, contentUrl: lecture.contentUrl || null, isUploading: false }))
                }));
            },
            error: (err) => console.error('Error loading course data:', err)
        });
    }

    // Section Management
    startAddingSection(): void {
        this.isAddingSection = true;
    }

    saveSection(): void {
        if (this.newSectionTitle.trim()) {
            const requestBody = {
                title: this.newSectionTitle,
                courseId: this.courseId
            };
            this.http.post<any>(`http://localhost:8080/section/create`, requestBody).subscribe((response) => {
                this.sections.push({id:response.data.id, title: this.newSectionTitle, totalLectures: 0, lectures: [] });
                this.newSectionTitle = '';
                this.isAddingSection = false;

                this.cdr.detectChanges();
            });
        }
    }

    startEditSection(sectionIndex: number): void {
        this.editingSectionIndex = sectionIndex;
        this.editedSectionTitle = this.sections[sectionIndex].title;
    }

    saveEditedSection(sectionIndex: number, sectionId?: number): void {
        if (this.editedSectionTitle.trim()) {
            const requestBody = {
                title: this.editedSectionTitle,
                courseId: this.courseId
            };
            this.http.put<any>(`http://localhost:8080/section/edit/${sectionId}`, requestBody).subscribe((response) => {
                console.log(this.sections[sectionIndex].title);
                this.sections[sectionIndex].title = this.editedSectionTitle;
                console.log(this.sections[sectionIndex].title);

                this.editingSectionIndex = null;
                this.editedSectionTitle = '';

                this.cdr.detectChanges();
            });
        }
    }

    cancelEditSection(): void {
        this.editingSectionIndex = null;
        this.editedSectionTitle = '';
    }

    deleteSection(sectionIndex: number, sectionId?: number): void {
        this.http.delete<any>(`http://localhost:8080/section/delete/${sectionId}`).subscribe((res) => {
            this.sections.splice(sectionIndex, 1);
        });
    }

    // Lecture Management
    startAddingLecture(sectionIndex: number): void {
        this.currentSectionIndex = sectionIndex;
        this.isAddingLecture = true;
    }

    saveLecture(sectionId?: number): void {
        console.log('sectionidddddddddddddd:',sectionId);
        if (this.newLectureTitle.trim() && this.currentSectionIndex !== null) {
            const sectionIndex = this.currentSectionIndex;
            const requestBody = {
                title: this.newLectureTitle,
                sectionId: sectionId
            };
            this.http.post<{ id: number }>(`http://localhost:8080/lecture/create`, requestBody).subscribe({
                next: (response) => {
                    const newLecture: LectureResponse = {
                        id: response.id,
                        title: this.newLectureTitle,
                        contentUrl: null
                    };
                    this.sections[sectionIndex].lectures.push(newLecture);
                    this.sections[sectionIndex].totalLectures++;
                    this.newLectureTitle = '';
                    this.isAddingLecture = false;
                    this.currentSectionIndex = null;
                    this.cdr.detectChanges();
                },
                error: (err) => console.error('Error creating lecture:', err)
            });
        }
    }

    startEditLecture(sectionIndex: number, lectureIndex: number): void {
        this.currentSectionIndex = sectionIndex;
        this.editingLectureIndex = lectureIndex;
        this.editedLectureTitle = this.sections[sectionIndex].lectures[lectureIndex].title;
    }

    saveEditedLecture(sectionIndex: number, lectureIndex: number, lectureId?: number): void {
        if (this.editedLectureTitle.trim()) {
            const requestBody = {
                title: this.editedLectureTitle
            };
            console.log(requestBody);
            this.http.put<any>(`http://localhost:8080/lecture/edit/${lectureId}`, requestBody).subscribe({
                next: (response) => {
                    this.sections[sectionIndex].lectures[lectureIndex].title = this.editedLectureTitle;
                    this.editingLectureIndex = null;
                    this.editedLectureTitle = '';
                    this.currentSectionIndex = null;

                    this.cdr.detectChanges();
                },
                error: (err) => console.error('Error creating lecture:', err)
            });
        }
    }

    cancelEditLecture(): void {
        this.editingLectureIndex = null;
        this.editedLectureTitle = '';
        this.currentSectionIndex = null;
    }

    deleteLecture(sectionIndex: number, lectureIndex: number, lectureId?: number): void {
        this.http.delete<any>(`http://localhost:8080/lecture/${lectureId}`).subscribe((res) => {
            this.sections[sectionIndex].lectures.splice(lectureIndex, 1);
            this.sections[sectionIndex].totalLectures--;

            this.cdr.detectChanges();
        });
    }

    // Video Upload
    onVideoSelected(event: any, sectionIndex: number, lectureIndex: number, lectureId?: number): void {
        console.log('hello upload')
        const file = event.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'VIDEO');
            if (lectureId !== undefined) {
                formData.append('lectureId', lectureId.toString());
            }
            this.sections[sectionIndex].lectures[lectureIndex].isUploading = true;
            this.http.post<any>('http://localhost:8080/lecture/upload', formData).subscribe({
                next: (res) => {
                    console.log('upload thanh cong')
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const url = e.target?.result as string;
                        this.sections[sectionIndex].lectures[lectureIndex].contentUrl = url;
                        this.sections[sectionIndex].lectures[lectureIndex].isUploading = false;
                    };
                    reader.readAsDataURL(file);
                },
                error: (err) => {
                    console.error('Lỗi upload:', err);
                    alert('Upload thất bại, vui lòng thử lại!');
                    this.sections[sectionIndex].lectures[lectureIndex].isUploading = false;
                    console.log('upload that bai')
                }
            });
        }
    }
}

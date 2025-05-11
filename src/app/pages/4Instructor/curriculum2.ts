import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { SectionResponse, ApiResponse, CourseSectionLectureResponse, LectureResponse } from "../4AdminCustom/update-course/curriculum";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from "primeng/fileupload";
import { ActivatedRoute } from "@angular/router";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ToastService } from "../service/toast.service";



@Component({
    selector: 'app-edit-course-curriculum2',
    standalone:true,
    encapsulation:ViewEncapsulation.None,
    imports:[ButtonModule,CommonModule,FormsModule,FileUploadModule,ProgressSpinnerModule ],
    template: `
    <section class="bg-white flex-grow w-full min-w-0 border-l border-r border-[#E2E8F0] pb-14" aria-label="Intended learners">

    <div class="px-10 pt-0 space-y-8 text-[#334155] text-lg font-normal w-full">
    <div class=" min-h-screen">
            <!-- Sections -->
            <div *ngFor="let section of sections; let sectionIndex = index" class="mb-4 p-4 bg-white shadow rounded-lg border border-gray-200">
                <!-- Section Header -->
                <div class="flex justify-between items-center mb-3">
                    <div *ngIf="editingSectionIndex !== sectionIndex" class="text-lg font-semibold">
                        <span>Section {{ sectionIndex + 1 }}: {{ section.title }}</span>
                    </div>
                    <div class="flex space-x-2" *ngIf="editingSectionIndex !== sectionIndex">
                    <button (click)="startEditSection(sectionIndex)" type="button"
                        class="flex items-center space-x-2 rounded-md border border-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-semibold text-base px-4 py-3 transition">
                        <i class="pi pi-pencil text-lg"></i>
                        <!-- <span>Edit</span> -->
                    </button>

                    <button (click)="deleteSection(sectionIndex, section.id)" type="button"
                        class="flex items-center space-x-2 rounded-md border border-red-600 bg-white hover:bg-red-50 active:bg-red-100 text-red-700 font-semibold text-base px-4 py-3 transition">
                        <i class="pi pi-trash text-lg"></i>
                        <!-- <span>Delete</span> -->
                    </button>

                    </div>
                    <div *ngIf="editingSectionIndex === sectionIndex" class="flex items-center gap-2 w-full">
                    <input [(ngModel)]="editedSectionTitle" placeholder="Enter section title" 
                          type="text"
                          class="w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition" />

                        <button (click)="saveEditedSection(sectionIndex, section.id)" type="button"
                            class="flex items-center space-x-2 rounded-md border border-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-semibold text-base px-4 py-3 transition">
                            <i class="pi pi-save text-lg"></i>
                            <!-- <span>Save</span> -->
                        </button>

                        <button (click)="cancelEditSection()" type="button"
                            class="flex items-center space-x-2 rounded-md border border-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold text-base px-4 py-3 transition">
                            <i class="pi pi-times text-lg"></i>
                            <!-- <span>Cancel</span> -->
                        </button>

                    </div>
                </div>

                <!-- Lectures -->
                <div class="p-4 bg-white">
                    <!-- <h3 class="text-lg font-semibold mb-3">Lectures</h3> -->
                    <div *ngFor="let lecture of section.lectures; let lectureIndex = index" class="mb-3 bg-white">
                        <div class="flex justify-between items-center">
                            <div *ngIf="editingLectureIndex !== lectureIndex || currentSectionIndex !== sectionIndex" class="text-md font-medium">
                                <span>Lecture {{ lectureIndex + 1 }}: {{ lecture.title }}</span>
                            </div>
                            <div class="flex space-x-2" *ngIf="editingLectureIndex !== lectureIndex || currentSectionIndex !== sectionIndex">
                            <button (click)="startEditLecture(sectionIndex, lectureIndex)" type="button"
                                class="flex items-center space-x-2 rounded-md border border-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-semibold text-base px-4 py-3 transition">
                                <i class="pi pi-pencil text-lg"></i>
                                <!-- <span>Edit</span> -->
                            </button>

                            <button (click)="deleteLecture(sectionIndex, lectureIndex, lecture.id)" type="button"
                                class="flex items-center space-x-2 rounded-md border border-red-600 bg-white hover:bg-red-50 active:bg-red-100 text-red-700 font-semibold text-base px-4 py-3 transition">
                                <i class="pi pi-trash text-lg"></i>
                                <!-- <span>Delete</span> -->
                            </button>

                            </div>
                            <div *ngIf="editingLectureIndex === lectureIndex && currentSectionIndex === sectionIndex" class="flex items-center gap-2 w-full">
                            <input [(ngModel)]="editedLectureTitle" placeholder="Enter lecture title"
                                    type="text"
                                    class="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition" />
                                <button (click)="saveEditedLecture(sectionIndex, lectureIndex, lecture.id)" type="button"
                                    class="flex items-center space-x-2 rounded-md border border-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-semibold text-base px-4 py-3 transition">
                                    <i class="pi pi-save text-lg"></i>
                                    <!-- <span>Save</span> -->
                                </button>

                                <button (click)="cancelEditLecture()" type="button"
                                    class="flex items-center space-x-2 rounded-md border border-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold text-base px-4 py-3 transition">
                                    <i class="pi pi-times text-lg"></i>
                                    <!-- <span>Cancel</span> -->
                                </button>

                            </div>
                        </div>
                        <div class="flex flex-col gap-2 mt-2">
                        <label
                            class="flex items-center space-x-2 rounded-md border border-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-semibold text-base px-4 py-2 cursor-pointer transition">
                            <i class="pi pi-upload text-lg"></i>
                            <span>Choose Video</span>
                            <input type="file" accept="video/*" (change)="onVideoSelected($event, sectionIndex, lectureIndex, lecture.id)" class="hidden" />
                        </label>

                            <!-- <p-fileUpload name="videoUpload" mode="basic" accept="video/*" (onSelect)="onVideoSelected($event, sectionIndex, lectureIndex, lecture.id)" chooseLabel="Choose Video" /> -->
                            <!--  -->
                                <div class="col-span-12 flex justify-center" *ngIf="lecture.isUploading">
                                    <p-progress-spinner strokeWidth="8" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />
                                </div>

                                <!--  -->
                                <div *ngIf="lecture.contentUrl && !lecture.isUploading" class="flex justify-center items-center mt-4">
                                    <video [src]="lecture.contentUrl" controls class="w-1/3 md:w-1/3 rounded-lg shadow-lg border"></video>
                                </div>

                                <!--  -->

                            <!--  -->

                        </div>
                    </div>
                    <button (click)="startAddingLecture(sectionIndex)" type="button"
                        class="flex items-center space-x-2 rounded-md border border-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-semibold text-base px-4 py-2 transition">
                        <i class="pi pi-plus text-lg"></i>
                        <span>Lecture</span>
                    </button>
                    <div *ngIf="isAddingLecture && currentSectionIndex === sectionIndex" class="mt-3 flex items-center gap-2">
                    <input [(ngModel)]="newLectureTitle" placeholder="Enter lecture title"
                            type="text"
                            class="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition" />
                        <button (click)="saveLecture(section.id)" type="button"
                            class="flex items-center space-x-2 rounded-md border border-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-semibold text-base px-4 py-3 transition">
                            <i class="pi pi-save text-lg"></i>
                            <!-- <span>Save</span> -->
                        </button>

                    </div>
                </div>
            </div>

            <!-- Add New Section -->
            <div class="mt-6">
            <button (click)="startAddingSection()" type="button"
                class="flex items-center space-x-2 rounded-md border border-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 px-4 py-2 text-blue-700 font-semibold text-base transition">
                <i class="fas fa-plus text-lg"></i>
                <span>Section</span>
            </button>

                <!-- <p-button label="Add Section" icon="pi pi-plus" class="btn-add" (click)="startAddingSection()" /> -->
                <div *ngIf="isAddingSection" class="mt-3 flex items-center gap-2">
                <input [(ngModel)]="newSectionTitle" placeholder="Enter section title"
                            type="text"
                            class="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition" />
                    <button (click)="saveSection()" type="button"
                        class="flex items-center space-x-2 rounded-md border border-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-semibold text-base px-4 py-3 transition">
                        <i class="pi pi-save text-lg"></i>
                        <!-- <span>Save</span> -->
                    </button>

                </div>
            </div>
        </div>


    </div>
  </section>
    `,
    styles: `


    `
})
export class EditCourseCurriculum2Component implements OnInit {
  courseId: number = 0;
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
      private cdr: ChangeDetectorRef,
      private route:ActivatedRoute,
      private toastService:ToastService
  ) {}
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.courseId = +params.get('id')!;
  });
  this.loadCourseData();
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
              console.log(this.sections)
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
              this.toastService.addToast("success","Thêm section thành công")
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
              this.toastService.addToast("success","Chỉnh sửa section thành công")
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
          this.toastService.addToast("success","Xóa section thành công")
      });
  }

  // Lecture Management
  startAddingLecture(sectionIndex: number): void {
      this.currentSectionIndex = sectionIndex;
      this.isAddingLecture = true;
  }

  saveLecture(sectionId?: number): void {
    console.log('sectioniddddddddd:',sectionId);
      if (this.newLectureTitle.trim() && this.currentSectionIndex !== null) {
          const sectionIndex = this.currentSectionIndex;
          const requestBody = {
              title: this.newLectureTitle,
              sectionId: sectionId
          };
          this.http.post<any>(`http://localhost:8080/lecture/create`, requestBody).subscribe({
              next: (response) => {
                  const newLecture: LectureResponse = {
                      id: response.data.id,
                      title: this.newLectureTitle,
                      contentUrl: null
                  };
                  console.log('new lecture:',newLecture)
                  this.sections[sectionIndex].lectures.push(newLecture);
                  console.log('this section..... lectures',this.sections[sectionIndex].lectures)
                  this.sections[sectionIndex].totalLectures++;
                  this.toastService.addToast("success","Thêm bài giảng thành công")
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
                  this.toastService.addToast("success","Sửa bài giảng thành công")
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
          this.toastService.addToast("success","Xóa bài giảng thành công")
          this.cdr.detectChanges();
      });
  }

  // Video Upload
  onVideoSelected(event: any, sectionIndex: number, lectureIndex: number, lectureId?: number): void {
      console.log('hello upload')
      const file = event.target.files[0];
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
                  this.toastService.addToast("success","Upload video thành công")
              },
              error: (err) => {
                  console.error('Lỗi upload:', err);
                  alert('Upload thất bại, vui lòng thử lại!');
                  this.sections[sectionIndex].lectures[lectureIndex].isUploading = false;
                  console.log('upload that bai')
                  this.toastService.addToast("error","Upload video thất bại,thử lại")
              }
          });
      }
  }
}{

}
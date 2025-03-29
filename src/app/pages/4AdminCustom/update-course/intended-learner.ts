import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

@Component({
    selector: "app-update-intended-learner",
    standalone:true,
    imports:[CommonModule,FormsModule,ButtonModule,InputTextModule],
    template: `
    <!--  -->
    <div class="p-6 bg-gray-50 min-h-screen">
      <h2 class="text-2xl font-semibold mb-4">Course Content</h2>

      <!-- Nếu có content -->
      <div *ngIf="courseContents.length > 0; else noContent">
        <div
          *ngFor="let content of courseContents; let index = index"
          class="mb-3 p-4 bg-white shadow rounded-lg border border-gray-200"
        >
          <div class="flex justify-between items-center">
            <div *ngIf="editingContentIndex !== index" class="text-md font-medium">
              <span>Content {{ index + 1 }}: {{ content.title }}</span>
            </div>
            <div *ngIf="editingContentIndex !== index" class="space-x-2">
              <p-button icon="pi pi-pencil" class="btn-edit" (click)="startEditContent(index)" />
              <p-button icon="pi pi-trash" class="btn-delete" (click)="deleteContent(content.id, index)" />
            </div>
            <div *ngIf="editingContentIndex === index" class="flex items-center gap-2 w-full">
              <input pInputText [(ngModel)]="editedContentTitle" placeholder="Enter content title" class="input-text w-full" />
              <p-button icon="pi pi-save" class="btn-save" (click)="saveEditedContent(index, content.id)" />
              <p-button icon="pi pi-times" class="btn-cancel" (click)="cancelEditContent()" />
            </div>
          </div>
        </div>
      </div>

      <!-- Nếu không có content -->
      <ng-template #noContent>
        <div class="flex flex-col items-center justify-center mt-10 gap-3">
          <p class="text-gray-500">No course content yet.</p>
          <p-button label="Add Course Content" icon="pi pi-plus" class="btn-add" (click)="startAddingContent()" />
        </div>
      </ng-template>

      <!-- Form thêm Content -->
      <div *ngIf="isAddingContent" class="mt-6 flex items-center gap-2">
        <input pInputText [(ngModel)]="newContentTitle" placeholder="Enter content title" class="input-text w-full" />
        <p-button icon="pi pi-save" class="btn-save" (click)="saveContent()" />
        <p-button icon="pi pi-times" class="btn-cancel" (click)="cancelAddContent()" />
      </div>

      <!-- Nút Add thêm -->
      <div *ngIf="courseContents.length > 0 && !isAddingContent" class="mt-4">
        <p-button label="Add Course Content" icon="pi pi-plus" class="btn-add" (click)="startAddingContent()" />
      </div>
    </div>

      <!--  -->
    `,
})
export class UpdateIntendedLearnerComponent implements OnChanges{
    @Input() courseId: number | undefined;

  courseContents: any[] = [];
  isAddingContent = false;
  editingContentIndex: number | null = null;
  newContentTitle = '';
  editedContentTitle = '';

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && this.courseId) {
      this.loadContents();
    }
  }

  loadContents() {
    this.http.get<any>(`http://localhost:8080/course-content/${this.courseId}`).subscribe(
      (response) => {
        this.courseContents = response.data;
      },
      (error) => {
        console.error('Error loading contents', error);
      }
    );
  }

  startAddingContent() {
    this.isAddingContent = true;
    this.newContentTitle = '';
  }

  cancelAddContent() {
    this.isAddingContent = false;
    this.newContentTitle = '';
  }

  saveContent() {
    if (!this.newContentTitle.trim()) return;

    const body = [{ title: this.newContentTitle }];
    this.http.post(`http://localhost:8080/course-content/${this.courseId}`, body).subscribe(
      () => {
        this.loadContents();
        this.isAddingContent = false;
      },
      (error) => {
        console.error('Error creating content', error);
      }
    );
  }

  startEditContent(index: number) {
    this.editingContentIndex = index;
    this.editedContentTitle = this.courseContents[index].title;
  }

  cancelEditContent() {
    this.editingContentIndex = null;
    this.editedContentTitle = '';
  }

  saveEditedContent(index: number, id: number) {
    if (!this.editedContentTitle.trim()) return;

    const body = [{ id, title: this.editedContentTitle }];
    this.http.put(`http://localhost:8080/course-content/${this.courseId}`, body).subscribe(
      () => {
        this.courseContents[index].title = this.editedContentTitle;
        this.editingContentIndex = null;
      },
      (error) => {
        console.error('Error updating content', error);
      }
    );
  }

  deleteContent(id: number, index: number) {
    this.http.delete(`http://localhost:8080/course-content/${id}`).subscribe(
      () => {
        this.courseContents.splice(index, 1);
      },
      (error) => {
        console.error('Error deleting content', error);
      }
    );
  }
}
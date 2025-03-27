import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

interface Lecture {
  title: string;
}

interface Section {
  title: string;
  lectures: Lecture[];
}

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonModule, FileUploadModule],
  template: `
    <div class="p-4 bg-white shadow rounded-lg border border-gray-200">
      <h3 class="text-lg font-semibold mb-3">Lectures</h3>
      <div *ngFor="let lecture of section.lectures; let i = index" class="mb-3 p-3 border rounded-lg bg-gray-100">
        <div class="flex justify-between items-center">
          <div *ngIf="i !== editingIndex" class="text-md font-medium">
            <span>Lecture {{i+1}}: {{lecture.title}}</span>
          </div>
          <div class="space-x-2" *ngIf="i !== editingIndex">
            <button pButton icon="pi pi-pencil" class="btn-edit" (click)="startEditingLecture(i)"></button>
            <button pButton icon="pi pi-trash" class="btn-delete" (click)="deleteLecture(i)"></button>
          </div>
          <div *ngIf="i === editingIndex" class="flex items-center gap-2 w-full">
            <input [(ngModel)]="newTitle" placeholder="Enter lecture title" class="input-text w-full">
            <button pButton icon="pi pi-save" class="btn-save" (click)="saveEditedLecture(i)"></button>
            <button pButton icon="pi pi-times" class="btn-cancel" (click)="cancelEditingLecture(i)"></button>
          </div>
        </div>
        <!-- <input type="file" class="mt-2 w-full border p-2 rounded"> -->
        <div class="flex flex-col gap-2">
        <p-fileUpload name="videoUpload" mode="basic" accept="video/*" (onSelect)="onVideoSelected($event)" chooseLabel="Choose Video" />
        <div *ngIf="videoUrl" class="flex justify-center items-center mt-4">
  <video [src]="videoUrl" controls class="w-1/4 md:w-1/2 rounded-lg shadow-lg border"></video>
</div>

    </div>
      </div>
      <button pButton label="Add Lecture" icon="pi pi-plus" class="btn-add" (click)="startAddingLecture()"></button>
      <div *ngIf="isAddingLecture" class="mt-3 flex items-center gap-2">
        <input [(ngModel)]="newLectureTitle" placeholder="Enter lecture title" class="input-text w-full">
        <button pButton icon="pi pi-save" class="btn-save" (click)="saveLecture()"></button>
      </div>
    </div>
  `,
  styles: [
    `.btn-edit { @apply bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600; }
     .btn-delete { @apply bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600; }
     .btn-save { @apply bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600; }
     .btn-cancel { @apply bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600; }
    //  .btn-add { @apply bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600; }
     .input-text { @apply border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-indigo-200; }`
  ]
})

export class SectionComponent {
  @Input() section!: Section;
  isAddingLecture: boolean = false;
  newLectureTitle: string = '';
  editingIndex: number | null = null;
  originalTitle: string | null = null;
  newTitle: string = '';

  startAddingLecture() {
    this.isAddingLecture = true;
  }

  saveLecture() {
    if (this.newLectureTitle.trim()) {
      this.section.lectures.push({ title: this.newLectureTitle });
      this.newLectureTitle = '';
      this.isAddingLecture = false;
    }
  }

  startEditingLecture(index: number) {
    this.editingIndex = index;
    this.originalTitle = this.section.lectures[index].title;
    this.newTitle = this.originalTitle;
  }

  saveEditedLecture(index: number) {
    if (this.newTitle.trim()) {
      this.section.lectures[index].title = this.newTitle;
      this.editingIndex = null;
      this.originalTitle = null;
      this.newTitle = '';
    }
  }

  cancelEditingLecture(index: number) {
    this.editingIndex = null;
    this.originalTitle = null;
    this.newTitle = '';
  }

  deleteLecture(index: number) {
    this.section.lectures.splice(index, 1);
  }
  videoUrl: string | ArrayBuffer | null = null;
  onVideoSelected(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.videoUrl = e.target?.result as string | ArrayBuffer;
      reader.readAsDataURL(file);
    }
  }
}
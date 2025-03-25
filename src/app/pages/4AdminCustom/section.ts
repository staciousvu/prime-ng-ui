import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Lecture {
    title: string;
  }
  
  interface Section {
    title: string;
    lectures: Lecture[];
  }
@Component({
  selector: 'app-section',
  imports:[FormsModule,CommonModule],
  template: `
  <div class="section">
  <span>Section: {{section.title}}</span>
  
  <div *ngFor="let lecture of section.lectures; let i = index" class="lecture">
    <div *ngIf="i !== editingIndex">
      <span>Lecture: {{lecture.title}}</span>
      <button (click)="startEditingLecture(i)">Edit</button>
      <button (click)="deleteLecture(i)">Delete</button>
    </div>
    <div *ngIf="i === editingIndex">
      <input [(ngModel)]="newTitle" placeholder="Enter lecture title">
      <button (click)="saveEditedLecture(i)">Save</button>
      <button (click)="cancelEditingLecture(i)">Cancel</button>
    </div>
    <!-- <button (click)="deleteLecture(i)">Delete</button> -->
    <input type="file">
  </div>
  <button (click)="startAddingLecture()">+ Add Lecture</button>
  <div *ngIf="isAddingLecture">
    <input [(ngModel)]="newLectureTitle" placeholder="Enter lecture title">
    <button (click)="saveLecture()">Save</button>
  </div>
</div>




    <!-- <div class="section">
  <h3>Section: {{section.title}}</h3>
  <button (click)="startAddingLecture()">+ Add Lecture</button>
  <div *ngIf="isAddingLecture">
    <input [(ngModel)]="newLectureTitle" placeholder="Enter lecture title">
    <button (click)="saveLecture()">Save</button>
  </div>
  <div *ngFor="let lecture of section.lectures; let i = index" class="lecture">
    <div *ngIf="i !== editingIndex">
      <p>Lecture: {{lecture.title}}</p>
      <button (click)="startEditingLecture(i)">Edit</button>
    </div>
    <div *ngIf="i === editingIndex">
      <input [(ngModel)]="newTitle" placeholder="Enter lecture title">
      <button (click)="saveEditedLecture(i)">Save</button>
      <button (click)="cancelEditingLecture(i)">Cancel</button>
    </div>
    <button (click)="deleteLecture(i)">Delete</button>
    <input type="file">
  </div>
</div> -->
  `,
  styles: [`
    .section {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .lecture {
      background: white;
      padding: 10px;
      border-radius: 5px;
      margin: 5px 0;
    }
    button {
      background: #7c3aed;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      margin-top: 5px;
      cursor: pointer;
    }
    input {
      padding: 5px;
      margin-right: 5px;
    }
  `]
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
      this.section.lectures[index].title = this.newTitle;
      this.editingIndex = null;
      this.originalTitle = null;
      this.newTitle = '';
    }
  
    cancelEditingLecture(index: number) {
      this.section.lectures[index].title = this.originalTitle ?? this.section.lectures[index].title;
      this.editingIndex = null;
      this.originalTitle = null;
      this.newTitle = '';
    }
  
    deleteLecture(index: number) {
      this.section.lectures.splice(index, 1);
    }
}
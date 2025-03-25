import { Component } from '@angular/core';
import { SectionComponent } from "./section";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Lecture {
    title: string;
  }
  
  interface Section {
    title: string;
    lectures: Lecture[];
  }
@Component({
  selector: 'app-curriculum',
  imports: [SectionComponent,FormsModule,CommonModule],
  template: `
  <div *ngFor="let section of sections">
      <app-section [section]="section"></app-section>
    </div>
    <div style="margin-top: 20px;">
    <button (click)="startAddingSection()">+ Add Section</button>

    <div *ngIf="isAddingSection">
      <input [(ngModel)]="newSectionTitle" placeholder="Enter section title">
      <button (click)="saveSection()">Save</button>
    </div> 
</div>
    <!-- <div *ngFor="let section of sections">
      <app-section [section]="section"></app-section>
    </div> -->
  `,
  styles: [`
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
export class CurriculumComponent {
  sections: Section[] = [];
  isAddingSection: boolean = false;
  newSectionTitle: string = '';

  startAddingSection() {
    this.isAddingSection = true;
  }

  saveSection() {
    if (this.newSectionTitle.trim()) {
      this.sections.push({ title: this.newSectionTitle, lectures: [] });
      this.newSectionTitle = '';
      this.isAddingSection = false;
    }
  }
}
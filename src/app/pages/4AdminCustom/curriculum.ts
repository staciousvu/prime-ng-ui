import { Component } from '@angular/core';
import { SectionComponent } from './section';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';

interface Lecture {
    title: string;
}

interface Section {
    title: string;
    lectures: Lecture[];
}

@Component({
    selector: 'app-curriculum',
    standalone: true,
    imports: [FormsModule, CommonModule, ButtonModule, SectionComponent],
    template: `
        <div class="p-6 bg-gray-50 min-h-screen">
            <div *ngFor="let section of sections; let i = index" class="mb-4 p-4 bg-white shadow rounded-lg border border-gray-200">
                <div class="flex justify-between items-center mb-3">
                    <div *ngIf="editingSectionIndex !== i" class="text-lg font-semibold">
                        <span>Section {{ i + 1 }}: {{ section.title }}</span>
                    </div>
                    <div class="space-x-2" *ngIf="editingSectionIndex !== i">
                        <button pButton icon="pi pi-pencil" class="btn-edit" (click)="startEditSection(i)"></button>
                        <button pButton icon="pi pi-trash" class="btn-delete" (click)="deleteSection(i)"></button>
                    </div>
                    <div *ngIf="editingSectionIndex === i" class="flex items-center gap-2 w-full">
                        <input [(ngModel)]="editedSectionTitle" placeholder="Enter section title" class="input-text w-full" />
                        <button pButton icon="pi pi-save" class="btn-save" (click)="saveEditedSection(i)"></button>
                        <button pButton icon="pi pi-times" class="btn-cancel" (click)="cancelEditSection(i)"></button>
                    </div>
                </div>
                <app-section [section]="section"></app-section>
            </div>
            <div class="mt-6">
                <button pButton label="Add Section" icon="pi pi-plus" class="btn-add" (click)="startAddingSection()"></button>
                <div *ngIf="isAddingSection" class="mt-3 flex items-center gap-2">
                    <input [(ngModel)]="newSectionTitle" placeholder="Enter section title" class="input-text w-full" />
                    <button pButton icon="pi pi-save" class="btn-save" (click)="saveSection()"></button>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .btn-edit {
                @apply bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600;
            }
            .btn-delete {
                @apply bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600;
            }
            .btn-save {
                @apply bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600;
            }
            .btn-cancel {
                @apply bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600;
            }
            //  .btn-add { @apply bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600; }
            .input-text {
                @apply border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-indigo-200;
            }
        `
    ]
})
export class CurriculumComponent {
    activeIndex: number | null = null;
    sections: Section[] = [];
    isAddingSection: boolean = false;
    newSectionTitle: string = '';
    editingSectionIndex: number | null = null;
    editedSectionTitle: string = '';

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

    startEditSection(index: number) {
        this.editingSectionIndex = index;
        this.editedSectionTitle = this.sections[index].title;
    }

    saveEditedSection(index: number) {
        if (this.editedSectionTitle.trim()) {
            this.sections[index].title = this.editedSectionTitle;
            this.editingSectionIndex = null;
            this.editedSectionTitle = '';
        }
    }

    cancelEditSection(index: number) {
        this.editingSectionIndex = null;
        this.editedSectionTitle = '';
    }

    deleteSection(index: number) {
        this.sections.splice(index, 1);
    }
}

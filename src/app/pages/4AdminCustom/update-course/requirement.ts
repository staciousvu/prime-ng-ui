import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

@Component({
    selector: "app-update-requirement",
    standalone:true,
    imports:[CommonModule,FormsModule,ButtonModule,InputTextModule],
    template: `
    <!--  -->
    <div class="p-6 bg-gray-50 min-h-screen">
      <h2 class="text-2xl font-semibold mb-4">Course Requirement</h2>

      <div *ngIf="courseRequirements.length > 0; else noRequirement">
        <div
          *ngFor="let requirement of courseRequirements; let index = index"
          class="mb-3 p-4 bg-white shadow rounded-lg border border-gray-200"
        >
          <div class="flex justify-between items-center">
            <div *ngIf="editingRequirementIndex !== index" class="text-md font-medium">
              <span>Requirement {{ index + 1 }}: {{ requirement.title }}</span>
            </div>
            <div *ngIf="editingRequirementIndex !== index" class="space-x-2">
              <p-button icon="pi pi-pencil" class="btn-edit" (click)="startEditRequirement(index)" />
              <p-button icon="pi pi-trash" class="btn-delete" (click)="deleteRequirement(requirement.id, index)" />
            </div>
            <div *ngIf="editingRequirementIndex === index" class="flex items-center gap-2 w-full">
              <input pInputText [(ngModel)]="editedRequirementTitle" placeholder="Enter requirement title" class="input-text w-full" />
              <p-button icon="pi pi-save" class="btn-save" (click)="saveEditedRequirement(index, requirement.id)" />
              <p-button icon="pi pi-times" class="btn-cancel" (click)="cancelEditRequirement()" />
            </div>
          </div>
        </div>
      </div>

      <ng-template #noRequirement>
        <div class="flex flex-col items-center justify-center mt-10 gap-3">
          <p class="text-gray-500">No course requirement yet.</p>
          <p-button label="Add Course Requirement" icon="pi pi-plus" class="btn-add" (click)="startAddingRequirement()" />
        </div>
      </ng-template>

      <div *ngIf="isAddingRequirement" class="mt-6 flex items-center gap-2">
        <input pInputText [(ngModel)]="newRequirementTitle" placeholder="Enter requirement title" class="input-text w-full" />
        <p-button icon="pi pi-save" class="btn-save" (click)="saveRequirement()" />
        <p-button icon="pi pi-times" class="btn-cancel" (click)="cancelAddRequirement()" />
      </div>

      <div *ngIf="courseRequirements.length > 0 && !isAddingRequirement" class="mt-4">
        <p-button label="Add Course Requirement" icon="pi pi-plus" class="btn-add" (click)="startAddingRequirement()" />
      </div>
    </div>

      <!--  -->
    `,
})
export class UpdateRequirementComponent implements OnChanges{
    @Input() courseId: number | undefined;

    courseRequirements: any[] = [];
    isAddingRequirement = false;
    editingRequirementIndex: number | null = null;
    newRequirementTitle = '';
    editedRequirementTitle = '';
  
    constructor(private http: HttpClient) {}
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['courseId'] && this.courseId) {
        this.loadRequirements();
      }
    }
  
    loadRequirements() {
      this.http.get<any>(`http://localhost:8080/course-requirement/${this.courseId}`).subscribe(
        (response) => {
          this.courseRequirements = response.data;
        },
        (error) => {
          console.error('Error loading requirements', error);
        }
      );
    }
  
    startAddingRequirement() {
      this.isAddingRequirement = true;
      this.newRequirementTitle = '';
    }
  
    cancelAddRequirement() {
      this.isAddingRequirement = false;
      this.newRequirementTitle = '';
    }
  
    saveRequirement() {
      if (!this.newRequirementTitle.trim()) return;
  
      const body = [{ title: this.newRequirementTitle }];
      this.http.post(`http://localhost:8080/course-requirement/${this.courseId}`, body).subscribe(
        () => {
          this.loadRequirements();
          this.isAddingRequirement = false;
        },
        (error) => {
          console.error('Error creating requirement', error);
        }
      );
    }
  
    startEditRequirement(index: number) {
      this.editingRequirementIndex = index;
      this.editedRequirementTitle = this.courseRequirements[index].title;
    }
  
    cancelEditRequirement() {
      this.editingRequirementIndex = null;
      this.editedRequirementTitle = '';
    }
  
    saveEditedRequirement(index: number, id: number) {
      if (!this.editedRequirementTitle.trim()) return;
  
      const body = [{ id, title: this.editedRequirementTitle }];
      this.http.put(`http://localhost:8080/course-requirement/${this.courseId}`, body).subscribe(
        () => {
          this.courseRequirements[index].title = this.editedRequirementTitle;
          this.editingRequirementIndex = null;
        },
        (error) => {
          console.error('Error updating requirement', error);
        }
      );
    }
  
    deleteRequirement(id: number, index: number) {
      this.http.delete(`http://localhost:8080/course-requirement/${id}`).subscribe(
        () => {
          this.courseRequirements.splice(index, 1);
        },
        (error) => {
          console.error('Error deleting requirement', error);
        }
      );
    }
}
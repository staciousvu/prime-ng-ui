import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-update-target",
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <h2 class="text-2xl font-semibold mb-4">Course Target</h2>

      <div *ngIf="courseTargets.length > 0; else noTarget">
        <div
          *ngFor="let target of courseTargets; let index = index"
          class="mb-3 p-4 bg-white shadow rounded-lg border border-gray-200"
        >
          <div class="flex justify-between items-center">
            <div *ngIf="editingTargetIndex !== index" class="text-md font-medium">
              <span>Target {{ index + 1 }}: {{ target.title }}</span>
            </div>
            <div *ngIf="editingTargetIndex !== index" class="space-x-2">
              <p-button icon="pi pi-pencil" class="btn-edit" (click)="startEditTarget(index)" />
              <p-button icon="pi pi-trash" class="btn-delete" (click)="deleteTarget(target.id, index)" />
            </div>
            <div *ngIf="editingTargetIndex === index" class="flex items-center gap-2 w-full">
              <input pInputText [(ngModel)]="editedTargetTitle" placeholder="Enter target title" class="input-text w-full" />
              <p-button icon="pi pi-save" class="btn-save" (click)="saveEditedTarget(index, target.id)" />
              <p-button icon="pi pi-times" class="btn-cancel" (click)="cancelEditTarget()" />
            </div>
          </div>
        </div>
      </div>

      <ng-template #noTarget>
        <div class="flex flex-col items-center justify-center mt-10 gap-3">
          <p class="text-gray-500">No course target yet.</p>
          <p-button label="Add Course Target" icon="pi pi-plus" class="btn-add" (click)="startAddingTarget()" />
        </div>
      </ng-template>

      <div *ngIf="isAddingTarget" class="mt-6 flex items-center gap-2">
        <input pInputText [(ngModel)]="newTargetTitle" placeholder="Enter target title" class="input-text w-full" />
        <p-button icon="pi pi-save" class="btn-save" (click)="saveTarget()" />
        <p-button icon="pi pi-times" class="btn-cancel" (click)="cancelAddTarget()" />
      </div>

      <div *ngIf="courseTargets.length > 0 && !isAddingTarget" class="mt-4">
        <p-button label="Add Course Target" icon="pi pi-plus" class="btn-add" (click)="startAddingTarget()" />
      </div>
    </div>
  `,
})
export class UpdateTargetComponent implements OnChanges {
  @Input() courseId: number | undefined;

  courseTargets: any[] = [];
  isAddingTarget = false;
  editingTargetIndex: number | null = null;
  newTargetTitle = '';
  editedTargetTitle = '';

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && this.courseId) {
      this.loadTargets();
    }
  }

  loadTargets() {
    this.http.get<any>(`http://localhost:8080/course-target/${this.courseId}`).subscribe(
      (response) => {
        this.courseTargets = response.data;
      },
      (error) => {
        console.error('Error loading targets', error);
      }
    );
  }

  startAddingTarget() {
    this.isAddingTarget = true;
    this.newTargetTitle = '';
  }

  cancelAddTarget() {
    this.isAddingTarget = false;
    this.newTargetTitle = '';
  }

  saveTarget() {
    if (!this.newTargetTitle.trim()) return;

    const body = [{ title: this.newTargetTitle }];
    this.http.post(`http://localhost:8080/course-target/${this.courseId}`, body).subscribe(
      () => {
        this.loadTargets();
        this.isAddingTarget = false;
      },
      (error) => {
        console.error('Error creating target', error);
      }
    );
  }

  startEditTarget(index: number) {
    this.editingTargetIndex = index;
    this.editedTargetTitle = this.courseTargets[index].title;
  }

  cancelEditTarget() {
    this.editingTargetIndex = null;
    this.editedTargetTitle = '';
  }

  saveEditedTarget(index: number, id: number) {
    if (!this.editedTargetTitle.trim()) return;

    const body = [{ id, title: this.editedTargetTitle }];
    this.http.put(`http://localhost:8080/course-target/${this.courseId}`, body).subscribe(
      () => {
        this.courseTargets[index].title = this.editedTargetTitle;
        this.editingTargetIndex = null;
      },
      (error) => {
        console.error('Error updating target', error);
      }
    );
  }

  deleteTarget(id: number, index: number) {
    this.http.delete(`http://localhost:8080/course-target/${id}`).subscribe(
      () => {
        this.courseTargets.splice(index, 1);
      },
      (error) => {
        console.error('Error deleting target', error);
      }
    );
  }
}

import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

// Định nghĩa interface cho dữ liệu requirement
interface Requirement {
  id: number;
  title: string;
}

@Component({
  selector: "app-view-requirement",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <h2 class="text-2xl font-semibold mb-4">Course Requirements</h2>
      <!-- Nếu có requirement -->
      <div *ngIf="requirements.length > 0; else noRequirement">
        <div
          *ngFor="let req of requirements; let index = index"
          class="mb-3 p-4 bg-white shadow rounded-lg border border-gray-200"
        >
          <div class="text-md font-medium">
            <span>Requirement {{ index + 1 }}: {{ req.title }}</span>
          </div>
        </div>
      </div>
      <!-- Nếu không có requirement -->
      <ng-template #noRequirement>
        <div class="flex flex-col items-center justify-center mt-10 gap-3">
          <p class="text-gray-500">No course requirement yet.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ViewRequirementComponent implements OnChanges {
  @Input() courseId: number | undefined;
  requirements: Requirement[] = [];

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && this.courseId) {
      this.loadRequirements();
    }
  }

  private loadRequirements(): void {
    this.http
      .get<{ data: Requirement[] }>(
        `http://localhost:8080/course-requirement/${this.courseId}`
      )
      .subscribe({
        next: (response) => {
          this.requirements = response.data;
        },
        error: (error) => {
          console.error("Error loading requirements", error);
        },
      });
  }
}

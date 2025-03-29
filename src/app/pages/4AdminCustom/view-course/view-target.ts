import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

// Định nghĩa interface cho dữ liệu target learner
interface TargetLearner {
  id: number;
  title: string;
}

@Component({
  selector: "app-view-target",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <h2 class="text-2xl font-semibold mb-4">Target Learners</h2>
      <!-- Nếu có target -->
      <div *ngIf="targets.length > 0; else noTarget">
        <div
          *ngFor="let target of targets; let index = index"
          class="mb-3 p-4 bg-white shadow rounded-lg border border-gray-200"
        >
          <div class="text-md font-medium">
            <span>Target {{ index + 1 }}: {{ target.title }}</span>
          </div>
        </div>
      </div>
      <!-- Nếu không có target -->
      <ng-template #noTarget>
        <div class="flex flex-col items-center justify-center mt-10 gap-3">
          <p class="text-gray-500">No target learners yet.</p>
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
export class ViewTargetComponent implements OnChanges {
  @Input() courseId: number | undefined;
  targets: TargetLearner[] = [];

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && this.courseId) {
      this.loadTargets();
    }
  }

  private loadTargets(): void {
    this.http
      .get<{ data: TargetLearner[] }>(
        `http://localhost:8080/course-target/${this.courseId}`
      )
      .subscribe({
        next: (response) => {
          this.targets = response.data;
        },
        error: (error) => {
          console.error("Error loading targets", error);
        },
      });
  }
}

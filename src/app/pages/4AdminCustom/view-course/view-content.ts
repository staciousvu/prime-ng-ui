import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

// Định nghĩa interface cho dữ liệu nội dung khóa học
interface CourseContent {
  id: number;
  title: string;
}

@Component({
    selector: "app-view-intended-learner",
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="p-6 bg-gray-50 min-h-screen">
            <h2 class="text-2xl font-semibold mb-4">Course Content</h2>
            <!-- Nếu có nội dung -->
            <div *ngIf="courseContents.length > 0; else noContent">
                <div *ngFor="let content of courseContents; let index = index" 
                     class="mb-3 p-4 bg-white shadow rounded-lg border border-gray-200">
                    <div class="text-md font-medium">
                        <span>Content {{ index + 1 }}: {{ content.title }}</span>
                    </div>
                </div>
            </div>
            <!-- Nếu không có nội dung -->
            <ng-template #noContent>
                <div class="flex flex-col items-center justify-center mt-10 gap-3">
                    <p class="text-gray-500">No course content yet.</p>
                </div>
            </ng-template>
        </div>
    `,
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class ViewIntendedLearnerComponent implements OnChanges {
    @Input() courseId: number | undefined;
    courseContents: CourseContent[] = [];

    constructor(private http: HttpClient) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['courseId'] && this.courseId) {
            this.loadContents();
        }
    }

    private loadContents(): void {
        this.http.get<{ data: CourseContent[] }>(`http://localhost:8080/course-content/${this.courseId}`)
            .subscribe({
                next: (response) => {
                    this.courseContents = response.data;
                },
                error: (error) => {
                    console.error('Error loading contents', error);
                }
            });
    }
}
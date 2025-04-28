import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-overview-video',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="w-full mx-auto" *ngIf="course">
      <h1 class="text-2xl font-medium text-gray-600 mb-6">{{ course.title }}</h1>

      <div class="flex flex-wrap gap-8 border-b border-gray-300 pb-6 mb-8">
        <div class="flex flex-col items-start">
          <span class="text-2xl font-semibold text-gray-800 flex items-center gap-1">
            {{ course.avgRating ? course.avgRating.toFixed(1) : 0 }}
            <i class="fas fa-star text-yellow-400"></i>
          </span>
          <span class="text-sm text-gray-500">{{ course.countRating | number }} ratings</span>
        </div>

        <div class="flex flex-col items-start">
          <span class="text-2xl font-semibold text-gray-800">{{ course.countEnrolled | number }}</span>
          <span class="text-sm text-gray-500">students</span>
        </div>

        <div class="flex flex-col items-start">
          <span class="text-2xl font-semibold text-gray-800">{{ course.duration }}</span>
          <span class="text-sm text-gray-500">hours</span>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <h2 class="text-xl font-bold text-gray-800 flex-1">Description</h2>
        <p class="text-gray-700 flex-2 leading-relaxed whitespace-pre-line" [innerHTML]="santinizeDescription()">
        </p>
      </div>
    </div>

    `,
    styles: `

    `,
    providers: []
})
export class OverviewVideoComponent implements OnInit {
    @Input() courseId: any; // Nhận courseId từ parent component
    course: any;
    isLoading: boolean = true;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        if (this.courseId) {
            // Sử dụng template string đúng cách
            this.http.get<any>(`http://localhost:8080/course/basicinfo/${this.courseId}`).subscribe({
                next: (res) => {
                    this.course = res.data;
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error('Error fetching course info:', err);
                    this.isLoading = false;
                }
            });
        }
    }
    santinizeDescription() {
        return this.course.description.replace(/&nbsp;/g, ' ');
    }
}

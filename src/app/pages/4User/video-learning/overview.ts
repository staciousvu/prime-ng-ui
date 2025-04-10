import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-overview-video',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container" *ngIf="course">
            <h1 class="title">{{ course.title }}</h1>

            <div class="info">
                <div class="rating">
                    <span class="score">{{ course.avgRating ? course.avgRating.toFixed(1) : 0 }} <i class="fas fa-star star"></i></span>

                    <span class="count">{{ course.countRating | number }} ratings</span>
                </div>

                <div class="students">
                    <span class="count">{{ course.countEnrolled | number }}</span>
                    <span class="sub">students</span>
                </div>

                <div class="hours">
                    <span class="count">{{ course.duration }}</span>
                    <span class="sub">hours</span>
                </div>
            </div>

            <div class="description">
                <h2 class="description-title">Description</h2>
                <p class="description-content" [innerHTML]="course.description">
                    <!-- {{ course.description }} -->
                </p>
            </div>
        </div>
    `,
    styles: `
        .description {
            margin-top: 15px;
            width: 100%;
            display: flex;
        }
        .description-title {
            flex: 3;
        }
        .description-content {
            flex: 7;
            box-sizing: border-box;
    overflow-wrap: anywhere;
    word-break: normal;
    white-space: pre-line;
    line-height: 1.6;
        }
        .container {
            max-width: 1024px;
            margin: 0 auto;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 16px;
        }
        .info {
            // color:rgb(78, 79, 80);
            border-bottom: 1px solid rgba(78, 79, 80, 0.57);
            padding-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 50px;
        }
        .rating {
            flex-direction: column;
            display: flex;
            align-items: start;
            gap: 4px;
        }
        .rating .score {
            font-size: 20px;
            font-weight: bold;
            color: #2d3748;
        }
        .rating .star {
            color: #f6ad55;
        }
        .rating .count {
            font-size: 14px;
            color: #718096;
        }
        .students,
        .hours {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 20px;
            font-weight: bold;
            color: #2d3748;
        }
        .students .sub {
            font-size: 14px;
            font-weight: 400;
        }
        .hours .sub {
            font-size: 14px;
            font-weight: 400;
        }
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
                    console.log(this.course);
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error('Error fetching course info:', err);
                    this.isLoading = false;
                }
            });
        }
    }
}

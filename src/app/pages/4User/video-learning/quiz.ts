import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-vl-quiz',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h2 class="text-2xl font-medium mb-6 text-gray-600">Bài tập trắc nghiệm</h2>
        <div class="space-y-6">
            <!-- Quiz Card -->
            <div *ngFor="let quiz of quizzes" class="flex items-start gap-4 p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition">
                <div class="flex-shrink-0 mt-1">
                    <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <div class="flex-grow">
                    <h3 class="text-lg font-semibold text-gray-900">{{quiz.title}}</h3>
                    <p class="text-gray-600 mt-1">{{quiz.description}}</p>
                    <div class="flex gap-3 mt-4">
                        <button (click)="clickPlayQuiz(quiz)"  class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"><i class="fa-solid fa-play"></i> Làm ngay</button>
                        <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition"><i class="fa-solid fa-clock-rotate-left"></i> Xem lịch sử</button>
                    </div>
                </div>
            </div>

            <!-- Thêm nhiều Quiz Card tương tự -->
        </div>
    `,
    styles: ``,
    providers: []
})
export class QuizVLComponent implements OnInit, OnChanges {
    clickPlayQuiz(quiz: any) {
        this.playQuiz.emit(quiz);
    }
    @Input() courseId: any;
    @Output() playQuiz= new EventEmitter<any>();
    quizzes: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.courseId) {
            this.http.get<any>(`http://localhost:8080/quiz/instructor/course/${this.courseId}`).subscribe((res) => {
                console.log("Full response:", res);
                this.quizzes = res.data; 
            });
        }
    }
}

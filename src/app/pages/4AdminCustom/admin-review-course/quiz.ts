import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { StarRatingComponent } from '../../4User/star-rating';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-admin-review-quiz',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [AccordionModule, CommonModule, FormsModule],
    template: `
        <!-- <div class="w-[50%] mx-auto mt-6">
            <h2 class="text-2xl font-semibold mb-4">Danh sách bộ câu hỏi ôn tập</h2>

            <ng-container *ngIf="quizSets.length > 0; else noQuiz">
                <div *ngFor="let quiz of quizSets" class="border rounded-lg shadow p-4 mb-4">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-semibold">{{ quiz.title }}</h3>
                        <button (click)="toggleQuiz(quiz)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                            {{ quiz.expanded ? 'Ẩn' : 'Xem' }}
                        </button>
                    </div>

                    <div *ngIf="quiz.expanded">
                        <div *ngFor="let question of quiz.questions" class="mb-4">
                            <p class="font-medium" [innerHTML]="question.content"></p>
                            <ul class="ml-4 mt-1">
                                <li
                                    *ngFor="let answer of question.answers"
                                    [ngClass]="{
                                        'text-green-600 font-semibold': answer.isCorrect,
                                        'text-gray-700': !answer.isCorrect
                                    }"
                                    class="py-1"
                                >
                                    <span [innerHTML]="answer.content"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </ng-container>

            <ng-template #noQuiz>
                <p class="text-gray-500 italic">Không có bộ câu hỏi nào.</p>
            </ng-template>
        </div> -->
        <div class="w-full max-w-3xl mx-auto mt-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Danh sách bộ câu hỏi ôn tập</h2>

    <ng-container *ngIf="quizSets.length > 0; else noQuiz">
        <div *ngFor="let quiz of quizSets" class="border border-gray-200 rounded-xl shadow-md p-6 mb-6 bg-white">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-lg font-semibold text-gray-700">{{ quiz.title }}</h3>
                <button
                    (click)="toggleQuiz(quiz)"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm transition duration-200"
                >
                    {{ quiz.expanded ? 'Ẩn' : 'Xem' }}
                </button>
            </div>

            <div *ngIf="quiz.expanded" class="space-y-5 border-t pt-4">
                <div *ngFor="let question of quiz.questions" class="bg-gray-50 p-4 rounded-lg">
                    <p class="font-medium text-gray-800 mb-2" [innerHTML]="question.content"></p>
                    <ul class="space-y-2">
                        <li
                            *ngFor="let answer of question.answers"
                            class="py-1 px-3 rounded transition duration-150"
                            [ngClass]="{
                                'text-green-600 font-semibold bg-green-50': answer.isCorrect,
                                'text-gray-700 hover:bg-gray-100': !answer.isCorrect
                            }"
                        >
                            <span [innerHTML]="answer.content"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </ng-container>

    <ng-template #noQuiz>
        <p class="text-gray-500 italic text-center mt-6">Hiện chưa có bộ câu hỏi nào để ôn tập.</p>
    </ng-template>
</div>

    `,
    styles: ``
})
export class AdminReviewQuizComponent implements OnInit {
    quizSets: any[] = [];

    constructor(private http: HttpClient) {}
    @Input() courseId: string = ''; // Nhận giá trị courseId từ component cha
    ngOnInit(): void {
        this.http.get<any>(`http://localhost:8080/quiz/instructor/course/${this.courseId}`).subscribe(
            (res) => {
                this.quizSets = (res.data || []).map((quiz: any) => ({
                    ...quiz,
                    expanded: false
                }));
            },
            (err) => {
                console.error('Lỗi khi lấy dữ liệu quiz:', err);
            }
        );
    }

    toggleQuiz(quiz: any): void {
        quiz.expanded = !quiz.expanded;
    }
}

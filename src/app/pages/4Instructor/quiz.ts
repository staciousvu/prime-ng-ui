import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderControlService } from '../service/header.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../service/toast.service';

@Component({
    selector: 'app-edit-course-quiz',
    // standalone:true,
    imports: [RouterModule, CommonModule, FormsModule],
    template: `
        <section class="bg-white rounded-md shadow-sm flex-grow max-w-6xl min-w-0 border border-[#E2E8F0] pb-14" aria-label="Intended learners">
            <header class="border-b border-[#E2E8F0] px-10 py-2 flex justify-center items-center">
                <h1 class="text-2xl font-semibold text-[#1E293B] mb-0">Quizz</h1>
            </header>
            <div class="px-10 pt-10 space-y-8 text-[#334155] text-base font-normal max-w-4xl">
                <div class="max-w-6xl mx-auto space-y-8">
                    <!-- Danh sách các quiz đã có -->
                    <div class="bg-white rounded-2xl space-y-4">
                        <h2 class="text-xl font-bold text-gray-800">Danh sách Quiz đã tạo</h2>

                        <!-- Một quiz -->
                        <div class="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-700">Quiz chương 1</h3>
                                <p class="text-sm text-gray-500">Kiểm tra kiến thức cơ bản về chương này...</p>
                            </div>
                            <div class="space-x-2">
                                <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl text-sm">Sửa</button>
                                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm">Xóa</button>
                            </div>
                        </div>

                        <!-- Thêm nhiều quiz khác tương tự -->
                        <div class="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-700">Quiz chương 2</h3>
                                <p class="text-sm text-gray-500">Kiểm tra kiến thức cơ bản về chương này...</p>
                            </div>
                            <div class="space-x-2">
                                <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl text-sm">Sửa</button>
                                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm">Xóa</button>
                            </div>
                        </div>
                        <!-- ... -->

                        <!-- Nút thêm quiz mới -->
                        <div class="text-right mt-4">
                            <button (click)="btnAddQuiz()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium">+ Thêm Quiz Mới</button>
                        </div>
                    </div>
                    <!-- Header -->
                    <div *ngIf="boolAddQuiz" class="add-quiz">
                        <!-- Tiêu đề -->
                        <div class="text-left">
                            <h1 class="text-xl font-bold text-gray-800">Tạo Quiz Mới</h1>
                            <p class="text-gray-500 mt-2">Tạo quiz cho khóa học của bạn với các câu hỏi và đáp án dễ dàng</p>
                        </div>

                        <!-- Form Quiz -->
                        <div class="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                            <!-- Thông tin Quiz -->
                            <div class="space-y-4">
                                <h2 class="text-xl font-semibold text-gray-700">Thông tin Quiz</h2>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Tiêu đề</label>
                                        <input type="text" [(ngModel)]="quizTitle" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none" placeholder="VD: Quiz chương 1" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Mô tả</label>
                                        <textarea
                                            [(ngModel)]="quizDescription"
                                            rows="1"
                                            class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                                            placeholder="VD: Kiểm tra kiến thức cơ bản về chương này..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- Danh sách câu hỏi -->
                            <div class="space-y-6">
                                <h2 class="text-xl font-semibold text-gray-700">Câu hỏi</h2>

                                <div *ngFor="let question of questions; let i = index" class="border border-gray-200 rounded-xl p-4 space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Nội dung câu hỏi</label>
                                        <input type="text" [(ngModel)]="question.content" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none" placeholder="VD: Khái niệm OOP là gì?" />
                                    </div>

                                    <!-- Đáp án -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div *ngFor="let answer of question.answers; let j = index" class="flex items-center space-x-2">
                                            <input type="radio" [name]="'correct' + i" [value]="j" [(ngModel)]="question.correctAnswerIndex" class="text-blue-600 focus:ring-blue-500" />
                                            <input type="text" [(ngModel)]="answer.content" class="w-full border border-gray-300 rounded-lg px-4 py-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Thêm câu hỏi -->
                            <div>
                                <button (click)="addQuestion()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-medium transition">Thêm câu hỏi</button>
                            </div>
                        </div>

                        <!-- Submit -->
                        <div class="text-right mt-6">
                            <button (click)="saveNewQuiz()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">Lưu Quiz</button>
                        </div>
                    </div>

                    <div *ngIf="boolEditQuiz" class="edit-quiz">
                        <div class="text-left">
                            <h1 class="text-xl font-bold text-gray-800">Tạo Quiz Mới</h1>
                            <p class="text-gray-500 mt-2">Tạo quiz cho khóa học của bạn với các câu hỏi và đáp án dễ dàng</p>
                        </div>

                        <div class="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                            <div class="space-y-4">
                                <h2 class="text-xl font-semibold text-gray-700">Thông tin Quiz</h2>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Tiêu đề</label>
                                        <input type="text" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none" placeholder="VD: Quiz chương 1" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Mô tả</label>
                                        <textarea rows="1" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none" placeholder="VD: Kiểm tra kiến thức cơ bản về chương này..."></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <h2 class="text-xl font-semibold text-gray-700">Câu hỏi</h2>

                                <div class="border border-gray-200 rounded-xl p-4 space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Nội dung câu hỏi</label>
                                        <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none" placeholder="VD: Khái niệm OOP là gì?" />
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="flex items-center space-x-2">
                                            <input type="radio" name="correct1" class="text-blue-600 focus:ring-blue-500" />
                                            <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Đáp án A" />
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <input type="radio" name="correct1" class="text-blue-600 focus:ring-blue-500" />
                                            <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Đáp án B" />
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <input type="radio" name="correct1" class="text-blue-600 focus:ring-blue-500" />
                                            <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Đáp án C" />
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <input type="radio" name="correct1" class="text-blue-600 focus:ring-blue-500" />
                                            <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Đáp án D" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-medium transition">Thêm câu hỏi</button>
                            </div>
                        </div>
                        <div class="text-right mt-6">
                            <button class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">Lưu Quiz</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    styles: ``
})
export class EditCourseQuizComponent implements OnInit {
    boolAddQuiz = false;
    boolEditQuiz = false;

    quizTitle: string = '';
    quizDescription: string = '';
    courseId: number = 1;

    questions: any[] = [];

    constructor(private http: HttpClient,
        private route:ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.parent?.paramMap.subscribe((params) => {
            this.courseId = +params.get('id')!;
        });
    }

    btnAddQuiz() {
        this.boolAddQuiz = !this.boolAddQuiz;
    }

    addQuestion() {
        this.questions.push({
            content: '',
            correctAnswerIndex: 0, 
            answers: [
                { content: '' },
                { content: '' },
                { content: '' },
                { content: '' }
            ]
        });
    }

    saveNewQuiz() {
        const mappedQuestions = this.questions.map(q => ({
            content: q.content,
            answers: q.answers.map((a: any, i: number) => ({
                content: a.content,
                isCorrect: i === q.correctAnswerIndex
            }))
        }));

        const payload = {
            title: this.quizTitle,
            description: this.quizDescription,
            courseId: this.courseId,
            questions: mappedQuestions
        };
        console.log(payload)
        this.http.post('http://localhost:8080/quiz/create-full', payload).subscribe({
            next: () => {
                alert('Tạo quiz thành công!');
                this.resetForm();
            },
            error: (err) => console.error(err)
        });
    }

    resetForm() {
        this.quizTitle = '';
        this.quizDescription = '';
        this.questions = [];
        this.boolAddQuiz = false;
    }
}

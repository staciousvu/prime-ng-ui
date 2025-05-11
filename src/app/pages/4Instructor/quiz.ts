import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderControlService } from '../service/header.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../service/toast.service';
import { Editor } from 'primeng/editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEDITOR_CONFIG } from '../models/ckeditor-config';
import { ClassicEditor } from 'ckeditor5';
@Component({
    selector: 'app-edit-course-quiz',
    // standalone:true,
    imports: [RouterModule, CommonModule, FormsModule,CKEditorModule],
    template: `
        <section class="bg-white  flex-grow max-w-6xl min-w-0 border-l border-r border-[#E2E8F0] pb-14" aria-label="Intended learners">

            <div class="px-10 pt-0 space-y-8 text-[#334155] text-lg font-normal w-full">
                <div class="max-w-6xl mx-auto space-y-8">
                    <!-- Danh sách các quiz đã có -->
                    <div class="bg-white rounded-2xl space-y-4 mt-5">
                        <h2 class="text-base font-bold text-gray-700">Danh sách Quiz đã tạo</h2>

                        <!-- Một quiz -->
                        <div *ngFor="let quizI of quizzes" class="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-700">{{ quizI.title }}</h3>
                                <p class="text-sm text-gray-500">{{ quizI.description }}</p>
                            </div>
                            <div class="space-x-2">
                                <button (click)="editQuiz(quizI)" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl text-sm"><i class="fa-regular fa-pen-to-square"></i></button>
                                <button (click)="deleteQuiz(quizI)" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"><i class="fa-solid fa-delete-left"></i></button>
                            </div>
                        </div>
                        <!-- ... -->

                        <!-- Nút thêm quiz mới -->
                        <div class="text-right mt-4">
                            <button (click)="btnAddQuiz()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl text-base">Thêm Quiz Mới</button>
                        </div>
                    </div>
                    <!-- Header -->
                    <div *ngIf="boolAddQuiz" class="add-quiz">
                        <!-- Tiêu đề -->
                        <div class="text-left">
                            <h1 class="text-base font-bold text-gray-800">Tạo Quiz Mới</h1>
                            <p class="text-base text-gray-500 mt-2">Tạo quiz cho khóa học của bạn với các câu hỏi và đáp án dễ dàng</p>
                        </div>

                        <!-- Form Quiz -->
                        <div class="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                            <!-- Thông tin Quiz -->
                            <div class="space-y-4">
                                <h2 class="text-base font-semibold text-gray-700">Thông tin Quiz</h2>
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
                                <h2 class="text-base font-semibold text-gray-700">Câu hỏi</h2>

                                <div *ngFor="let question of questions; let i = index" class="border border-gray-200 rounded-xl p-4 space-y-4">
                                    <div>
                                    <h2 class="text-base font-semibold text-gray-700">Nội dung câu hỏi</h2>
                                     <ckeditor [editor]="Editor" [(ngModel)]="question.content" [config]="config" class="h-[200px]"></ckeditor>
                                    </div>

                                    <!-- Đáp án -->
                                    <div class="space-y-4">
                                        <div *ngFor="let answer of question.answers; let j = index" class="flex items-center space-x-2">
                                            <input type="radio" [name]="'correct' + i" [value]="j" [(ngModel)]="question.correctAnswerIndex" class="text-blue-600 focus:ring-blue-500" />
                                            <div class="flex-1 w-[90%]">
                                                <ckeditor [editor]="Editor" [(ngModel)]="answer.content" [config]="config" class="h-[200px] w-full"></ckeditor>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Nút xoá ở góc dưới bên phải -->
                                    <div class="flex justify-end">
                                        <button (click)="deleteAddQuestion(question)" type="button" class="bg-red-500 text-base  text-white px-3 py-1 rounded-lg hover:bg-red-600">Xoá câu hỏi</button>
                                    </div>
                                </div>
                            </div>

                            <!-- Thêm câu hỏi -->
                            <div>
                                <button (click)="addQuestion()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-xl text-base transition">Thêm câu hỏi</button>
                            </div>
                        </div>

                        <!-- Submit -->
                        <div class="text-right mt-6">
                            <button (click)="saveNewQuiz()" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-xl text-base transition">Lưu Quiz</button>
                        </div>
                    </div>

                    <div *ngIf="boolEditQuiz" class="edit-quiz">
                        <div class="text-left">
                            <h1 class="text-xl font-bold text-gray-800">Chỉnh sửa quizz</h1>
                            <p class="text-gray-500 mt-2">Chỉnh sửa quizz cho khóa học của bạn với các câu hỏi và đáp án dễ dàng</p>
                        </div>

                        <div class="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                            <div class="space-y-4">
                                <h2 class="text-xl font-semibold text-gray-700">Thông tin Quiz</h2>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Tiêu đề</label>
                                        <input [(ngModel)]="currentQuizEdit.title" type="text" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none" placeholder="VD: Quiz chương 1" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Mô tả</label>
                                        <textarea
                                            [(ngModel)]="currentQuizEdit.description"
                                            rows="1"
                                            class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                                            placeholder="VD: Kiểm tra kiến thức cơ bản về chương này..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <!-- <h2 class="text-xl font-semibold text-gray-700">Câu hỏi</h2> -->

                                <div *ngFor="let question of currentQuizEdit.questions" class=" space-y-4">
                                    <div>
                                    <h2 class="text-xl font-semibold text-gray-700">Nội dung câu hỏi</h2>
                                        <ckeditor [editor]="Editor" [(ngModel)]="question.content" [config]="config" class="h-[200px]"></ckeditor>
                                    </div>

                                    <div class="space-y-4">
                                    <h2 class="text-xl font-semibold text-gray-700">Đáp án</h2>
                                        <div *ngFor="let answer of question.answers; let i = index" class="flex items-center gap-2 w-full">
                                            <input type="radio" [name]="'correct' + question.id" [value]="i" [(ngModel)]="question.correctAnswerIndex" class="text-blue-600 focus:ring-blue-500" />

                                            <div class="flex-1 w-[90%]">
                                                <ckeditor [editor]="Editor" [(ngModel)]="answer.content" [config]="config" class="h-[200px] w-full"></ckeditor>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Nút xoá ở góc dưới bên phải -->
                                    <div class="flex justify-end">
                                        <button (click)="deleteEditQuestion(question)" type="button" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Xoá câu hỏi</button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button (click)="addEditQuestion()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-medium transition">Thêm câu hỏi</button>
                            </div>
                        </div>
                        <div class="text-right mt-6">
                            <button (click)="saveEditQuiz()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">Lưu Quiz</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    styles: ``
})
export class EditCourseQuizComponent implements OnInit {
    public Editor = ClassicEditor;
        public config = CKEDITOR_CONFIG;
    deleteQuiz(quiz: any) {
        this.http.delete<any>(`http://localhost:8080/quiz/delete/${quiz.id}`).subscribe(
            (res)=>{
                this.toastService.addToast("success","Xóa quiz thành công")
                this.loadQuiz();
            }
        )
    }
    editQuiz(quiz: any) {
        this.http.get<any>(`http://localhost:8080/quiz/${quiz.id}`).subscribe((res) => {
            const quizData = res.data;
            quizData.questions = quizData.questions.map((question: any) => {
                return {
                    ...question,
                    correctAnswerIndex: question.answers.findIndex((answer: any) => answer.isCorrect === true)
                };
            });
            this.currentQuizEdit = quizData;
            this.btnEditQuiz();
            this.boolAddQuiz = false;
        });
    }
    addEditQuestion() {
        this.currentQuizEdit.questions.push({
            content: '',
            correctAnswerIndex: 0,
            answers: [{ content: '' }, { content: '' }, { content: '' }, { content: '' }]
        });
    }
    deleteEditQuestion(question: any) {
        this.currentQuizEdit.questions = this.currentQuizEdit.questions.filter((item: any) => item !== question);
    }
    saveEditQuiz() {
        const mappedQuestions = this.currentQuizEdit.questions.map((q: any) => ({
            content: q.content,
            answers: q.answers.map((a: any, i: number) => ({
                content: a.content,
                isCorrect: i === q.correctAnswerIndex
            }))
        }));

        const payload = {
            id: this.currentQuizEdit.id,
            title: this.currentQuizEdit.title,
            description: this.currentQuizEdit.description,
            courseId: this.currentQuizEdit.courseId,
            questions: mappedQuestions
        };
        console.log(payload);
        this.http.put('http://localhost:8080/quiz/update-full', payload).subscribe({
            next: () => {
                this.toastService.addToast("success","Sửa quiz thành công")
                this.boolEditQuiz = false;
            },
            error: (err) => console.error(err)
        });
    }
    currentQuizEdit: any;
    quizzes: any[] = [];
    boolAddQuiz = false;
    boolEditQuiz = false;

    quizTitle: string = '';
    quizDescription: string = '';
    courseId: number = 1;

    questions: any[] = [];

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private sanitizer:DomSanitizer,
        private toastService:ToastService
    ) {}

    ngOnInit(): void {
        this.route.parent?.paramMap.subscribe((params) => {
            this.courseId = +params.get('id')!;
        });
        this.loadQuiz();
    }
    loadQuiz() {
        this.http.get<any>(`http://localhost:8080/quiz/instructor/course/${this.courseId}`).subscribe((res) => {
            this.quizzes = res.data;
        });
    }

    btnAddQuiz() {
        this.boolAddQuiz = !this.boolAddQuiz;
        this.boolEditQuiz = false;
    }
    btnEditQuiz() {
        this.boolEditQuiz = !this.boolEditQuiz;
    }

    addQuestion() {
        this.questions.push({
            content: '',
            correctAnswerIndex: 0,
            answers: [{ content: '' }, { content: '' }, { content: '' }, { content: '' }]
        });
    }

    saveNewQuiz() {
        const mappedQuestions = this.questions.map((q) => ({
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
        console.log(payload);
        this.http.post('http://localhost:8080/quiz/create-full', payload).subscribe({
            next: () => {
                this.toastService.addToast("success","Tạo quiz thành công")
                this.resetForm();
                this.loadQuiz();
            },
            error: (err) => console.error(err)
        });
    }
    deleteAddQuestion(question: any) {
        this.questions = this.questions.filter((item: any) => item !== question);
    }

    resetForm() {
        this.quizTitle = '';
        this.quizDescription = '';
        this.questions = [];
        this.boolAddQuiz = false;
    }

    
}

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
        
<section class="bg-white flex-grow max-w-6xl mx-auto border-l border-r border-gray-200 shadow-sm" aria-label="Quiz Manager">
  <div class="px-8 py-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-xl font-bold text-gray-800">Quản lý Quiz</h1>
      <p class="text-gray-500 mt-1">Tạo và quản lý các bài kiểm tra kiến thức cho khóa học của bạn</p>
    </div>

    <!-- Danh sách quiz đã tạo -->
    <div class="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-gray-800">Danh sách Quiz đã tạo</h2>
        <button (click)="btnAddQuiz()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm Quiz Mới
        </button>
      </div>

      <!-- Quiz list item -->
      <div *ngIf="quizzes && quizzes.length > 0" class="space-y-3">
        <div *ngFor="let quizI of quizzes" class="flex justify-between items-center border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition">
          <div class="flex items-start space-x-3">
            <div class="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-md font-medium text-gray-800">{{ quizI.title }}</h3>
              <p class="text-sm text-gray-500 mt-0.5">{{ quizI.description }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button (click)="editQuiz(quizI)" class="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button (click)="deleteQuiz(quizI)" class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div *ngIf="!quizzes || quizzes.length === 0" class="text-center py-8">
        <div class="inline-block p-3 bg-gray-100 rounded-full mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <p class="text-gray-500">Bạn chưa tạo quiz nào. Hãy nhấn "Thêm Quiz Mới" để bắt đầu.</p>
      </div>
    </div>

    <!-- Form tạo Quiz mới -->
    <div *ngIf="boolAddQuiz" class="bg-white rounded-xl border border-gray-200 p-6 mb-8 animate-fadeIn">
      <div class="mb-6">
        <h2 class="text-lg font-semibold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tạo Quiz Mới
        </h2>
        <p class="text-sm text-gray-500 mt-1">Điền thông tin và thêm các câu hỏi cho quiz mới</p>
      </div>

      <!-- Thông tin Quiz -->
      <div class="bg-gray-50 rounded-lg p-5 mb-6">
        <h3 class="text-md font-medium text-gray-700 mb-4">Thông tin cơ bản</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tiêu đề Quiz</label>
            <input 
              type="text" 
              [(ngModel)]="quizTitle" 
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition" 
              placeholder="Nhập tiêu đề quiz"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
            <textarea
              [(ngModel)]="quizDescription"
              rows="1"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition"
              placeholder="Mô tả ngắn gọn về nội dung quiz"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Danh sách câu hỏi -->
      <div class="mb-6">
        <h3 class="text-md font-medium text-gray-700 mb-4">Danh sách câu hỏi</h3>
        
        <div *ngIf="questions.length === 0" class="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p class="text-gray-500">Chưa có câu hỏi nào. Nhấn "Thêm câu hỏi" để bắt đầu.</p>
        </div>

        <div *ngFor="let question of questions; let i = index" class="border border-gray-200 rounded-lg p-5 mb-5 bg-white shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h4 class="font-medium text-gray-800">Câu hỏi #{{i+1}}</h4>
            <button (click)="deleteAddQuestion(question)" type="button" class="text-red-500 hover:text-red-600 flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Xoá câu hỏi
            </button>
          </div>
          
          <!-- Nội dung câu hỏi -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nội dung câu hỏi</label>
            <div class="border border-gray-200 rounded-lg bg-white">
              <ckeditor [editor]="Editor" [(ngModel)]="question.content" [config]="config"></ckeditor>
            </div>
          </div>

          <!-- Đáp án -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Các đáp án</label>
            <div class="space-y-3">
              <div *ngFor="let answer of question.answers; let j = index" class="flex items-start space-x-3 p-3 rounded-lg w-full" [ngClass]="{'bg-green-50 border border-green-100': question.correctAnswerIndex === j, 'bg-gray-50 border border-gray-100': question.correctAnswerIndex !== j}">
                <div class="pt-2">
                  <input 
                    type="radio" 
                    [name]="'correct' + i" 
                    [value]="j" 
                    [(ngModel)]="question.correctAnswerIndex" 
                    class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div class="flex-1 border border-gray-200 rounded-lg bg-white w-[90%]">
                  <ckeditor [editor]="Editor" [(ngModel)]="answer.content" [config]="config" class="h-[200px] w-full"></ckeditor>
                </div>
              </div>
            </div>
            <p *ngIf="question.correctAnswerIndex !== undefined" class="text-xs text-gray-500 italic mt-2">
              Đáp án đúng: Lựa chọn {{question.correctAnswerIndex + 1}}
            </p>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-between">
        <button 
          (click)="addQuestion()" 
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm câu hỏi
        </button>
        <div class="flex space-x-3">
          <button 
            (click)="btnAddQuiz()" 
            class="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Huỷ
          </button>
          <button 
            (click)="saveNewQuiz()" 
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Lưu Quiz
          </button>
        </div>
      </div>
    </div>

    <!-- Form chỉnh sửa Quiz -->
    <div *ngIf="boolEditQuiz" class="bg-white rounded-xl border border-gray-200 p-6 mb-8 animate-fadeIn">
      <div class="mb-6">
        <h2 class="text-lg font-semibold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Chỉnh sửa Quiz
        </h2>
        <p class="text-sm text-gray-500 mt-1">Cập nhật thông tin và nội dung quiz</p>
      </div>

      <!-- Thông tin Quiz -->
      <div class="bg-gray-50 rounded-lg p-5 mb-6">
        <h3 class="text-md font-medium text-gray-700 mb-4">Thông tin cơ bản</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tiêu đề Quiz</label>
            <input 
              type="text" 
              [(ngModel)]="currentQuizEdit.title" 
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition" 
              placeholder="Nhập tiêu đề quiz"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
            <textarea
              [(ngModel)]="currentQuizEdit.description"
              rows="1"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition"
              placeholder="Mô tả ngắn gọn về nội dung quiz"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Danh sách câu hỏi -->
      <div class="mb-6">
        <h3 class="text-md font-medium text-gray-700 mb-4">Danh sách câu hỏi</h3>
        
        <div *ngIf="currentQuizEdit.questions.length === 0" class="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p class="text-gray-500">Chưa có câu hỏi nào. Nhấn "Thêm câu hỏi" để bắt đầu.</p>
        </div>

        <div *ngFor="let question of currentQuizEdit.questions; let i = index" class="border border-gray-200 rounded-lg p-5 mb-5 bg-white shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h4 class="font-medium text-gray-800">Câu hỏi #{{i+1}}</h4>
            <button (click)="deleteEditQuestion(question)" type="button" class="text-red-500 hover:text-red-600 flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Xoá câu hỏi
            </button>
          </div>
          
          <!-- Nội dung câu hỏi -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nội dung câu hỏi</label>
            <div class="border border-gray-200 rounded-lg bg-white">
              <ckeditor [editor]="Editor" [(ngModel)]="question.content" [config]="config"></ckeditor>
            </div>
          </div>

          <!-- Đáp án -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Các đáp án</label>
            <div class="space-y-3">
              <div *ngFor="let answer of question.answers; let j = index" class="flex items-start space-x-3 p-3 rounded-lg w-full" [ngClass]="{'bg-green-50 border border-green-100': question.correctAnswerIndex === j, 'bg-gray-50 border border-gray-100': question.correctAnswerIndex !== j}">
                <div class="pt-2">
                  <input 
                    type="radio" 
                    [name]="'correct' + question.id" 
                    [value]="j" 
                    [(ngModel)]="question.correctAnswerIndex" 
                    class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div class="flex-1 border border-gray-200 rounded-lg bg-white w-[90%]">
                  <ckeditor [editor]="Editor" [(ngModel)]="answer.content" [config]="config" class="h-[200px] w-full"></ckeditor>
                </div>
              </div>
            </div>
            <p *ngIf="question.correctAnswerIndex !== undefined" class="text-xs text-gray-500 italic mt-2">
              Đáp án đúng: Lựa chọn {{question.correctAnswerIndex + 1}}
            </p>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-between">
        <button 
          (click)="addEditQuestion()" 
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm câu hỏi
        </button>
        <div class="flex space-x-3">
          <button 
            (click)="boolEditQuiz = false" 
            class="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Huỷ
          </button>
          <button 
            (click)="saveEditQuiz()" 
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
    `,
    styles: `
    .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Thiết lập chiều cao cho CKEditor */
  ::ng-deep .ck-editor__editable {
    min-height: 100px !important;
  }
  
  /* Điều chỉnh giao diện cho radio button */
  input[type="radio"] {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
    `
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

import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-performance-student',
    standalone: true,
    imports: [RouterModule,CommonModule,FormsModule],
    template: `
        <main class="w-full mx-auto px-6 py-8 text-[17px]">
  <!-- Error Message -->
  <div *ngIf="errorMessage" class="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
    {{ errorMessage }}
  </div>

  <!-- Header -->
  <header class="mb-4">
    <h1 class="text-5xl font-extrabold text-gray-900 inline-block">Students</h1>
    <select (change)="onCourseChange($event)" aria-label="All courses dropdown" 
            class="ml-4 text-purple-700 font-semibold text-xl bg-white px-2 py-1 focus:outline-none">
      <option value="all">All courses</option>
      <option *ngFor="let course of courses" [value]="course.id" class="text-gray-800 font-extralight">
        {{ course.title }}
      </option>
    </select>
  </header>

  <!-- Summary Statistics -->
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
    <div class="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-5 shadow-lg">
      <p class="text-sm mb-1">Total Students</p>
      <p class="text-3xl font-bold">{{ totalStudents }}</p>
    </div>
    <div class="bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-2xl p-5 shadow-lg">
      <p class="text-sm mb-1">Avg Progress</p>
      <p class="text-3xl font-bold">{{ avgProgress | number:'1.0-0' }}%</p>
    </div>
    <div class="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-5 shadow-lg">
      <p class="text-sm mb-1">Completion Rate</p>
      <p class="text-3xl font-bold">{{ completionRate | number:'1.0-0' }}%</p>
    </div>
    <div class="bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-2xl p-5 shadow-lg">
      <p class="text-sm mb-1">Avg Rating</p>
      <p class="text-3xl font-bold">{{ avgRating | number:'1.1-1' }}</p>
    </div>
    <div class="bg-gradient-to-br from-blue-400 to-sky-600 text-white rounded-2xl p-5 shadow-lg">
      <p class="text-sm mb-1">Questions Asked</p>
      <p class="text-3xl font-bold">{{ totalQuestions }}</p>
    </div>
  </div>

  <!-- Filter and Search -->
  <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
    <input type="text" [(ngModel)]="search" (ngModelChange)="onSearchChange()" placeholder="Search by name or email"
           class="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
    <select [(ngModel)]="status" (ngModelChange)="onStatusChange()"
            class="px-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none shadow-sm text-sm">
      <option value="All">Status: All</option>
      <option value="Completed">Completed</option>
      <option value="In Progress">In Progress</option>
    </select>
  </div>

  <!-- Students Table -->
  <div class="overflow-x-auto bg-white shadow-lg rounded-2xl">
  <table class="min-w-full divide-y divide-gray-200 text-sm">
  <thead class="bg-purple-500 dark:bg-gray-800 text-white dark:text-gray-200 uppercase tracking-wider text-xs">
    <tr>
    <th class="px-6 py-3 text-left">Student</th>
      <th class="px-6 py-3 text-left">Email</th>
      <th class="px-6 py-3 text-left">Enrolled On</th>
      <th class="px-6 py-3 text-left">Progress</th>
      <th class="px-0 py-3 text-left">Lessons</th>
      <th class="px-6 py-3 text-left" *ngIf="selectedCourseId === null">Course</th> 
      <th class="px-6 py-3 text-left">Completed</th>
      <th class="px-2 py-3 text-left">Rating</th>
      <th class="px-0 py-3 text-left">Questions</th>
      <!-- <th class="px-6 py-3 text-left">👤 Student</th>
      <th class="px-6 py-3 text-left">📧 Email</th>
      <th class="px-6 py-3 text-left">📅 Enrolled On</th>
      <th class="px-6 py-3 text-left">📈 Progress</th>
      <th class="px-0 py-3 text-left">🎓 Lessons</th>
      <th class="px-6 py-3 text-left" *ngIf="selectedCourseId === null">📚 Course</th> 
      <th class="px-6 py-3 text-left">✅ Completed</th>
      <th class="px-2 py-3 text-left">⭐ Rating</th>
      <th class="px-0 py-3 text-left">❓ Questions</th> -->
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-100 text-gray-700">
    <tr *ngFor="let student of students" class="hover:bg-gray-50 transition">
      <td class="px-6 py-4 font-medium">{{ student.fullName }}</td>
      <td class="px-6 py-4">{{ student.email }}</td>
      <td class="px-6 py-4">{{ student.enrolledOn | date:'yyyy-MM-dd' }}</td>
      <td class="px-6 py-4">
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-indigo-500 h-2.5 rounded-full" [style.width.%]="student.progress"></div>
        </div>
        <p class="text-xs mt-1 text-indigo-600">{{ student.progress | number:'1.0-0' }}%</p>
      </td>
      <td class="px-6 py-4">{{ student.lessonsCompleted }}/{{ student.totalLessons }}</td>
      <td class="px-6 py-4" *ngIf="selectedCourseId === null">{{ student.courseTitle || 'N/A' }}</td> <!-- Hiển thị tên khóa học nếu selectedCourseId là null -->
      <td class="px-6 py-4">
        <span class="inline-block px-2 py-1 rounded-full text-xs font-semibold"
              [ngClass]="{'bg-green-100 text-green-700': student.isCompleted, 'bg-red-100 text-red-700': !student.isCompleted}">
          {{ student.isCompleted ? '✅ Yes' : '❌ No' }}
        </span>
      </td>
      <td class="px-6 py-4">{{ student.rating ? '⭐ ' + student.rating : 'N/A' }}</td>
      <td class="px-6 py-4">{{ student.questions }}</td>
    </tr>
    <tr *ngIf="students.length === 0">
      <td colspan="8" class="px-6 py-4 text-center text-gray-500">No students found.</td>
    </tr>
  </tbody>
</table>

  </div>

  <!-- Pagination -->
  <div class="mt-4 flex justify-center" *ngIf="totalPages > 1">
    <button *ngFor="let p of [].constructor(totalPages); let i = index"
            (click)="onPageChange(i)" [disabled]="page === i"
            class="mx-1 px-3 py-1 rounded" [ngClass]="{'bg-indigo-500 text-white': page === i, 'bg-gray-200': page !== i}">
      {{ i + 1 }}
    </button>
  </div>
</main>
    `,
    styles: ``
})
export class PerformanceStudentComponent implements OnInit {
  private apiUrl = 'http://localhost:8080';
  courses: any[] = [];
  selectedCourseId: number | null = null;
  students: any[] = [];
  search: string = '';
  status: string = 'All';
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  totalStudents: number = 0;
  avgProgress: number = 0;
  avgRating: number = 0;
  totalQuestions: number = 0;
  completionRate: number = 0;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    let params = new HttpParams();
            params = params.set('page', 0);
            params = params.set('size', 100);
            params = params.set('keyword','');
    this.http.get<any>(`${this.apiUrl}/instructor/my-courses`,{params}).subscribe({
      next: (response) => {
        this.courses = response.data.content;
        console.log(this.courses)
        this.loadStudents();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses. Please try again.';
        console.error('Error fetching courses:', error);
      }
    });
  }

  onCourseChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedCourseId = selectedValue === 'all' ? null : +selectedValue;
    this.page = 0;
    this.loadStudents();
  }

  onSearchChange(): void {
    this.page = 0;
    this.loadStudents();
  }

  onStatusChange(): void {
    this.page = 0;
    this.loadStudents();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadStudents();
  }

  loadStudents(): void {
    let params = new HttpParams()
      .set('search', this.search)
      .set('status', this.status)
      .set('page', this.page.toString())
      .set('size', this.size.toString());
    if (this.selectedCourseId !== null) {
      params = params.set('courseId', this.selectedCourseId.toString());
    }

    this.http.get<any>(`${this.apiUrl}/dashboard/performance-student`, { params }).subscribe({
      next: (res) => {
        this.students = res.data.content;
        this.totalPages = res.data.totalPages;
        this.totalElements = res.data.totalElements;
        this.calculateStatistics();
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load students. Please try again.';
        console.error('Error fetching students:', error);
        this.students = [];
        this.totalPages = 0;
        this.totalElements = 0;
        this.calculateStatistics();
      }
    });
  }

  calculateStatistics(): void {
    if (this.students.length > 0) {
      this.totalStudents = this.totalElements;
      const sumProgress = this.students.reduce((sum, s) => sum + s.progress, 0);
      this.avgProgress = sumProgress / this.students.length;
      const ratings = this.students.map(s => s.rating).filter(r => r != null) as number[];
      const sumRatings = ratings.reduce((sum, r) => sum + r, 0);
      this.avgRating = ratings.length > 0 ? sumRatings / ratings.length : 0;
      this.totalQuestions = this.students.reduce((sum, s) => sum + s.questions, 0);
      const completed = this.students.filter(s => s.isCompleted).length;
      this.completionRate = (completed / this.students.length) * 100;
    } else {
      this.totalStudents = 0;
      this.avgProgress = 0;
      this.avgRating = 0;
      this.totalQuestions = 0;
      this.completionRate = 0;
    }
  }
}



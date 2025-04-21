import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-performance-student',
    standalone: true,
    imports: [RouterModule,CommonModule],
    template: `
        <main class="w-full mx-auto px-6 py-8 text-[17px]">
            <header class="mb-4">
                <h1 class="text-5xl font-extrabold text-gray-900 inline-block">Students</h1>
                <!-- Sửa thành select thay vì button -->
                <select (change)="onCourseChange($event)" aria-label="All courses dropdown" 
                        class="ml-4 text-purple-700 font-semibold text-xl bg-white px-2 py-1 focus:outline-none">
                        <option class="text-black font-normal" selected value="all">All courses</option>
                        <option *ngFor="let course of instructor_courses"
                                [value]="course.courseId"
                                class="text-gray-800 font-normal">
                            {{ course.courseName }}
                        </option>
                </select>
            </header>
<!-- Summary Statistics -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
  <div class="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-5 shadow-lg">
    <p class="text-sm mb-1">Total Students</p>
    <p class="text-3xl font-bold">1,200</p>
  </div>
  <div class="bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-2xl p-5 shadow-lg">
    <p class="text-sm mb-1">Avg Time</p>
    <p class="text-3xl font-bold">3.4h</p>
  </div>
  <div class="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-5 shadow-lg">
    <p class="text-sm mb-1">Lessons Completed</p>
    <p class="text-3xl font-bold">85%</p>
  </div>
  <div class="bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-2xl p-5 shadow-lg">
    <p class="text-sm mb-1">Avg Rating</p>
    <p class="text-3xl font-bold">4.7</p>
  </div>
  <div class="bg-gradient-to-br from-blue-400 to-sky-600 text-white rounded-2xl p-5 shadow-lg">
    <p class="text-sm mb-1">Questions Asked</p>
    <p class="text-3xl font-bold">134</p>
  </div>
  <div class="bg-gradient-to-br from-gray-600 to-zinc-800 text-white rounded-2xl p-5 shadow-lg">
    <p class="text-sm mb-1">Completion Rate</p>
    <p class="text-3xl font-bold">65%</p>
  </div>
</div>

<!-- Filter and Search -->
<div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
  <input type="text" placeholder="Search by name or email"
         class="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
  <select class="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none shadow-sm text-sm">
    <option selected>Status: All</option>
    <option>Completed</option>
    <option>In Progress</option>
  </select>
</div>

<!-- Students Table -->
<div class="overflow-x-auto bg-white shadow-lg rounded-2xl">
  <table class="min-w-full divide-y divide-gray-200 text-sm">
    <thead class="bg-purple-500 dark:bg-gray-800 text-white dark:text-gray-200 uppercase tracking-wider text-xs">
      <tr>
        <th class="px-6 py-3 text-left">👤 Student</th>
        <th class="px-6 py-3 text-left">📧 Email</th>
        <th class="px-6 py-3 text-left">📅 Enrolled On</th>
        <th class="px-6 py-3 text-left">📈 Progress</th>
        <th class="px-6 py-3 text-left">🎓 Lessons</th>
        <th class="px-6 py-3 text-left">✅ Completed</th>
        <th class="px-6 py-3 text-left">⭐ Rating</th>
        <th class="px-6 py-3 text-left">❓ Questions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 text-gray-700">
      <tr class="hover:bg-gray-50 transition">
        <td class="px-6 py-4 font-medium">John Doe</td>
        <td class="px-6 py-4">john.com</td>
        <td class="px-6 py-4">2024-03-12</td>
        <td class="px-6 py-4">
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-indigo-500 h-2.5 rounded-full" style="width: 75%"></div>
          </div>
          <p class="text-xs mt-1 text-indigo-600">75%</p>
        </td>
        <td class="px-6 py-4">18/24</td>
        <td class="px-6 py-4">
          <span class="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">❌ No</span>
        </td>
        <td class="px-6 py-4">⭐ 4.5</td>
        <td class="px-6 py-4">2</td>
      </tr>
      <!-- More rows -->
    </tbody>
  </table>
</div>

    
        </main>
    `,
    styles: ``
})
export class PerformanceStudentComponent implements OnInit{
  instructor_courses: any[] = [];
    reviews: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get<any>(`http://localhost:8080/instructor/my-courses`).subscribe((response) => {
            this.instructor_courses = response.data;
        });
    }

    onCourseChange(event: Event) {
        const selectedValue = (event.target as HTMLSelectElement).value;
        let url = '';

        if (selectedValue === 'all') {
            url = `http://localhost:8080/review/instructor/all-course?page=0&size=10`;
        } else {
            url = `http://localhost:8080/review/course/${selectedValue}?page=0&size=10`;
        }

        this.http.get<any>(url).subscribe((res) => {
            this.reviews = res.data; // Tùy vào format response của bạn
        });
    }

}

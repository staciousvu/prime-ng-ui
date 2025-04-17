import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-performance-student',
    standalone: true,
    imports: [RouterModule],
    template: `
        <main class="w-full mx-auto px-6 py-8 text-[17px]">
            <header class="mb-4">
                <h1 class="text-5xl font-extrabold text-gray-900 inline-block">Students</h1>
                <!-- Sửa thành select thay vì button -->
                <select aria-label="All courses dropdown" class="ml-4 text-purple-700 font-semibold text-xl bg-white px-2 py-1 focus:outline-none">
                    <option selected style="color: black; background-color: white; font-weight: normal;">All courses</option>
                    <option value="course1" style="color: black; background-color: white; font-weight: normal;">Course 1</option>
                    <option value="course2" style="color: black; background-color: white; font-weight: normal;">Course 2</option>
                </select>
            </header>
            <!-- Bảng thống kê học sinh -->
    <section class="overflow-x-auto rounded-md shadow-md border border-gray-200">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-100 text-gray-700 text-xl">
          <tr>
            <th class="px-4 py-2 text-left border-b">Name</th>
            <th class="px-4 py-2 text-left border-b">Email</th>
            <th class="px-4 py-2 text-left border-b">Course</th>
            <th class="px-4 py-2 text-left border-b">Enrollment Date</th>
            <th class="px-4 py-2 text-left border-b">Status</th>
          </tr>
        </thead>
        <tbody class="text-gray-900 text-lg">
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 border-b">Alice Nguyen</td>
            <td class="px-4 py-2 border-b">alicegmail.com</td>
            <td class="px-4 py-2 border-b">Course 1</td>
            <td class="px-4 py-2 border-b">2025-04-01</td>
            <td class="px-4 py-2 border-b text-green-600 font-medium">Active</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 border-b">Bob Tran</td>
            <td class="px-4 py-2 border-b">bob</td>
            <td class="px-4 py-2 border-b">Course 2</td>
            <td class="px-4 py-2 border-b">2025-03-15</td>
            <td class="px-4 py-2 border-b text-yellow-600 font-medium">Pending</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 border-b">Carol Le</td>
            <td class="px-4 py-2 border-b">okeoke.eruisn.com</td>
            <td class="px-4 py-2 border-b">Course 1</td>
            <td class="px-4 py-2 border-b">2025-02-28</td>
            <td class="px-4 py-2 border-b text-red-600 font-medium">Inactive</td>
          </tr>
        </tbody>
      </table>
    </section>
        </main>
    `,
    styles: ``
})
export class PerformanceStudentComponent {}

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-performance-overview',
    standalone: true,
    imports: [RouterModule],
    template: `
        <main class="w-full mx-auto px-6 py-8 text-[17px]">
            <header class="mb-4">
                <h1 class="text-5xl font-extrabold text-gray-900 inline-block">Overview</h1>

                <!-- Sửa thành select thay vì button -->
                <select aria-label="All courses dropdown" class="ml-4 text-purple-700 font-semibold text-xl bg-white px-2 py-1 focus:outline-none">
                    <option selected style="color: black; background-color: white; font-weight: normal;">All courses</option>
                    <option value="course1" style="color: black; background-color: white; font-weight: normal;">Course 1</option>
                    <option value="course2" style="color: black; background-color: white; font-weight: normal;">Course 2</option>
                </select>

                <p class="mt-1 text-base font-normal text-gray-900 max-w-md">Get top insights about your performance</p>
            </header>

            <section class="border border-gray-200 rounded-md shadow-sm" aria-label="Performance overview">
                <div class="flex flex-wrap border-b border-gray-200 px-6 py-4 text-gray-700 text-sm">
                    <!-- Total revenue -->
                    <div class="flex flex-col pr-10 min-w-[120px]">
                        <span class="mb-1">Total revenue</span>
                        <span class="text-3xl font-light text-gray-900">$0.00</span>
                        <span class="mt-1 text-sm font-normal text-gray-700 border-b border-purple-700 w-max"> $0.00 this month </span>
                    </div>

                    <!-- Total enrollments -->
                    <div class="flex flex-col pr-10 min-w-[120px]">
                        <div class="flex items-center space-x-1 mb-1">
                            <span>Total enrollments</span>
                            <button aria-label="Info about total enrollments" class="text-gray-400 hover:text-gray-600 focus:outline-none" type="button">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                        <span class="text-3xl font-light text-gray-900">0</span>
                        <span class="mt-1 text-sm font-normal text-gray-700">0 this month</span>
                    </div>

                    <!-- Instructor rating -->
                    <div class="flex flex-col pr-10 min-w-[120px]">
                        <div class="flex items-center space-x-1 mb-1">
                            <span>Instructor rating</span>
                            <button aria-label="Info about instructor rating" class="text-gray-400 hover:text-gray-600 focus:outline-none" type="button">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                        <span class="text-3xl font-light text-gray-900">0.00</span>
                        <span class="mt-1 text-sm font-normal text-gray-700">0 ratings this month</span>
                    </div>
                </div>

                <!-- Date range + Export -->
                <div class="px-6 py-4 min-h-[240px] flex flex-col">
                    <div class="flex justify-end items-center space-x-3 mb-4 text-sm text-gray-700">
                        <span>Date range:</span>

                        <!-- Sửa thành select -->
                        <select class="bg-white border border-purple-700 rounded-md px-3 py-1 text-purple-700 font-semibold focus:outline-none" aria-label="Select date range">
                            <option style="color: black; background-color: white; font-weight: normal;">Last 12 months</option>
                            <option style="color: black; background-color: white; font-weight: normal;">Last 30 days</option>
                            <option style="color: black; background-color: white; font-weight: normal;">This year</option>
                        </select>

                        <button type="button" class="bg-purple-700 text-white font-bold px-4 py-2 rounded-md flex items-center focus:outline-none">
                            Export
                            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- No data -->
                    <div class="py-4 min-h-[240px]">
  <table class="w-full text-left border border-gray-200 rounded-md overflow-hidden shadow-sm">
    <thead class="bg-gray-100 text-gray-700 text-lg">
      <tr>
        <th class="px-4 py-2 border-b">Course</th>
        <th class="px-4 py-2 border-b">Enrollments</th>
        <th class="px-4 py-2 border-b">Revenue</th>
        <th class="px-4 py-2 border-b">Date</th>
      </tr>
    </thead>
    <tbody class="text-lg text-gray-900">
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 border-b">Java Basics</td>
        <td class="px-4 py-2 border-b">123</td>
        <td class="px-4 py-2 border-b">$1,230</td>
        <td class="px-4 py-2 border-b">2025-04-01</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 border-b">Spring Boot Mastery</td>
        <td class="px-4 py-2 border-b">85</td>
        <td class="px-4 py-2 border-b">$980</td>
        <td class="px-4 py-2 border-b">2025-04-05</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 border-b">Angular Essentials</td>
        <td class="px-4 py-2 border-b">67</td>
        <td class="px-4 py-2 border-b">$670</td>
        <td class="px-4 py-2 border-b">2025-04-10</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 border-b">Angular Essentials</td>
        <td class="px-4 py-2 border-b">67</td>
        <td class="px-4 py-2 border-b">$670</td>
        <td class="px-4 py-2 border-b">2025-04-10</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 border-b">Angular Essentials</td>
        <td class="px-4 py-2 border-b">67</td>
        <td class="px-4 py-2 border-b">$670</td>
        <td class="px-4 py-2 border-b">2025-04-10</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 border-b">Angular Essentials</td>
        <td class="px-4 py-2 border-b">67</td>
        <td class="px-4 py-2 border-b">$670</td>
        <td class="px-4 py-2 border-b">2025-04-10</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 border-b">Angular Essentials</td>
        <td class="px-4 py-2 border-b">67</td>
        <td class="px-4 py-2 border-b">$670</td>
        <td class="px-4 py-2 border-b">2025-04-10</td>
      </tr>
    </tbody>
  </table>
</div>

                    <!-- <div class="flex-grow flex items-center justify-center text-gray-900 font-normal text-base">No data to display</div> -->
                </div>

                <!-- Revenue Report link -->
                <div class="border-t border-gray-200 text-purple-700 text-center text-sm font-normal py-3 cursor-pointer select-none">
                    Revenue Report
                    <svg class="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </section>
        </main>
    `,
    styles: ``
})
export class PerformanceOverviewComponent {}

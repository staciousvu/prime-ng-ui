import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
    selector: 'app-performance-overview',
    standalone: true,
    imports: [RouterModule, BaseChartDirective, CommonModule,FormsModule],
    template: `
        <main class="w-full mx-auto px-6 py-6 text-[17px]">
            <div *ngIf="errorMessage" class="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                {{ errorMessage }}
            </div>
            <header class="mb-4">
                <h1 class="text-5xl font-extrabold text-gray-900 inline-block">Overview</h1>

                <!-- Sửa thành select thay vì button -->
                <select [(ngModel)]="selectedCourseId" (ngModelChange)="getPerformanceData()" aria-label="All courses dropdown" class="ml-4 text-purple-700 font-semibold text-xl bg-white px-2 py-1 focus:outline-none">
                    <option value="all">All courses</option>
                    <option *ngFor="let course of courses" [value]="course.id" class="text-gray-800 font-extralight">
                        {{ course.title }}
                    </option>
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
                        <select [(ngModel)]="selectedRange" (ngModelChange)="getPerformanceData()" class="bg-white border border-purple-700 rounded-md px-3 py-1 text-purple-700 font-semibold focus:outline-none" aria-label="Select date range">
                            <option *ngFor="let option of dateRangeOptions" [ngValue]="option">{{ option.label }}</option>
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
                        <div style="display: block;">
                            <canvas baseChart [data]="lineChartData" [options]="lineChartOptions" [type]="'line'"> </canvas>
                        </div>
                    </div>

                    <!-- <div class="flex-grow flex items-center justify-center text-gray-900 font-normal text-base">No data to display</div> -->
                </div>
            </section>
        </main>
    `,
    styles: `
        canvas {
            max-width: 1000px;
            max-height: 300px;
            width: 100%; /* cho responsive */
            height: auto;
            margin: auto;
            display: block;
        }
    `
})
export class PerformanceOverviewComponent implements OnInit {
    private apiUrl = 'http://localhost:8080';
    courses: any[] = [];
    selectedCourseId: string = 'all';
    selectedRange: DateRangeOption | null = null;
    errorMessage: string | null = null;
    dateRangeOptions: DateRangeOption[] = [
        { label: 'Last 7 days', days: 7, months: 0 },
        { label: 'Last 30 days', days: 30, months: 0 },
        { label: 'Last 12 months', days: 0, months: 12 }
    ];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getCourses();
        this.selectedRange = this.dateRangeOptions[2]; // Default to "Last 12 months"
        this.getPerformanceData();
    }

    getCourses(): void {
        let params = new HttpParams();
            params = params.set('page', 0);
            params = params.set('size', 100);
            params = params.set('keyword','');
        this.http.get<any>(`${this.apiUrl}/instructor/my-courses`,{params}).subscribe({
            next: (response) => {
                this.courses = response.data.content;
            },
            error: (error) => {
                this.errorMessage = 'Failed to load courses. Please try again.';
                console.error('Error fetching courses:', error);
            }
        });
    }

    getPerformanceData(): void {
        let params = new HttpParams();
        if (this.selectedCourseId && this.selectedCourseId !== 'all') {
            params = params.set('courseId', this.selectedCourseId);
        }
        if (this.selectedRange) {
            if (this.selectedRange.days > 0) {
                params = params.set('days', this.selectedRange.days.toString());
            } else if (this.selectedRange.months > 0) {
                params = params.set('months', this.selectedRange.months.toString());
            }
        }
        console.log(params)
        this.http.get<any>(`${this.apiUrl}/dashboard/performance-overview`, { params }).subscribe({
            next: (response) => {
                if (response.success) {
                    this.updateChart(response.data);
                } else {
                    this.errorMessage = 'Failed to load performance data.';
                }
            },
            error: (error) => {
                this.errorMessage = 'Error fetching performance data.';
                console.error('Error fetching performance data:', error);
            }
        });
    }

    updateChart(data: any[]): void {
        this.lineChartData = {
            labels: data.map(item => item.date),
            datasets: [
                {
                    data: data.map(item => item.value),
                    label: 'Revenue',
                    tension: 0.4,
                    fill: true,
                    borderColor: '#7E42D9',
                    backgroundColor: 'transparent',
                    pointBackgroundColor: '#0d47a1'
                }
            ]
        };
    }

    public lineChartData: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: []
    };

    public lineChartOptions: ChartConfiguration<'line'>['options'] = {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    public lineChartType: ChartType = 'line';
}
interface DateRangeOption {
    label: string;
    days: number;
    months: number;
}
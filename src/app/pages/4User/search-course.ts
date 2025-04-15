import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
type LanguageKey = 'english' | 'vietnamese' | 'french';
type DurationKey = 'short' | 'medium' | 'long' | 'extended' | 'ultra';
interface Filters {
    rating: string;
    language: Record<LanguageKey, boolean>;
    duration: Record<DurationKey, boolean>;
    level: string;
    price: string;
}
@Component({
    selector: 'app-search-course',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [AccordionModule, CommonModule, RadioButtonModule, CheckboxModule, FormsModule, RouterLink],
    template: `
        <div class="search-wrapper">
            <div class="search-grid">
                <p class="search-title" class="text-3xl">{{ totalElements }} results for "{{ keyword }}"</p>
                <div class="filter-result-group">
                    <div class="bb-left">
                        <div class="relative inline-block w-64 frgleft">
                            <label class="block text-lg font-medium text-gray-700 mb-1">Sort by</label>
                            <select class="block appearance-none w-full bg-white border border-purple-500 text-gray-700 py-2 px-4 pr-10 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option>Most Relevant</option>
                                <option>Most Reviewed</option>
                                <option>Highest Rated</option>
                                <option>Newest</option>
                            </select>

                            <div class="pointer-events-none absolute top-1/2 right-3 transform -translate-y-3/2 text-gray-700">
                                <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.516 7.548L10 12.032l4.484-4.484L16 8.548 10 14.548 4 8.548z" />
                                </svg>
                            </div>
                        </div>
                        <button class="clear-filter bg-gray-500 hover:bg-gray-600 ms-2 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" (click)="clearFilters()">Clear Filter</button>
                    </div>
                    <span class="frgr" style="font-size:18px; font-weight:bold">{{ totalElements }} results</span>
                </div>
                <div class="filterColumn-content">
                    <div class="filter-mode">
                        <div class="filter-list">
                            <p-accordion [multiple]="true" class="filter-accordion">
                                <!-- Ratings -->
                                <p-accordion-panel>
                                    <p-accordion-header>Ratings</p-accordion-header>
                                    <p-accordion-content>
                                        <div *ngFor="let rating of ratingOptions">
                                            <input type="radio" [id]="'rating-' + rating.value" name="rating" [value]="rating.value" [(ngModel)]="filters.rating" (ngModelChange)="onFilterChange()" />
                                            <label [for]="'rating-' + rating.value">{{ rating.label }}</label
                                            ><br />
                                        </div>
                                    </p-accordion-content>
                                </p-accordion-panel>

                                <!-- Language -->
                                <p-accordion-panel>
                                    <p-accordion-header>Language</p-accordion-header>
                                    <p-accordion-content>
                                        <div *ngFor="let lang of languageOptions">
                                            <input type="checkbox" [id]="'language-' + lang.key" [(ngModel)]="filters.language[lang.key]" (ngModelChange)="onFilterChange()" />
                                            <label [for]="'language-' + lang.key">{{ lang.label }}</label
                                            ><br />
                                        </div>
                                    </p-accordion-content>
                                </p-accordion-panel>

                                <!-- Duration -->
                                <p-accordion-panel>
                                    <p-accordion-header>Duration</p-accordion-header>
                                    <p-accordion-content>
                                        <div *ngFor="let duration of durationOptions">
                                            <input type="checkbox" [id]="'duration-' + duration.key" [(ngModel)]="filters.duration[duration.key]" (ngModelChange)="onFilterChange()" />
                                            <label [for]="'duration-' + duration.key">{{ duration.label }}</label
                                            ><br />
                                        </div>
                                    </p-accordion-content>
                                </p-accordion-panel>

                                <!-- Level -->
                                <p-accordion-panel>
                                    <p-accordion-header>Level</p-accordion-header>
                                    <p-accordion-content>
                                        <div *ngFor="let level of levelOptions">
                                            <input type="radio" [id]="'level-' + level.value" name="level" [value]="level.value" [(ngModel)]="filters.level" (ngModelChange)="onFilterChange()" />
                                            <label [for]="'level-' + level.value">{{ level.label }}</label
                                            ><br />
                                        </div>
                                    </p-accordion-content>
                                </p-accordion-panel>

                                <!-- Price -->
                                <p-accordion-panel>
                                    <p-accordion-header>Price</p-accordion-header>
                                    <p-accordion-content>
                                        <div *ngFor="let price of priceOptions">
                                            <input type="radio" [id]="'price-' + price.value" name="price" [value]="price.value" [(ngModel)]="filters.price" (ngModelChange)="onFilterChange()" />
                                            <label [for]="'price-' + price.value">{{ price.label }}</label
                                            ><br />
                                        </div>
                                    </p-accordion-content>
                                </p-accordion-panel>
                            </p-accordion>
                        </div>
                    </div>
                    <div class="course-content">
                        <div *ngIf="isLoading" class="flex justify-center items-center h-64">
                            <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                        </div>

                        <ul class="course-list" *ngIf="!isLoading">
                            <li class="course-item" *ngFor="let item of courses" [routerLink]="['/course-detail', item.id]">
                                <img [src]="item.thumbnail" alt="" class="course-img rounded-lg" />
                                <div class="course-item-information">
                                    <p class="course-item-information-title font-semibold text-2xl">{{ item.title }}</p>
                                    <p class="course-item-information-subtitle text-l">{{ item.subtitle }}</p>

                                    <div class="flex items-baseline">
                                        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path
                                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                            />
                                        </svg>
                                        <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                        <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a>
                                    </div>
                                    <div class="hour-lecture-level">
                                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                        <span class="hour">12 hours</span>
                                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                        <span class="lecture dotted">204 lectures</span>
                                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                        <span class="level dotted">beginner</span>
                                    </div>
                                </div>
                                <span class="course-price">đ{{ item.discount_price | number: '1.0-0' }}</span>
                            </li>
                        </ul>
                        <!-- Pagination -->
                        <div class="pagination">
                            <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 0">Previous</button>

                            <button *ngFor="let page of [].constructor(totalPages); let i = index" (click)="goToPage(i)" [class.active]="i === currentPage">
                                {{ i + 1 }}
                            </button>

                            <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages - 1">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: `
        /* Accordion */
        .filter-accordion {
            margin: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            border: 1px solid #ddd;
        }

        .p-accordion-header {
            background-color: #ffffff;
            font-weight: bold;
            color: #333;
            padding: 10px;
            font-size: 16px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
        }

        .p-accordion-header:hover {
            background-color: #f2f2f2;
        }

        .p-accordion-content {
            padding: 10px 20px;
            background-color: #ffffff;
            border-top: 1px solid #ddd;
        }

        /* Radio button and Checkbox */
        input[type='radio'],
        input[type='checkbox'] {
            margin-right: 8px;
            cursor: pointer;
        }

        label {
            font-size: 14px;
            color: #555;
            margin-right: 15px;
            cursor: pointer;
        }

        label:hover {
            color: #333;
        }

        /* Style for checkboxes and radios when selected */
        input[type='radio']:checked + label,
        input[type='checkbox']:checked + label {
            font-weight: bold;
            color: #007bff;
        }

        /* Margin between the rows for radio buttons and checkboxes */
        p-accordion-content input[type='radio'],
        p-accordion-content input[type='checkbox'] {
            margin-bottom: 10px;
        }

        /* Accordion panel background */
        // .p-accordion-panel {
        //     margin-bottom: 10px;
        //     border-bottom: 1px solid #ddd;
        // }

        // .p-accordion-panel:last-child {
        //     border-bottom: none !important;
        // }

        // test
        .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
            background-color: transparent !important;
        }
        .p-accordionpanel {
            // border-top: none !important;
            // border-bottom: 1px solid #ccc !important;
        }

        /* Panel đầu tiên: thêm border-top */
        // .p-accordionpanel:first-child {
        //     border-top: 1px solid #ccc !important;
        // }

        /* Panel cuối cùng: đảm bảo có border-bottom */
        // .p-accordionpanel:last-child {
        //     border-bottom: 1px solid #ccc !important;
        // }

        .p-accordionheader {
            padding-left: 0 !important;
            border: none !important;
            background-color: transparent !important;
            font-size: 16px !important;
            font-weight: 800 !important;
            color: rgb(81, 78, 81) !important;
        }

        .p-accordioncontent-content {
            border: none !important;
            background-color: transparent !important;
            padding: 10px 0 !important;
        }

        .search-wrapper {
            margin-top: 30px;
            width: 100%;
        }
        .search-grid {
            width: 80%;
            margin: 0 auto;
        }
        .filter-result-group {
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .filter-list {
            margin-top: 15px;
        }
        .filterColumn-content {
            display: flex;
        }
        .filter-mode {
            flex: 1;
        }
        .course-content {
            margin-left: 15px;
            margin-top: 15px;
            flex: 3;
        }
        .course-item {
            padding: 10px;
            display: flex;
            align-items: start;
            justify-content: space-between;
        }
        .course-item:hover {
            padding: 10px;
            background-color: rgba(157, 154, 157, 0.18);
            cursor: pointer;
        }
        .course-list {
            flex-direction: column;
            display: flex;
            gap: 25px;
        }
        .course-img {
            width: 25%;
            margin-right: 10px;
        }
        .course-item-information {
            width: 65%;
        }
        .course-price {
            margin-left: 10px;
            text-align: right;
            font-size: 18px;
            font-weight: bold;
        }
        // pagination
        .pagination {
            margin-top: 20px;
            display: flex;
            gap: 8px;
            align-items: center;
            justify-content: center;
        }

        .pagination button {
            padding: 6px 12px;
            border: none;
            background-color: #eee;
            cursor: pointer;
        }

        .pagination button.active {
            background-color: #8d55e2;
            color: white;
            font-weight: bold;
        }

        .pagination button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    `,
    providers: []
})
export class SearchCourseComponent implements OnInit {
    isLoading: boolean = true;
    currentPage = 0;
    pageSize = 8;
    totalPages = 0;
    filtersa: any;
    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
            this.currentPage = page;
            this.loadCourses();
        }
    }
    totalElements: any;
    keyword: string | null = '';
    courses: any[] = [];

    constructor(
        private http: HttpClient,
        private router: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.router.paramMap.subscribe((params) => {
            this.keyword = params.get('keyword');
            console.log('Keyword:', this.keyword);
            this.loadCourses();
        });
    }
    loadCourses() {
        const request = this.buildFilterRequest();
        console.log('Filter Request:', request);

        const params = new HttpParams().set('page', this.currentPage.toString()).set('size', this.pageSize.toString());

        this.http.post<any>(`http://localhost:8080/course/search`, request, { params }).subscribe((response) => {
            this.courses = response.data.content;
            this.totalPages = response.data.totalPages;
            this.totalElements = response.data.totalElements;

            const startTime = Date.now();
            const elapsed = Date.now() - startTime;
            const remainingTime = 500 - elapsed;

            if (remainingTime > 0) {
                setTimeout(() => {
                    this.isLoading = false;
                }, remainingTime);
            } else {
                this.isLoading = false;
            }
        });
    }

    onFilterChange() {
        this.currentPage = 0;
        this.loadCourses();
    }

    ratingOptions = [
        { label: '3.0 ★ & up', value: '3.0' },
        { label: '3.5 ★ & up', value: '3.5' },
        { label: '4.0 ★ & up', value: '4.0' },
        { label: '4.5 ★ & up', value: '4.5' }
    ];

    languageOptions: { key: LanguageKey; label: string }[] = [
        { key: 'english', label: 'English' },
        { key: 'vietnamese', label: 'Vietnamese' },
        { key: 'french', label: 'French' }
    ];

    durationOptions: { key: DurationKey; label: string }[] = [
        { key: 'short', label: '0–1 hour' },
        { key: 'medium', label: '1–3 hours' },
        { key: 'long', label: '3–6 hours' },
        { key: 'extended', label: '6–17 hours' },
        { key: 'ultra', label: '17+ hours' }
    ];

    levelOptions = [
        { value: 'all', label: 'All Levels' },
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'expert', label: 'Expert' }
    ];

    priceOptions = [
        { value: 'free', label: 'Free' },
        { value: 'paid', label: 'Paid' }
    ];
    defaultFilters: Filters = {
        rating: '',
        language: {
          english: false,
          vietnamese: false,
          french: false
        },
        duration: {
          short: false,
          medium: false,
          long: false,
          extended: false,
          ultra: false
        },
        level: '',
        price: ''
      };

    filters: Filters = {
        rating: '', // 3.0, 3.5, 4.0, 4.5
        language: {
            english: false,
            vietnamese: false,
            french: false
        },
        duration: {
            short: false, // 0–1
            medium: false, // 1–3
            long: false, // 3–6
            extended: false, // 6–17
            ultra: false // 17+
        },
        level: '', // all, beginner, intermediate, expert
        price: '' // free, paid
    };
    searchKeyword: string | null = '';
    selectedCategoryId: number | null = null;
    sortByList: string[] = []; // ví dụ: ['price', 'rating']
    sortDirectionList: string[] = []; // ví dụ: ['asc', 'desc']

    buildFilterRequest() {
        const selectedLanguages: string[] = [];
        if (this.filters.language.english) selectedLanguages.push('english');
        if (this.filters.language.vietnamese) selectedLanguages.push('vietnamese');
        if (this.filters.language.french) selectedLanguages.push('french');

        let minDuration: number | null = null;
        let maxDuration: number | null = null;

        const durations = this.filters.duration;
        if (durations.short) {
            minDuration = minDuration === null ? 0 : Math.min(minDuration, 0);
            maxDuration = maxDuration === null ? 1 : Math.max(maxDuration, 1);
        }
        if (durations.medium) {
            minDuration = minDuration === null ? 1 : Math.min(minDuration, 1);
            maxDuration = maxDuration === null ? 3 : Math.max(maxDuration, 3);
        }
        if (durations.long) {
            minDuration = minDuration === null ? 3 : Math.min(minDuration, 3);
            maxDuration = maxDuration === null ? 6 : Math.max(maxDuration, 6);
        }
        if (durations.extended) {
            minDuration = minDuration === null ? 6 : Math.min(minDuration, 6);
            maxDuration = maxDuration === null ? 17 : Math.max(maxDuration, 17);
        }
        if (durations.ultra) {
            minDuration = minDuration === null ? 17 : Math.min(minDuration, 17);
            maxDuration = null; // vô hạn
        }

        let isFree: boolean | null = null;
        if (this.filters.price === 'free') isFree = true;
        else if (this.filters.price === 'paid') isFree = false;

        return {
            keyword: this.keyword?.trim() || '',
            languages: selectedLanguages,
            level: this.filters.level !== 'all' ? this.filters.level : null,
            categoryId: this.selectedCategoryId || null,
            isFree: isFree,
            minDuration: minDuration,
            maxDuration: maxDuration,
            avgRatings: this.filters.rating ? parseFloat(this.filters.rating) : null,
            sortByList: this.sortByList,
            sortDirectionList: this.sortDirectionList
        };
    }
    clearFilters() {
        this.filters.rating = '';
        this.filters.level = '';
        this.filters.price = '';
      
        for (const lang in this.filters.language) {
          this.filters.language[lang as LanguageKey] = false;
        }
      
        for (const dur in this.filters.duration) {
          this.filters.duration[dur as DurationKey] = false;
        }
      
        this.onFilterChange();
      }
      
      
    // Trong component TypeScript
    getLanguageFilter(key: string): boolean {
        return this.filters.language[key as LanguageKey];
    }

    getDurationFilter(key: string): boolean {
        return this.filters.duration[key as DurationKey];
    }
}

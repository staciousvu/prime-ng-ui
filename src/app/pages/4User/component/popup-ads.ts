import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-popup',
    standalone: true,
    imports: [CommonModule,RouterLink],
    template: `
        <div class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" *ngIf="showPopup">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-fadeIn">
    <!-- Close button - Positioned absolutely -->
    <button
      class="absolute top-3 right-3 bg-white dark:bg-gray-700 rounded-full p-1 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
      (click)="closePopup()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Course thumbnail -->
    <div class="w-full md:w-1/2 h-48 md:h-auto relative">
      <img
        [src]="course.thumbnail"
        alt="Course Thumbnail"
        class="h-full w-full object-cover"
      />
      <!-- Overlay labels -->
      <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
        <span class="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded mr-2">
          {{ course.level }}
        </span>
        <span class="inline-block px-2 py-1 bg-green-600 text-white text-xs font-medium rounded">
          12 giờ
        </span>
      </div>
    </div>

    <!-- Course information -->
    <div class="w-full md:w-1/2 p-6 flex flex-col justify-between">
      <div>
        <!-- Course title and basic info -->
        <h3 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {{ course.title }}
        </h3>
        <p class="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {{ course.subtitle }}
        </p>
        
        <!-- Author info with icon -->
        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Tác giả: <span class="font-medium">{{ course.authorName }}</span></span>
        </div>
        
        <!-- Rating -->
        <div class="flex items-center text-sm mb-4">
          <div class="flex items-center text-yellow-500 mr-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span class="font-bold ml-1">{{ course.avgRating }}</span>
          </div>
          <span class="text-gray-400 text-sm">({{ course.countRating }} đánh giá)</span>
        </div>
        
        <!-- Course stats with icons -->
        <div class="flex flex-wrap gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div class="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>12 giờ</span>
          </div>
          <div class="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>100 bài học</span>
          </div>
        </div>
      </div>

      <!-- Price and action button -->
      <div class="mt-2 flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-gray-500 dark:text-gray-400 text-sm line-through">đ{{ course.price | number: '1.0-0' }}</span>
          <span class="text-xl font-bold text-red-600">đ{{ course.discount_price | number: '1.0-0' }}</span>
        </div>
        <a
          [routerLink]="['/course-detail', course.id]"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          (click)="closePopup()"
        >
          <span>Xem khóa học</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
    `,
    styles: `
    
    `
})
export class PopupComponent implements OnInit{
    @Input() course: any;
  showPopup = false;

  ngOnInit(): void {
    const isClosed = sessionStorage.getItem('ad_popup_closed');
    if (!isClosed) {
      this.showPopup = true;
    }
  }

  closePopup(): void {
    this.showPopup = false;
    sessionStorage.setItem('ad_popup_closed', 'true');
  }
    
    
}

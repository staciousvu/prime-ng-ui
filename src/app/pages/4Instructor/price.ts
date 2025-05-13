import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderControlService } from '../service/header.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../service/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-course-price',
    standalone: true,
    imports: [RouterModule, CommonModule, FormsModule],
    template: `
        
<section class="bg-gradient-to-b from-gray-50 to-white flex-grow max-w-6xl min-w-0 border border-gray-200 rounded-lg shadow-sm pb-8">
  <div class="px-8 py-6 space-y-6 w-full">
    <!-- Header -->
    <div class="border-b border-gray-200 pb-4">
      <h2 class="font-bold text-gray-800 text-xl">Đặt giá cho khóa học của bạn</h2>
      <p class="text-gray-600 mt-2 leading-relaxed">
        Vui lòng chọn loại tiền tệ và mức giá cho khóa học của bạn. Nếu bạn muốn cung cấp khóa học miễn phí,
        khóa học đó phải có tổng thời lượng video dưới 2 giờ. Ngoài ra, các khóa học có bài kiểm tra thực hành không được miễn phí.
      </p>
    </div>

    <!-- Form -->
    <form class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Price Tier Selection -->
        <div class="space-y-2">
          <label for="price" class="block font-medium text-gray-700 flex items-center gap-1.5">
            Mức giá
            <span class="group relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-gray-400 cursor-help">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
              </svg>
              <span class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 w-48">
                Chọn mức giá phù hợp cho khóa học của bạn
              </span>
            </span>
          </label>
          <div class="relative">
            <select
              id="price"
              [(ngModel)]="course.price"
              name="price"
              class="block w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
            >
              <option [ngValue]="null" disabled>Chọn mức giá</option>
              <option *ngFor="let lvl of priceTiers" [ngValue]="lvl.value">{{ lvl.name }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Có thể thêm trường khác ở đây nếu cần -->
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
        <!-- <button type="button" class="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 font-medium">
          Hủy
        </button> -->
        <button 
          (click)="save()" 
          type="submit" 
          class="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium transition-all duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Lưu thay đổi
        </button>
      </div>
    </form>
  </div>
</section>
    `,
    styles: ``
})
export class EditCoursePriceComponent implements OnInit {
    courseId: number = 0;
    course: any | null;
    constructor(
        private headerService: HeaderControlService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.parent?.paramMap.subscribe((params) => {
            this.courseId = +params.get('id')!;
        });
        this.http.get<any>(`http://localhost:8080/course/basicinfo/${this.courseId}`).subscribe(
            (response) => {
                this.course = response.data;
            },
            (error) => {
                console.error('Error fetching course details:', error);
            }
        );
        // this.headerService.setControls([
        //     {
        //         type: 'button',
        //         label: 'Save',
        //         action: () => this.save(),
        //         disabled: false
        //     },
        //     {
        //         type: 'button',
        //         label: 'Continue',
        //         action: () => console.log('heelo'),
        //         disabled: false
        //     }
        // ]);
    }
    save() {
      console.log(this.course.description);
      const data = {
          title: this.course.title,
          subtitle: this.course.subtitle,
          price: this.course.price,
          description: this.course.description,
          language: this.course.language,
          level: this.course.level,
      };
      this.http.put<any>(`http://localhost:8080/course/${this.courseId}`, data).subscribe((res) => {
          this.toastService.addToast('success', 'Update price successfully');
      });
  }
    priceTiers = [
        { name: 'Free', value: 0 },
        { name: '$129.000', value: 129000 },
        { name: '$229.000', value: 229000 },
        { name: '$349.000', value: 349000 },
        { name: '$449.000', value: 449000 }
    ];
}

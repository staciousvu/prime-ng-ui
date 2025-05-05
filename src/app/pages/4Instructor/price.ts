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
        <section class="bg-white rounded-md shadow-sm flex-grow w-full min-w-0 border border-[#E2E8F0] pb-14" aria-label="Intended learners">
        <header class="border-b border-[#E2E8F0] px-10 py-2 flex justify-center items-center">
                <h1 class="text-2xl font-semibold text-[#1E293B] mb-0">Price</h1>
            </header>
            <div class="px-10 pt-10 space-y-8 text-[#334155] text-lg font-normal w-full">
                <div class="w-full">
                    <h2 class="font-semibold text-gray-900 text-base mb-2">Đặt giá cho khóa học của bạn</h2>
                    <p class="text-gray-900 text-base mb-6 leading-relaxed">
                        Vui lòng chọn loại tiền tệ và mức giá cho khóa học của bạn. Nếu bạn muốn cung cấp khóa học miễn phí, khóa học đó phải có tổng thời lượng video dưới 2 giờ. Ngoài ra, các khóa học có bài kiểm tra thực hành không được miễn phí.
                    </p>
                    <form class="flex flex-wrap gap-x-6 gap-y-4 items-end">
                        <div>
                            <label for="priceTier" class="block font-semibold text-gray-900 text-sm mb-1 flex items-center gap-1">
                                Price Tier
                                <i class="fas fa-info-circle text-gray-500 text-xs" title="Select the price tier for your course"></i>
                            </label>
                            <select
                                id="price"
                                [(ngModel)]="course.price"
                                name="price"
                                class="bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option [ngValue]="null" disabled>Choose a pricetier</option>
                                <option *ngFor="let lvl of priceTiers" [ngValue]="lvl.value">{{ lvl.name }}</option>
                            </select>

                        </div>
                        <button (click)="save()" type="submit" class="bg-blue-700 text-white font-semibold rounded-md px-5 py-2.5 text-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600">Save</button>
                    </form>
                </div>
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

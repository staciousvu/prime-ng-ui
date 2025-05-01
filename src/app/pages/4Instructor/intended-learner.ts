import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderControlService } from '../service/header.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../service/toast.service';

@Component({
    selector: 'app-edit-course-intended-learner',
    // standalone:true,
    imports: [RouterModule, CommonModule, FormsModule],
    template: `
        <section class="bg-white rounded-md shadow-sm flex-grow max-w-6xl min-w-0 border border-[#E2E8F0] pb-14" aria-label="Intended learners">
        <header class="border-b border-[#E2E8F0] px-10 py-2 flex justify-center items-center">
                <h1 class="text-2xl font-semibold text-[#1E293B] mb-0">Intended learner</h1>
            </header>
            <div class="px-10 pt-10 space-y-8 text-[#334155] text-base font-normal max-w-4xl">
                <p>
                    Các mô tả sau đây sẽ hiển thị công khai trên trang
                    <a href="#" class="text-purple-700 underline hover:text-purple-800">chi tiết khóa học</a>
                    của bạn và sẽ có tác động trực tiếp đến hiệu suất khóa học của bạn. Các mô tả này sẽ giúp người học quyết định xem khóa học của bạn có phù hợp với họ không.
                </p>

                <div class="mt-6">
                    <p class="font-bold text-xl text-[#1E293B] mb-3">Học sinh sẽ học được gì trong khóa học của bạn?</p>
                    <p class="mb-5">Bạn phải nhập ít nhất 4 mục tiêu hoặc kết quả học tập mà người học có thể mong đợi đạt được sau khi hoàn thành khóa học.</p>

                    <form class="space-y-5">
                        <div *ngFor="let item of courseContent; let i = index; trackBy: trackByIndexCC " class="flex items-center justify-between border border-[#CBD5E1] rounded-md px-5 py-3 text-[#64748B] text-base focus-within:border-purple-500 transition-all duration-200">
                            <input type="text" [(ngModel)]="courseContent[i]" [name]="'coursecontent' + i" placeholder="Ví dụ: Define the roles and responsibilities of a project manager" class="w-full text-gray-600 placeholder-gray-400 bg-transparent rounded focus:outline-none" />
                            <span class="ml-5 text-[#64748B]">160</span>
                        </div>
                    </form>
                    <p class="mt-2 text-sm text-red-500 italic">
                        {{ errorMessageContent }}
                    </p>


                    <button type="button" class="mt-6 inline-flex items-center text-purple-700 font-semibold text-base hover:text-purple-800 focus:outline-none" (click)="addInputCourseContent()">
                        <i class="fas fa-plus mr-2"></i> Add more to your response
                    </button>
                </div>

                <div class="mt-6">
                    <p class="font-bold  text-xl text-[#1E293B] mb-3">Yêu cầu hoặc điều kiện tiên quyết để tham gia khóa học của bạn là gì?</p>
                    <p class="mb-5">
                        Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị cần thiết mà người học cần có trước khi tham gia khóa học của bạn. Nếu không có yêu cầu nào, hãy sử dụng không gian này như một cơ hội để giảm rào cản cho người mới bắt
                        đầu.
                    </p>

                    <form class="space-y-5">
                        <div *ngFor="let item of courseRequirement; let i = index; trackBy: trackByIndexCR" class="flex items-center justify-between border border-[#CBD5E1] rounded-md px-5 py-3 text-[#64748B] text-base focus-within:border-purple-500 transition-all duration-200">
                            <input
                                type="text"
                                [(ngModel)]="courseRequirement[i]"
                                [name]="'courserequirement' + i"
                                placeholder="Ví dụ: No programming experience needed. You will learn everything you need to know"
                                class="w-full text-gray-600 placeholder-gray-400 bg-transparent rounded focus:outline-none"
                            />
                        </div>
                    </form>
                    <p class="mt-2 text-sm text-red-500 italic">
                        {{ errorMessageRequirement }}
                    </p>

                    <button type="button" class="mt-6 inline-flex items-center text-purple-700 font-semibold text-base hover:text-purple-800 focus:outline-none"  (click)="addInputCourseRequirement()">
                        <i class="fas fa-plus mr-2"></i> Add more to your response
                    </button>
                </div>
                <div class="mt-6">
                    <p class="font-bold  text-xl text-[#1E293B] mb-3">Khóa học này dành cho ai?</p>
                    <p class="mb-5">Viết mô tả rõ ràng về những người học dự kiến ​​cho khóa học của bạn, những người sẽ thấy nội dung khóa học của bạn có giá trị. Điều này sẽ giúp bạn thu hút đúng người học vào khóa học của mình.</p>

                    <form class="space-y-5">
                        <div *ngFor="let item of courseTarget; let i = index; trackBy: trackByIndexCT" class="flex items-center justify-between border border-[#CBD5E1] rounded-md px-5 py-3 text-[#64748B] text-base focus-within:border-purple-500 transition-all duration-200">
                            <input type="text" [(ngModel)]="courseTarget[i]" [name]="'coursetarget' + i" 
                            placeholder="Ví dụ: Beginner Python developers curious about data science" 
                            class="w-full text-gray-600 placeholder-gray-400 bg-transparent rounded focus:outline-none" />
                        </div>
                    </form>
                    <p class="mt-2 text-sm text-red-500 italic">
                        {{ errorMessageTarget }}
                    </p>

                    <button type="button" class="mt-6 inline-flex items-center text-purple-700 font-semibold text-base hover:text-purple-800 focus:outline-none" (click)="addInputCourseTarget()">
                        <i class="fas fa-plus mr-2"></i> Add more to your response
                    </button>
                </div>
            </div>
        </section>
    `,
    styles: ``
})
export class EditCourseIntendedLearnerComponent implements OnInit, OnDestroy {
    courseId: number = 0;
    courseContent: string[] = ['', '', '', ''];
    courseRequirement: string[] = [''];
    courseTarget: string[] = [''];
    errorMessageContent: string='';
    errorMessageRequirement:string='';
    errorMessageTarget:string='';


    addInputCourseContent(): void {
        if (this.courseContent.some(item => item.trim() === '')) {
            this.errorMessageContent = 'Vui lòng điền đầy đủ các mục hiện có trước khi thêm mục mới.';
            return;
        }
        this.errorMessageContent = '';
        this.courseContent.push('');
    }
    
    addInputCourseRequirement(): void {
        if (this.courseRequirement.some(item => item.trim() === '')) {
            this.errorMessageRequirement = 'Vui lòng điền đầy đủ các mục hiện có trước khi thêm mục mới.';
            return;
        }
        this.errorMessageRequirement = '';
        this.courseRequirement.push('');
    }
    
    addInputCourseTarget(): void {
        if (this.courseTarget.some(item => item.trim() === '')) {
            this.errorMessageTarget = 'Vui lòng điền đầy đủ các mục hiện có trước khi thêm mục mới.';
            return;
        }
        this.errorMessageTarget = '';
        this.courseTarget.push('');
    }
    
    constructor(
        private headerService: HeaderControlService,
        private http: HttpClient,
        private route: ActivatedRoute,
        private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.route.parent?.paramMap.subscribe((params) => {
            this.courseId = +params.get('id')!;
        });
        this.http.get<any>(`http://localhost:8080/course-content/${this.courseId}`).subscribe(
            (response)=>{
                const result:any[] = response.data;
                if(result.length>0){
                    this.courseContent = result.map(item=>{
                        return item.title;
                    })
                }
                console.log(this.courseContent)
            }
        )
        this.http.get<any>(`http://localhost:8080/course-requirement/${this.courseId}`).subscribe(
            (response)=>{
                const result:any[] = response.data;
                if(result.length>0){
                    this.courseRequirement = result.map(item=>{
                        return item.title;
                    })
                }
                console.log(this.courseContent)
            }
        )
        this.http.get<any>(`http://localhost:8080/course-target/${this.courseId}`).subscribe(
            (response)=>{
                const result:any[] = response.data;
                if(result.length>0){
                    this.courseTarget = result.map(item=>{
                        return item.title;
                    })
                }
                console.log(this.courseContent)
            }
        )

        this.headerService.setControls([
            {
                type: 'button',
                label: 'Save',
                action: () => this.onSave(),
                disabled: false
            }
        ]);
    }

    onSave() {
        const ccValid = this.courseContent.filter((item) => item.trim() !== '');
        const crValid = this.courseRequirement.filter((item) => item.trim() !== '');
        const ctValid = this.courseTarget.filter((item) => item.trim() !== '');
    
        // Reset lỗi
        this.errorMessageContent = '';
        this.errorMessageRequirement = '';
        this.errorMessageTarget = '';
    
        let isValid = true;
    
        if (ccValid.length < 4) {
            this.errorMessageContent = 'Vui lòng nhập ít nhất 4 nội dung khóa học.';
            isValid = false;
        }
        if (crValid.length < 1) {
            this.errorMessageRequirement = 'Vui lòng nhập ít nhất 1 yêu cầu khóa học.';
            isValid = false;
        }
        if (ctValid.length < 1) {
            this.errorMessageTarget = 'Vui lòng nhập ít nhất 1 đối tượng học viên.';
            isValid = false;
        }
    
        if (!isValid) return; // Không submit nếu có lỗi
    
        const request = {
            contents: ccValid.map((content) => ({ title: content })),
            requirements: crValid.map((content) => ({ title: content })),
            targets: ctValid.map((content) => ({ title: content }))
        };
    
        this.http.post<any>(`http://localhost:8080/course-content/save3/${this.courseId}`, request).subscribe((response) => {
            this.toastService.addToast('success', 'Cập nhật thông tin khóa học thành công');
        });
    }
    

    ngOnDestroy(): void {
        this.headerService.clearControls();
    }
    trackByIndexCC(index: number, item: string): number {
        return index;
    }
    trackByIndexCR(index: number, item: string): number {
        return index;
    }
    trackByIndexCT(index: number, item: string): number {
        return index;
    }
}

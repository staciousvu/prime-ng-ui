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
    <div class="container">
    <!-- <div class="header">
      <h1>Tạo khóa học mới</h1>
      <p>Thiết lập thông tin để thu hút học viên tiềm năng</p>
    </div> -->
    
    <div class="course-form">
      <div class="form-section">
        <div class="form-section-header">
          <div class="form-section-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="form-section-title">
            <h2>Mục tiêu học tập</h2>
            <p>Những gì học viên sẽ đạt được sau khi hoàn thành khóa học của bạn</p>
          </div>
        </div>
        
        <div class="input-list" id="learning-objectives">
          <div *ngFor="let item of courseContent; let i = index; trackBy: trackByIndexCC " class="input-item">
            <div class="input-wrapper">
              <input [(ngModel)]="courseContent[i]" [name]="'coursecontent' + i" type="text" placeholder="Ví dụ: Hiểu và áp dụng các nguyên tắc cơ bản của thiết kế UX/UI" maxlength="160">
              <span class="char-count">160</span>
              <button class="remove-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <p class="error-message" id="error-objectives">{{ errorMessageContent }}</p>
        </div>
        
        <button (click)="addInputCourseContent()" class="add-button" id="add-objective">
          <i class="fas fa-plus"></i> Thêm mục tiêu học tập
        </button>
      </div>
      
      <div class="form-section">
        <div class="form-section-header">
          <div class="form-section-icon">
            <i class="fas fa-list-check"></i>
          </div>
          <div class="form-section-title">
            <h2>Yêu cầu tiên quyết</h2>
            <p>Các kỹ năng hoặc kiến thức cần có trước khi tham gia khóa học</p>
          </div>
        </div>
        
        <div class="input-list" id="prerequisites">
          <div *ngFor="let item of courseRequirement; let i = index; trackBy: trackByIndexCR" class="input-item">
            <div class="input-wrapper">
              <input [(ngModel)]="courseRequirement[i]" [name]="'courserequirement' + i" type="text" placeholder="Ví dụ: Kiến thức cơ bản về thiết kế đồ họa">
              <button class="remove-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <p class="error-message" id="error-prerequisites">{{ errorMessageRequirement }}</p>
        </div>
        
        <button (click)="addInputCourseRequirement()" class="add-button" id="add-prerequisite">
          <i class="fas fa-plus"></i> Thêm yêu cầu tiên quyết
        </button>
      </div>
      
      <div class="form-section">
        <div class="form-section-header">
          <div class="form-section-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="form-section-title">
            <h2>Đối tượng mục tiêu</h2>
            <p>Những học viên lý tưởng cho khóa học của bạn</p>
          </div>
        </div>
        
        <div class="input-list" id="target-audience">
          <div *ngFor="let item of courseTarget; let i = index; trackBy: trackByIndexCT" class="input-item">
            <div class="input-wrapper">
              <input [(ngModel)]="courseTarget[i]" [name]="'coursetarget' + i"  type="text" placeholder="Ví dụ: Sinh viên ngành thiết kế muốn nâng cao kỹ năng thực hành">
              <button class="remove-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <p class="error-message" id="error-audience">{{ errorMessageTarget }}</p>
        </div>
        
        <button (click)="addInputCourseTarget()" class="add-button" id="add-target">
          <i class="fas fa-plus"></i> Thêm đối tượng mục tiêu
        </button>
      </div>
      
    
    <div class="form-actions">
      <button (click)="onSave()" class="btn btn-primary">Lưu và tiếp tục</button>
    </div>
  </div>
        

    `,
    styles: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      background-color: #f8fafc;
      color: #334155;
      line-height: 1.6;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      padding: 2rem;
      text-align: center;
    }
    
    .header h1 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .header p {
      font-size: 1rem;
      opacity: 0.9;
    }
    
    .course-form {
      padding: 2rem;
    }
    
    .form-section {
      margin-bottom: 2.5rem;
      background-color: white;
      border-radius: 12px;
      padding: 1.5rem;
      // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
      // border-left: 4px solid #3b82f6;
    }
    
    .form-section-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .form-section-icon {
      background-color: #eff6ff;
      color: #3b82f6;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      font-size: 1.2rem;
    }
    
    .form-section-title {
      flex: 1;
    }
    
    .form-section-title h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }
    
    .form-section-title p {
      font-size: 0.875rem;
      color: #64748b;
    }
    
    .input-list {
      margin-top: 1.5rem;
    }
    
    .input-item {
      position: relative;
      margin-bottom: 1rem;
    }
    
    .input-wrapper {
      display: flex;
      align-items: center;
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      transition: all 0.2s ease;
    }
    
    .input-wrapper:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
    
    .input-wrapper input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 0.5rem;
      font-size: 0.95rem;
      color:rgb(12, 13, 13);
      width: 100%;
    }
    
    .input-wrapper input:focus {
      outline: none;
    }
    
    .input-wrapper .char-count {
      color: #94a3b8;
      font-size: 0.875rem;
      margin-left: 8px;
    }
    
    .input-wrapper .remove-btn {
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      margin-left: 8px;
      font-size: 1rem;
      opacity: 0.6;
      transition: opacity 0.2s;
    }
    
    .input-wrapper .remove-btn:hover {
      opacity: 1;
      color: #ef4444;
    }
    
    .add-button {
      display: inline-flex;
      align-items: center;
      background-color: transparent;
      color: #3b82f6;
      border: none;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.95rem;
      transition: all 0.2s;
    }
    
    .add-button:hover {
      background-color: #eff6ff;
    }
    
    .add-button i {
      margin-right: 0.5rem;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
      padding: 1rem 2rem;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-secondary {
      background-color: white;
      color: #64748b;
      border: 1px solid #e2e8f0;
      margin-right: 1rem;
    }
    
    .btn-secondary:hover {
      background-color: #f8fafc;
    }
    
    .btn-primary {
      background-color: #3b82f6;
      color: white;
      border: none;
    }
    
    .btn-primary:hover {
      background-color: #2563eb;
    }
    
    .error-message {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 0.5rem;
      font-style: italic;
    }
    
    /* Hiệu ứng thêm */
    .input-wrapper.new-item {
      animation: fadeIn 0.5s;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .container {
        margin: 0;
        border-radius: 0;
      }
      
      .course-form {
        padding: 1rem;
      }
      
      .form-section {
        padding: 1rem;
      }
    }
    `
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

        // this.headerService.setControls([
        //     {
        //         type: 'button',
        //         label: 'Save',
        //         action: () => this.onSave(),
        //         disabled: false
        //     }
        // ]);
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

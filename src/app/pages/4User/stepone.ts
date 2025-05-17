import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-stepone',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="progress-wrapper">
            <div class="progress-bar"></div>
        </div>
        <div class="container">
            <!-- <div class="question-box">Answer a few questions to improve your content recommendations</div> -->
            <div class="question-box">Trả lời 1 số câu hỏi để chúng tôi dễ dàng đề xuất khóa học cho bạn</div>
            <h2>Bạn quan tâm đến danh mục nào?</h2>

            <form>
                <div class="grid">
                    <!-- <label *ngFor="let item of rootCategories.categories"><input [checked]="item.id === rootCategories.prefRootId" type="radio" name="field"> {{item.name}}</label> -->
                    <div class="radio-group">
                        <label *ngFor="let item of rootCategories.categories" class="radio-item">
                            <input type="radio" name="field" [value]="item.id" [(ngModel)]="prefRootId" (ngModelChange)="onPrefRootIdChange()" />
                            <span class="custom-radio"></span>
                            {{ item.name }}
                        </label>
                    </div>
                </div>
            </form>
        </div>
        <div class="footer">
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded" (click)="onNext()">Next</button>
        </div>
    `,

    styles: `
        /* Main container */
        .container {
            max-width: 800px;
            margin: 100px auto;
            padding: 50px;
            padding-top: 10px;
            padding-bottom: 100px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .question-box {
            background-color: #fff5e6;
            padding: 15px 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            font-size: 16px;
        }

        h2 {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 25px;
            color: #222;
        }

        /* Grid for two columns */
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 40px;
            margin-bottom: 30px;
        }

        /* Radio styles */
        .radio-group {
            display: contents; /* để giữ layout theo .grid */
        }

        .radio-item {
            position: relative;
            display: flex;
            align-items: center;
            padding: 12px 16px;
            background: #f7f7f7;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.2s ease;
            color: #333;
        }

        .radio-item:hover {
            // border-color: #60A5FA;
            background-color: #60A5FA;
        }

        .radio-item input[type='radio'] {
            display: none;
        }

        .custom-radio {
            width: 18px;
            height: 18px;
            border: 2px solid #999;
            border-radius: 50%;
            margin-right: 12px;
            position: relative;
            flex-shrink: 0;
        }

        .radio-item input[type='radio']:checked + .custom-radio {
            border-color: #60A5FA;
            background-color: #60A5FA;
        }

        .radio-item input[type='radio']:checked + .custom-radio::after {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: white;
        }

        /* Footer */
        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: white;
            border-top: 1px solid #ddd;
            padding: 15px 30px;
            display: flex;
            justify-content: flex-end;
            z-index: 1000;
        }

        .next-btn {
            padding: 12px 24px;
            background-color: blue;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
        }

        .next-btn:hover {
            background-color: blue;
        }

        /* Progress Bar */
        .progress-wrapper {
            position: fixed;
            top: 60px;
            left: 0;
            width: 100%;
            background-color: #eee;
            height: 6px;
            z-index: 999;
        }

        .progress-bar {
            height: 100%;
            width: 50%; /* hoặc tùy bước */
            background-color: blue;
            transition: width 0.3s ease;
        }
    `
})
export class StepOneComponent implements OnInit {
    @Input() prefRootId: string | null = null;
    @Output() next = new EventEmitter<string | null>();
    @Output() prefRootIdChange = new EventEmitter<string | null>();
    rootCategories: any;
    ngOnInit(): void {
        this.http.get<any>(`http://localhost:8080/categories/survey/root`).subscribe({
            next: (response) => {
                this.rootCategories = response.data;
                console.log('root category prefRootId:', this.rootCategories.prefRootId);
                // Ưu tiên prefRootId từ component cha, nếu không có thì lấy từ API
                this.prefRootId = this.prefRootId ?? this.rootCategories.prefRootId ?? null;
                console.log('prefRootId after init:', this.prefRootId);

                // 👇 Emit luôn giá trị để cha nhận được dù người dùng chưa tương tác
                this.prefRootIdChange.emit(this.prefRootId);
            },
            error: (err) => {
                console.error('Failed to load categories', err);
            }
        });
    }
    constructor(private http: HttpClient) {}
    //nên gọi api lấy danh sách root category,đồng thời lấy root preference nếu có
    //đẩy data ra danh sách,nếu có root pref thì checked
    //
    onPrefRootIdChange() {
        this.prefRootIdChange.emit(this.prefRootId); // Thông báo thay đổi lên component cha
    }
    onNext() {
        this.next.emit(this.prefRootId);
        
      }
}

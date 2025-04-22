import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-steptwo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="progress-wrapper">
            <div class="progress-bar"></div>
        </div>

        <!-- Main Content -->
        <div class="container">
            <div class="question-box">Answer a few questions to improve your content recommendations</div>

            <h2>What topic are you learning for?</h2>

            <form>
                <div class="grid">
                    <label *ngFor="let item of TopicsByPrefId"><input type="checkbox" name="field[]" [value]="item.id" [checked]="selectedTopicsIds.includes(item.id)" (change)="onCheckboxChange($event, item.id)" /> {{ item.name }}</label>
                </div>
            </form>
        </div>

        <!-- Footer -->
        <div class="footer">
            <button type="submit" class="back-btn" (click)="prev.emit()">Back</button>
            <button type="button" class="next-btn" (click)="onSubmit()">Submit</button>
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

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 40px;
            margin-bottom: 30px;
        }

        label {
            display: flex;
            align-items: center;
            gap: 10px;
            background-color: #f9fafb;
            padding: 12px 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }

        label:hover {
            background-color: #eef2ff;
            border-color: #a5b4fc;
        }

        input[type='checkbox'] {
            accent-color: #7E42D9;
            width: 18px;
            height: 18px;
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
            justify-content: space-between;
            z-index: 1000;
        }

        .next-btn {
            padding: 12px 24px;
            background-color: #6a1b9a;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
        }
        .back-btn {
            padding: 12px 24px;
            background-color: #6a1b9a;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
        }

        .next-btn:hover,
        .back-btn:hover {
            background-color: #4a148c;
        }
        /* Progress Bar */
        .progress-wrapper {
            position: fixed;
            top: 60px; /* ngay dưới header cao 60px */
            left: 0;
            width: 100%;
            background-color: #eee;
            height: 6px;
            z-index: 999;
        }

        .progress-bar {
            height: 100%;
            width: 100%; /* hoặc 100% tùy bước */
            background-color: #a435f0; /* tím Udemy */
            transition: width 0.3s ease;
        }
    `
})
export class StepTwoComponent implements OnInit, OnChanges {
    @Input() prefRootId: string | null = null;
    @Output() prev = new EventEmitter<void>();

    selectedTopicsIds: any[] = [];
    TopicsByPrefId: any[] = [];

    constructor(private http: HttpClient,private router:Router) {}

    ngOnInit(): void {
        // Không cần làm gì ở đây nếu prefRootId chưa sẵn sàng
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['prefRootId'] && this.prefRootId) {
            console.log('prefRootId changed to:', this.prefRootId);
            this.http.get<any>(`http://localhost:8080/categories/survey/topic/${this.prefRootId}`).subscribe((response) => {
                this.TopicsByPrefId = response.data.categories;
                this.selectedTopicsIds = response.data.prefChoiceTopicIds;
            });
        }
    }
    onSubmit(): void {
        if (!this.prefRootId) return;

        const requestBody = {
            categoryRootId: Number(this.prefRootId),
            subCategoryIds: this.selectedTopicsIds
        };
        console.log('request body root id:'+requestBody.categoryRootId)
        console.log('request body sub ids:'+requestBody.subCategoryIds)

        this.http.post('http://localhost:8080/preference/edit', requestBody).subscribe({
            next: () => {
                
                this.router.navigate(['/home']);
                // TODO: emit hoặc chuyển sang bước tiếp theo nếu cần
            },
            error: (err) => {
                console.error('Error updating preferences:', err);
                alert('Có lỗi xảy ra, vui lòng thử lại.');
            }
        });
    }
    onCheckboxChange(event: Event, id: number): void {
        console.log('current selected : '+this.selectedTopicsIds)
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            if (!this.selectedTopicsIds.includes(id)) {
                this.selectedTopicsIds.push(id);
            }
        } else {
            this.selectedTopicsIds = this.selectedTopicsIds.filter((itemId) => itemId !== id);
        }
    }
}

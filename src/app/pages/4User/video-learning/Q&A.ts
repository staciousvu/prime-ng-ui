import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
    selector: 'app-qanda',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `

        <div class="max-w-4xl mx-auto px-4 py-0">
      <h2 class="text-2xl font-medium mb-6 text-gray-600">Thảo luận về khóa học</h2>

      <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg 
          transition duration-200 flex items-center mb-8 shadow-md"
          (click)="toggleAddDiscussion()">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    Thêm thảo luận
  </button>

      <div *ngIf="showNewDiscussion" class="bg-white p-6 rounded-xl shadow-lg mb-10 border border-gray-100 animate-fade-in">
    <textarea [(ngModel)]="newDiscussion"
              class="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-gray-700"
              rows="4"
              placeholder="Nhập nội dung thảo luận của bạn..."></textarea>
    <div class="flex justify-end space-x-4">
      <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-5 rounded-lg transition duration-200"
              (click)="toggleAddDiscussion()">Hủy</button>
      <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg transition duration-200 shadow-sm"
              (click)="saveNewDiscussion()">Gửi</button>
    </div>
  </div>

      <div class="space-y-8">
        <div *ngFor="let discussion of discussions" class="space-y-4">
          <div class="flex space-x-4">
            <img [src]="discussion.userAvatar" alt="avatar" class="w-10 h-10 rounded-full bg-gray-300">
            <div class="flex-1 bg-gray-100 p-4 rounded-lg">
              <div class="font-semibold text-gray-700">{{ discussion.userName }}</div>
              <div class="mt-1 text-gray-600">{{ discussion.content }}</div>
              <div class="mt-3 flex items-center text-sm text-gray-500 space-x-4">
                <button (click)="toggleReplyInput(discussion)" class="flex items-center space-x-1 hover:text-blue-500">
                  <i class="fas fa-reply"></i>
                  <span>Trả lời</span>
                </button>
                <span>{{ discussion.createdAt | date: 'short' }}</span>
              </div>
            </div>
          </div>

          <div *ngIf="discussion.showReplyInput" class="ml-16 animate-fade-in">
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <textarea [(ngModel)]="newReply"
                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 text-gray-700"
                    rows="3"
                    placeholder="Nhập câu trả lời của bạn..."></textarea>
          <div class="flex justify-end space-x-3">
            <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
                    (click)="toggleReplyInput(discussion)">Hủy</button>
            <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 shadow-sm"
                    (click)="submitReply(discussion)">Gửi</button>
          </div>
        </div>
      </div>

          <div *ngIf="!discussion.showReplies" class="text-sm text-blue-500 cursor-pointer ml-14"
               (click)="toggleReplies(discussion)">
            <i class="fas fa-reply"></i> Xem thêm
          </div>

          <div *ngIf="discussion.showReplies" class="space-y-4 ml-14">
            <div *ngFor="let reply of discussion.replies" class="flex space-x-4">
              <img [src]="reply.userAvatar" alt="avatar" class="w-9 h-9 rounded-full bg-blue-400">
              <div class="flex-1 bg-gray-50 p-4 rounded-lg">
                <div class="font-semibold text-gray-700">{{ reply.userName }}</div>
                <div class="mt-1 text-gray-600">{{ reply.content }}</div>
                <div class="mt-2 text-sm text-gray-400">{{ reply.createdAt | date: 'short' }}</div>
              </div>
            </div>

            <div class="text-sm text-blue-500 cursor-pointer" (click)="toggleReplies(discussion)">
              <i class="fas fa-reply"></i> Thu gọn
            </div>
          </div>

        </div>
      </div>
    </div>
    
    `,
    styles: `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease forwards;
    }
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    `
})
export class QAndAComponent {
    toggleAddDiscussion() {
        this.showNewDiscussion = !this.showNewDiscussion;
    }
    saveNewDiscussion() {
        if (this.newDiscussion && this.newDiscussion.trim() !== '') {
            const request = {
                courseId: this.courseId,
                lectureId: this.lectureId,
                content: this.newDiscussion
            };

            this.http.post<any>(`http://localhost:8080/discussions`, request).subscribe(
                (response) => {
                    const newDiscussion = {
                        id: response.data.id,
                        userAvatar: response.data.avatar || 'default-avatar.png',
                        userName: response.data.username || 'You',
                        content: this.newDiscussion,
                        createdAt: response.data.createdAt,
                        showReplies: false,
                        showReplyInput: false,
                        replies: []
                    };
                    this.discussions.unshift(newDiscussion);
                    this.newDiscussion = ''; // reset textarea
                    this.showNewDiscussion = false; // ẩn khung nhập
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }

    newReply: string = '';
    showNewDiscussion: boolean = false;
    newDiscussion: string = '';
    submitReply(discussion: any) {
        console.log(discussion);
        if (this.newReply && this.newReply.trim() !== '') {
            console.log('endter if');
            const requestPayload = {
                content: this.newReply
            };

            this.http.post<any>(`http://localhost:8080/reply?discussionId=${discussion.id}`, requestPayload).subscribe(
                (response) => {
                    // Push reply vào danh sách hiện tại
                    const newReply = {
                        userAvatar: response.data.avatar || 'default-avatar.png',
                        userName: response.data.username || 'You',
                        content: this.newReply,
                        createdAt:response.data.createdAt
                    };
                    // discussion.replies = discussion.replies || [];
                    discussion.replies.unshift(newReply);

                    // Reset form
                    this.newReply = '';
                    discussion.showReplyInput = false;
                    // discussion.showReplies = true;
                    // this.toggleReplies(discussion)
                },
                (error) => {
                    console.error('Lỗi khi gửi câu trả lời:', error);
                }
            );
        }
    }
    @Input() courseId: any;
    @Input() lectureId: any;
    discussions: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.loadDiscussions();
    }

    loadDiscussions(): void {
        this.http.get<any>(`http://localhost:8080/discussions/${this.courseId}?page=0&size=10`).subscribe(
            (response) => {
                this.discussions = response.data.content;
                this.discussions.forEach((discussion) => {
                    discussion.showReplies = false;
                    discussion.showReplyInput = false; // Khởi tạo trạng thái ô nhập liệu
                });
            },
            (error) => {
                console.error('Lỗi khi tải danh sách thảo luận:', error);
            }
        );
    }

    toggleReplies(discussion: any): void {
        if (!discussion.showReplies) {
            this.getRepliesByDiscussionId(discussion.id).subscribe((replies) => {
                discussion.replies = replies;
                discussion.showReplies = true;
            });
        } else {
            discussion.showReplies = false;
        }
    }

    toggleReplyInput(discussion: any): void {
        discussion.showReplyInput = !discussion.showReplyInput;
    }

    getRepliesByDiscussionId(discussionId: number): Observable<any[]> {
        return this.http.get<any>(`http://localhost:8080/discussions/${discussionId}/replies`).pipe(map((response) => response.data));
    }
}

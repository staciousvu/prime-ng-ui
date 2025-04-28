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
        <div class="max-w-3xl px-4 py-0">
      <h2 class="text-2xl font-medium mb-6 text-gray-600">Thảo luận về khóa học</h2>

      <button class="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mb-6"
              (click)="toggleAddDiscussion()">Thêm thảo luận</button>

      <div *ngIf="showNewDiscussion" class="bg-gray-100 p-4 rounded-lg mb-8 animate-fade-in">
        <textarea [(ngModel)]="newDiscussion"
                  class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                  rows="4"
                  placeholder="Nhập nội dung thảo luận"></textarea>
        <div class="flex justify-end space-x-4">
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                  (click)="toggleAddDiscussion()">Hủy</button>
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
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

          <!-- Ô nhập liệu trả lời -->
          <div *ngIf="discussion.showReplyInput" class="bg-gray-100 p-4 rounded-lg animate-fade-in max-w-2xl mx-auto">
            <textarea [(ngModel)]="newReply"
                      class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                      rows="3"
                      placeholder="Nhập câu trả lời của bạn..."></textarea>
            <div class="flex justify-end space-x-4">
              <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                      (click)="toggleReplyInput(discussion)">Hủy</button>
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                      (click)="submitReply(discussion)">Gửi</button>
            </div>
          </div>

          <!-- Nút Xem thêm -->
          <div *ngIf="!discussion.showReplies" class="text-sm text-blue-500 cursor-pointer ml-14"
               (click)="toggleReplies(discussion)">
            <i class="fas fa-reply"></i> Xem thêm
          </div>

          <!-- Hiển thị câu trả lời -->
          <div *ngIf="discussion.showReplies" class="space-y-4 ml-14">
            <div *ngFor="let reply of discussion.replies" class="flex space-x-4">
              <img [src]="reply.userAvatar" alt="avatar" class="w-9 h-9 rounded-full bg-blue-400">
              <div class="flex-1 bg-gray-50 p-4 rounded-lg">
                <div class="font-semibold text-gray-700">{{ reply.userName }}</div>
                <div class="mt-1 text-gray-600">{{ reply.content }}</div>
                <div class="mt-2 text-sm text-gray-400">{{ reply.createdAt | date: 'short' }}</div>
              </div>
            </div>

            <!-- Nút thu gọn -->
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
                    this.toggleReplies(discussion)
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

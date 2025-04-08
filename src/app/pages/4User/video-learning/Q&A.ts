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
        <h2>Thảo luận về khóa học</h2>
        <button class="btn-add-discussion" (click)="toggleAddDiscussion()">Thêm thảo luận</button>
        <div class="new-discussion" *ngIf="showNewDiscussion">
            <textarea [(ngModel)]="newDiscussion" name="" id="" placeholder="Nhập nội dung thảo luận"></textarea>
            <div class="discussion-button">
                <button (click)="toggleAddDiscussion()">Hủy</button>
                <button (click)="saveNewDiscussion()">Gửi</button>
            </div>
        </div>
        <div class="discussion-container">
            <div class="discussion-item" *ngFor="let discussion of discussions">
                <div class="comment">
                    <img [src]="discussion.userAvatar" alt="avatar" class="avatar" />
                    <div class="comment-content">
                        <div class="username">{{ discussion.userName }}</div>
                        <div class="text">{{ discussion.content }}</div>
                        <div class="actions">
                            <button (click)="toggleReplyInput(discussion)"><i class="fas fa-reply"></i> Trả lời</button>
                            <span>{{ discussion.createdAt | date: 'short' }}</span>
                        </div>
                    </div>
                </div>
                <!-- Ô nhập liệu trả lời -->
                <div *ngIf="discussion.showReplyInput" class="new-reply">
                    <textarea [(ngModel)]="newReply" placeholder="Nhập câu trả lời của bạn..."></textarea>
                    <div class="button-container">
                        <button (click)="toggleReplyInput(discussion)">Hủy</button>
                        <button (click)="submitReply(discussion)">Gửi</button>
                    </div>
                </div>

                <!-- Nút Xem thêm -->
                <button *ngIf="!discussion.showReplies" (click)="toggleReplies(discussion)"><i class="fas fa-reply see-more"></i> Xem thêm</button>
                <!-- Hiển thị câu trả lời -->
                <div class="replies" *ngIf="discussion.showReplies">
                    <div class="reply" *ngFor="let reply of discussion.replies">
                        <img [src]="reply.userAvatar" alt="avatar" class="avatar blue" />
                        <div class="reply-content">
                            <div class="username">{{ reply.userName }}</div>
                            <div class="text mb-2">{{ reply.content }}</div>
                            <span>{{ reply.createdAt | date: 'short' }}</span>
                        </div>
                        
                    </div>
                    <!-- Nút Thu gọn -->
                    <button (click)="toggleReplies(discussion)"><i class="fas fa-reply see-less"></i> Thu gọn</button>
                </div>
            </div>
        </div>
    `,
    styles: `
    .reply-content{
        margin-top: 5px;
            font-size: 14px;
            color: #888;
    }
    /* Nút thêm thảo luận */
.btn-add-discussion {
    background-color: #4CAF50;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 16px;
    transition: background-color 0.3s ease;
}

.btn-add-discussion:hover {
    background-color: #45a049;
}

/* Khung nhập thảo luận mới */
.new-discussion {
    background-color: #f9f9f9;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
    animation: fadeIn 0.3s ease;
}

/* Textarea nhập nội dung */
.new-discussion textarea {
    width: 100%;
    height: 80px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    resize: vertical;
    font-size: 14px;
    font-family: 'Arial', sans-serif;
    box-sizing: border-box;
    margin-bottom: 10px;
}

/* Nhóm nút Gửi và Hủy */
.discussion-button {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.discussion-button button {
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.discussion-button button:first-child {
    background-color: #ccc;
    color: #333;
}

.discussion-button button:first-child:hover {
    background-color: #b5b5b5;
}

.discussion-button button:last-child {
    background-color: #2196F3;
    color: white;
}

.discussion-button button:last-child:hover {
    background-color: #1976D2;
}

/* Hiệu ứng fade-in */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

    // new discussion
        .new-reply {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            gap: 10px;
            padding: 15px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 100%;
            //   margin-left: 55px;
            max-width: 500px;
            margin: 0 auto;
            animation: fadeIn 0.3s ease;
        }

        .new-reply textarea {
            width: 100%;
            height: 50px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: vertical;
            font-size: 14px;
            line-height: 1.4;
        }

        .new-reply .button-container {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .new-reply button {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            background-color: #b5b5b5;
            color: #333;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }

        .new-reply button:hover {
            background-color:rgba(181, 181, 181, 0.5);
        }

        .new-reply button:nth-child(2) {
            background-color: #2196F3;
            color: white;
        }

        .new-reply button:nth-child(2):hover {
            background-color:rgba(33, 149, 243, 0.45);
        }

        // new reply
        .see-less {
            color: #888;
            cursor: pointer;
            margin-left: 55px;
            margin-bottom: 15px;
        }
        .see-more {
            color: #888;
            cursor: pointer;
            margin-left: 55px;
            margin-bottom: 15px;
        }
        .discussion-container {
            max-width: 100%;
            margin: 20px auto;
        }

        .comment,
        .reply {
            display: flex;
            margin-bottom: 15px;
        }

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #fff;
            margin-right: 10px;
            text-transform: uppercase;
        }

        .avatar.blue {
            background-color: #3b82f6;
        }

        .comment-content,
        .reply-content {
            background-color: #f3f3f3;
            padding: 10px;
            border-radius: 8px;
            flex: 1;
        }

        .username {
            font-weight: bold;
            color: #333;
        }

        .text {
            margin-top: 5px;
            color: #555;
        }

        .actions {
            display: flex;
            align-items: center;
            margin-top: 5px;
            font-size: 14px;
            color: #888;
        }

        .actions button {
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-right: 10px;
        }

        .actions button i {
            margin-right: 5px;
        }

        .reply {
            margin-left: 50px;
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
                    discussion.showReplies = true;
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

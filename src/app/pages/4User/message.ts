import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-message-user',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <h1 class="font-semibold text-gray-800 w-[80%] mx-auto px-6 py-2">Messages</h1>
        <div class="w-[80%] mx-auto p-1 bg-gray-100">
            <div class="flex bg-white rounded-lg shadow-lg h-[75vh] overflow-hidden">
                <!-- Left: Conversations list -->
                <div class="w-1/3 border-r border-gray-200 p-4 flex flex-col">
                    <!-- Search -->
                    <div class="relative mb-4">
                        <input type="text" placeholder="Search messages..." class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <i class="fas fa-search absolute right-3 top-3 text-purple-500"></i>
                    </div>

                    <!-- Conversations -->
                    <div class="flex-1 overflow-y-auto space-y-2">
                        <div *ngFor="let conv of conversations" (click)="selectConversation(conv.id)" class="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                            <img [src]="conv.instructor.avatar || 'https://th.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?rs=1&pid=ImgDetMain'" alt="User" class="w-10 h-10 rounded-full" />
                            <div class="flex-1">
                                <h5 class="font-semibold text-gray-800">{{ conv.instructor.firstName + '' + conv.instructor.lastName }}</h5>
                                <p class="text-sm text-gray-500 truncate">{{ conv.lastMessage || 'No messages yet' }}</p>
                            </div>
                            <span class="text-xs text-gray-400">{{ conv.lastMessageTime | date: 'shortTime' }}</span>
                        </div>

                        <!-- More conversation items... -->
                    </div>
                </div>

                <!-- Right: Chat Box -->
                <!-- Conversation Box -->
                <div class="w-2/3 p-6 flex flex-col h-[75vh]">
                    <!-- Header -->
                    <div *ngIf="selectedConversationId" class="flex items-center mb-4">
                        <img [src]="getSelectedInstructorAvatar()" alt="User" class="w-10 h-10 rounded-full mr-3" />
                        <h2 class="text-xl font-bold text-purple-600">{{ getSelectedConversation()?.instructor.fullName }}</h2>
                    </div>

                    <!-- Messages Section -->
                    <div #scrollContainer class="flex-1 bg-gray-100 p-4 rounded-md overflow-y-auto space-y-4">
                        <!-- Message from other person -->
                        <div *ngFor="let msg of messages">
                            <!-- Tin nhắn từ người khác -->
                            <div *ngIf="msg.senderId !== currentUserId" class="flex items-start">
                                <img [src]="msg.senderAvatar || defaultAvatar" class="w-8 h-8 rounded-full mr-2" />
                                <div class="bg-white p-3 rounded-lg shadow max-w-xs">
                                    <p>{{ msg.content }}</p>
                                    <p class="text-xs text-gray-400 mt-1">{{ msg.senderName }} · {{ msg.createdAt | date: 'shortTime' }}</p>
                                </div>
                            </div>

                            <!-- Tin nhắn từ bạn -->
                            <div *ngIf="msg.senderId === currentUserId" class="flex items-end justify-end">
                                <div class="bg-purple-600 text-white p-3 rounded-lg shadow max-w-xs">
                                    <p>{{ msg.content }}</p>
                                    <p class="text-xs text-purple-200 mt-1 text-right">You · {{ msg.createdAt | date: 'shortTime' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Message Input -->
                    <div class="mt-4">
                        <textarea (keydown.enter)="handleEnterKey($event)" [(ngModel)]="newMessage" rows="3" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Type your message..."></textarea>
                        <div class="flex justify-end mt-2">
                            <button (click)="sendMessage()" class="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: ``,
    providers: []
})
export class MessageUserComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  conversations: any[] = [];
  messages: any[] = [];
  selectedConversationId: number | null = null;
  newMessage: string = '';
  studentEmail: string = '' ;
  currentUserId: number = 1;
  defaultAvatar = 'https://th.bing.com/th/id/OIP.hHZesFcNsuFVAfAgYznY0QHaHa?rs=1&pid=ImgDetMain';

  shouldScroll = false;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.studentEmail=this.authService.getEmail()!;
    this.chatService.getConversationsForStudent(this.studentEmail).subscribe({
      next: (response: any) => {
        this.conversations = response.data;
        console.log('conversations:', this.conversations);
        this.router.queryParams.subscribe(params => {
          const conversationId = Number(params['conversationId']);
          console.log('hello haha:', conversationId);
          if (conversationId) {
            console.log('hello haha1');
            this.selectConversation(conversationId);
          }else{
            this.selectConversation(this.conversations[0].id)
          }
        });
        
      },
      error: (err) => console.error('Error fetching conversations:', err)
    });

    this.currentUserId = Number(this.authService.getId())!;

  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scroll({
        top: this.scrollContainer.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch (err) {
      console.error('Scroll error', err);
    }
  }

  selectConversation(conversationId: number): void {
    this.selectedConversationId = conversationId;

    this.chatService.getMessages(conversationId).subscribe({
      next: (response: any) => {
        this.messages = response.data;
        this.shouldScroll = true;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error fetching messages:', err)
    });

    this.chatService.subscribeToConversation(conversationId, (message) => {
      this.messages.push(message);
      this.shouldScroll = true;
      this.cdRef.detectChanges();
    });

    this.chatService.markMessagesAsRead(conversationId, this.currentUserId).subscribe();
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedConversationId) {
      this.chatService.sendMessage(this.selectedConversationId, this.currentUserId, this.newMessage);
      this.newMessage = '';
      this.shouldScroll = true;
      this.cdRef.detectChanges();
    }
  }

  getSelectedInstructorAvatar(): string {
    const selectedConv = this.conversations.find((c) => c.id === this.selectedConversationId);
    return selectedConv?.instructor?.avatar ?? this.defaultAvatar;
  }

  getSelectedConversation() {
    return this.conversations.find((c) => c.id === this.selectedConversationId);
  }
  handleEnterKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
  
    if (keyboardEvent.shiftKey) {
      return; // Cho phép xuống dòng nếu giữ Shift
    }
  
    keyboardEvent.preventDefault(); // Ngăn không xuống dòng
    this.sendMessage();
  }
  
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:8080'; // URL backend
  private connectedSubject = new BehaviorSubject<boolean>(false);
  private client: Client;
  private subscription: StompSubscription | null = null;
  //new
  private subscriptions: Map<number, StompSubscription> = new Map();


  constructor(private http: HttpClient) {
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${this.apiUrl}/ws`),
      reconnectDelay: 5000,
      onStompError: (frame) => {
        console.error('STOMP Error:', frame);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket Error:', error);
      },
    });
  }
  unsubscribeFromConversation(conversationId: number): void {
  const subscription = this.subscriptions.get(conversationId);
  if (subscription) {
    subscription.unsubscribe();
    this.subscriptions.delete(conversationId);
  }
}


  connect(): void {
    this.client.onConnect = () => {
      console.log('✅ WebSocket connected');
      this.connectedSubject.next(true);
    };

    this.client.activate();
  }

  onConnected(): Observable<boolean> {
    return this.connectedSubject.asObservable();
  }
  

  // Ngắt kết nối WebSocket
  disconnect(): void {
    // this.client.deactivate();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  this.subscriptions.clear();
  this.client.deactivate();
  }

  // Đăng ký lắng nghe tin nhắn từ một conversation
  subscribeToConversation(conversationId: number, callback: (message: any) => void): void {
  this.unsubscribeFromConversation(conversationId); // Hủy nếu đã đăng ký

  console.log('subcribe to conversation enter....');
  if (this.client.connected) {
    console.log('subcribe to conversation enter....connected');
    
    const subscription = this.client.subscribe(`/topic/conversations/${conversationId}`, (message) => {
      callback(JSON.parse(message.body));
    });

    // ❗ Lưu subscription lại để quản lý đúng
    this.subscriptions.set(conversationId, subscription);

  } else {
    console.log('cannot connect websocket');
  }
}


  // Gửi tin nhắn qua WebSocket
  sendMessage(conversationId: number, senderId: number, content: string): void {
    const chatMessage = {
      conversationId,
      senderId,
      content,
    };
    console.log('sendddd messageeeeeeeeeee:',chatMessage)
    this.client.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(chatMessage),
    });
  }
  sendNotification(title:string,message:string):void{
    const notification={
      title,
      message
    }
    console.log("sendddddddd noti..........")
    this.client.publish({
      destination:'/app/notification.sendNotification',
      body:JSON.stringify(notification)
    })
  }
  subscribeToNotification(callback: (message: any) => void): void {
    console.log('subcribe to notification enter....')
    if (this.client.connected) {
      console.log('subcribe to conversation enter....connected')
      this.subscription = this.client.subscribe(`/topic/notification`, (message) => {
        callback(JSON.parse(message.body));
      });
    }else{
      console.log('cannot connect websocket')
    }
  }

  // Lấy danh sách hội thoại của student
  getConversationsForStudent(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversations/student?email=${email}`);
  }
  // Lấy danh sách hội thoại của instructor
  getConversationsForInstructor(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversations/instructor?email=${email}`);
  }

  // Lấy danh sách tin nhắn của một conversation
  getMessages(conversationId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/${conversationId}`);
  }

  // Gửi tin nhắn qua REST (nếu cần)
  sendMessageRest(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, request);
  }

  // Đánh dấu tin nhắn đã đọc
  markMessagesAsRead(conversationId: number, currentUserId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/messages/read?conversationId=${conversationId}&currentUserId=${currentUserId}`, {});
  }

  // Đếm số tin nhắn chưa đọc
  countUnreadMessages(conversationId: number, currentUserId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/unread-count?conversationId=${conversationId}&currentUserId=${currentUserId}`);
  }
}
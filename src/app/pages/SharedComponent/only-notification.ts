import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notification, Toast } from '../models/toast';

@Component({
  selector: 'app-only-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification" @toastAnimation [style.--duration]="notification.duration + 'ms'">
      <img [src]="notification.url_image" class="avatar" alt="image" />
      <div class="content">
        <strong class="title">{{ notification.title }}</strong>
        <span class="message">{{ notification.message }}</span>
      </div>
      <i class="fa-solid fa-xmark close-btn" (click)="close()"></i>
      <div class="progress"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .notification {
      width: 400px;
      padding: 16px 20px;
      background: #fefefe;
      // border-left: 5px solid #3b82f6; 
      border-radius: 12px;
      display: flex;
      align-items: center;
      position: relative;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      animation: fadeIn 0.3s ease;
      font-family: 'Segoe UI', Roboto, sans-serif;
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 16px;
      box-shadow: 0 0 0 2px #3b82f6;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .title {
      font-size: 17px;
      font-weight: 700;
      color: #111827;
    }
    .message {
      font-size: 14px;
      color: #4b5563;
      margin-top: 4px;
    }
    .close-btn {
      font-size: 16px;
      color: #9ca3af;
      cursor: pointer;
      margin-left: 12px;
    }
    .close-btn:hover {
      color: #111827;
    }
    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      background: #3b82f6;
      animation: progress linear forwards;
      animation-duration: var(--duration);
    }

    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
  `],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.3s ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})

export class OnlyNotificationComponent implements OnInit {
  @Input() notification!: Notification;
  @Output() onClose = new EventEmitter<void>();

  ngOnInit() {
    setTimeout(() => this.onClose.emit(), this.notification.duration);
  }

  close() {
    this.onClose.emit();
  }
}
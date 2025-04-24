import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from '../models/toast';

@Component({
  selector: 'app-toast-notification',
  standalone:true,
  imports:[CommonModule],
  template:`
  <div class="toast {{toast.type}}" @toastAnimation [style.--duration]="toast.duration + 'ms'">
      <div class="column">
        <i class="fa-solid {{icon}}"></i>
        <span>{{toast.message}}</span>
      </div>
      <i class="fa-solid fa-xmark" (click)="close()"></i>
    </div>

  `,
  styles:`
  :host {
      display: block;
    }
    .toast {
      width: 400px;
      border-radius: 4px;
      padding: 16px 17px;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .toast::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      animation: progress var(--duration) linear forwards;
    }
    @keyframes progress {
      100% { width: 0%; }
    }
    .toast.success::before {
      background: #0ABF30;
    }
    .toast.error::before {
      background: #E24D4C;
    }
    .toast.warning::before {
      background: #E9BD0C;
    }
    .toast.info::before {
      background: #3498DB;
    }
    .column {
      display: flex;
      align-items: center;
    }
    .column i {
      font-size: 1.75rem;
    }
    .column span {
      font-size: 1.07rem;
      margin-left: 12px;
    }
    .fa-xmark {
      cursor: pointer;
      color: #aeb0d7;
    }
    .fa-xmark:hover {
      color: #34495E;
    }
    .toast.success .column i {
      color: #0ABF30;
    }
    .toast.error .column i {
      color: #E24D4C;
    }
    .toast.warning .column i {
      color: #E9BD0C;
    }
    .toast.info .column i {
      color: #3498DB;
    }
  `,
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s ease', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ToastNotificationComponent implements OnInit {
  @Input() toast!: Toast;
  @Output() onClose = new EventEmitter<void>();
  icon: string = '';

  ngOnInit() {
    this.icon = this.getIcon(this.toast.type);
    setTimeout(() => this.onClose.emit(), this.toast.duration);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'fa-circle-check';
      case 'error': return 'fa-circle-xmark';
      case 'warning': return 'fa-triangle-exclamation';
      case 'info': return 'fa-circle-info';
      default: return '';
    }
  }

  close() {
    this.onClose.emit();
  }

}

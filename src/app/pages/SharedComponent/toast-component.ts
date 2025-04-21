import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  standalone:true,
  imports:[CommonModule],
  template:`
  <div *ngIf="message"
  [ngClass]="{
    'bg-green-500 text-white': type === 'success',
    'bg-red-500 text-white': type === 'error',
    'bg-yellow-400 text-black': type === 'warn'
  }"
  class="fixed top-6 right-6 z-50 px-4 py-2 rounded-lg shadow-lg transition-transform duration-300 ease-in-out">
  
  <i class="fas"
    [ngClass]="{
      'fa-check-circle': type === 'success',
      'fa-times-circle': type === 'error',
      'fa-exclamation-triangle': type === 'warn'
    }"></i>
  <span>{{ message }}</span>

  <!-- Thanh tiến trình -->
  <div class="progress-bar"></div>
</div>

  `,
  styles:`
  .toast-box {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 50;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: white;
  animation: toast-progress 3s linear forwards;
}

@keyframes toast-progress {
  from { width: 100%; }
  to { width: 0%; }
}

  `
})
export class ToastNotificationComponent implements OnInit {
  @Input() type: 'success' | 'error' | 'warn' = 'success';
  @Input() message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

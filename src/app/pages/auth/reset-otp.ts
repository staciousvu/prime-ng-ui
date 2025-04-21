import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../4User/component/navbar';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule, FileIcon } from 'lucide-angular';
@Component({
    selector: 'app-reset-otp',
    standalone: true,
    imports: [CommonModule, FormsModule,ToastModule,LucideAngularModule ],
    providers: [MessageService],
    template: `
    <!-- <p-toast></p-toast> -->
        <div class="min-h-screen py-10 mt-10" (click)="focusInput(hiddenInput)">
  <div class="bg-white dark:bg-gray-700 shadow-xl rounded-2xl mx-auto w-full max-w-md overflow-hidden grid md:grid-cols-1 transform transition-transform duration-300 hover:scale-[1.02]">
    <div class="p-6 text-center">

      <!-- SVG Logo -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="mx-auto mb-4 w-40 h-40 animate-pulse">
        <circle cx="200" cy="150" r="120" fill="#7E42D9" />
        <circle cx="200" cy="150" r="90" fill="#B59CFF" />
        <circle cx="200" cy="150" r="60" fill="#7E42D9" />
        <circle cx="200" cy="150" r="30" fill="#E6D9FF" />
        <text x="200" y="160" text-anchor="middle" fill="#000" font-size="30" font-weight="bold">OTP</text>
      </svg>

      <!-- Heading -->
      <h2 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Verify Reset OTP</h2>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Enter the 6-digit code sent to <span class="font-semibold text-blue-600">{{ this.email }}</span></p>

      <!-- OTP Boxes -->
      <div class="flex justify-center space-x-2 mb-4">
        <ng-container *ngFor="let val of otpDisplayValues">
          <div class="w-14 h-16 text-center text-2xl border-2 border-[#7E42D9] rounded-lg flex items-center justify-center dark:bg-gray-600 dark:text-white">
            {{ val }}
          </div>
        </ng-container>
      </div>

      <!-- Hidden Input -->
      <input
        #hiddenInput
        type="text"
        maxlength="6"
        pattern="[0-9]*"
        inputmode="numeric"
        [(ngModel)]="otpInput"
        (input)="updateOtpDisplay()"
        class="absolute opacity-0 pointer-events-auto"
        autofocus
      />

      <!-- Resend -->
      <div class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Didn't receive code?
        <a href="#" class="text-[#7E42D9] hover:underline hover:text-[#6b32c7] transition-colors duration-300">Resend OTP</a>
      </div>

      <!-- Submit -->
      <button
        (click)="verifyOtp()"
        class="cursor-pointer w-full py-3 bg-[#7E42D9] text-white rounded-lg hover:bg-[#6b32c7] transition-transform duration-200 hover:scale-105">
        Verify OTP
        </button>


    </div>
  </div>
</div>
<div *ngIf="notification"
     class="toast-container"
     [ngClass]="{
       'toast-success': notification.type === 'success',
       'toast-error': notification.type === 'error',
       'toast-warn': notification.type === 'warn'
     }">
  <div class="flex items-center space-x-3">
    <span class="text-2xl">
    <ng-container [ngSwitch]="notification.type">
        <span *ngSwitchCase="'success'">🎉</span>
        <span *ngSwitchCase="'error'">❌</span>
        <span *ngSwitchCase="'warn'">⚠️</span>
      </ng-container>
    </span>
    <span class="text-base font-medium">{{ notification.message }}</span>
  </div>

  <div class="toast-progress"></div>
</div>





    `,
    styles: [`
input[type="text"].opacity-0 {
  position: absolute;
  width: 1px;
  height: 1px;
  top: -100px;
  left: -100px;
  opacity: 0;
  pointer-events: none;
  caret-color: transparent;
}
.toast-container {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  max-width: 350px;
  animation: fadeInSlideDown 1.5s ease-out;
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Màu theo loại */
.toast-success {
  background-color: #e6fffa;
  color:rgb(21, 116, 59);
}

.toast-error {
  background-color: #ffe4e6;
  color: #b91c1c;
}

.toast-warn {
  background-color: #fef9c3;
  color: #92400e;
}

/* Thanh tiến trình */
.toast-progress {
  height: 4px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
  width: 100%;
  overflow: hidden;
}

.toast-progress::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: currentColor;
  animation: progressBar 1.5s linear forwards;
}

/* Animation */
@keyframes fadeInSlideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progressBar {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}



        `]
})
export class ResetOtpComponent {
  notification: { type: 'success' | 'error' | 'warn', message: string } | null = null;

showNotification(type: 'success' | 'error' | 'warn', message: string) {
  this.notification = { type, message };
  setTimeout(() => this.notification = null, 1500);
}

  otpInput: string = '';
  otpDisplayValues: string[] = ['', '', '', '', '', ''];
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  updateOtpDisplay() {
    const cleaned = this.otpInput.replace(/[^0-9]/g, '').slice(0, 6);
    this.otpInput = cleaned;
    this.otpDisplayValues = cleaned.split('').concat(new Array(6 - cleaned.length).fill(''));
  }

  focusInput(input: HTMLInputElement) {
    input.focus();
  }

  verifyOtp() {
    if (this.otpInput.length !== 6 || !this.email) {
      this.showNotification('warn', '⚠️ Vui lòng nhập đủ 6 chữ số OTP.');
      return;
    }

    const payload = {
      email: this.email,
      otp: this.otpInput
    };

    this.http.post<any>('http://localhost:8080/user/verify-otp-reset', payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.showNotification('success', 'Xác minh thành công! Đang chuyển hướng...');
          setTimeout(() => {
            this.router.navigate(['/user/login']);
          }, 1500);
        } else {
          this.showNotification('error', response.message || 'Mã OTP không hợp lệ.');
        }
      },
      error: (err) => {
        const msg = err.error?.message || 'Đã xảy ra lỗi khi xác minh OTP.';
        this.showNotification('error', msg);
      }
    });
  }
}

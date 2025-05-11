import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../4User/component/navbar';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-login',
    standalone: true,
    imports: [CommonModule, FormsModule, NavBarComponent, RouterLink],
    template: `
        <app-navbar-home></app-navbar-home>
        <div class="mt-16 pt-16">
            <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div class="hidden lg:block lg:w-1/2 bg-cover" style="background-image:url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"></div>
                <div class="w-full p-8 lg:w-1/2">
                    <h2 class="text-2xl font-semibold text-gray-700 text-center">Eduflow</h2>
                    <p class="text-xl text-gray-600 text-center">Welcome back!</p>
                    <a href="#" class="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                        <div class="px-4 py-3">
                            <svg class="h-6 w-6" viewBox="0 0 40 40">
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#FFC107"
                                />
                                <path
                                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                    fill="#FF3D00"
                                />
                                <path
                                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                    fill="#4CAF50"
                                />
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#1976D2"
                                />
                            </svg>
                        </div>
                        <p class="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</p>
                    </a>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" class="text-xs text-center text-gray-500 uppercase">or login with email</a>
                        <span class="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <div class="mt-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input placeholder="Nhập email" [(ngModel)]="email" class="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
                    </div>
                    <div class="mt-4">
                        <div class="flex justify-between">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <a [routerLink]="'/user/reset-password'" class="text-xs text-gray-500">Forget Password?</a>
                        </div>
                        <input placeholder="Nhập password" [(ngModel)]="password" class="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
                    </div>
                    <div class="mt-8">
                        <button (click)="login()" class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
                    </div>
                    <div class="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-80 p-4 bg-red-500 text-white rounded-lg shadow-md"
                        *ngIf="errorMessage" [ngClass]="{'opacity-100': errorMessage, 'opacity-0': !errorMessage}">
                        <p class="text-center">{{ errorMessage }}</p>
                    </div>


                    <div class="mt-4 flex items-center justify-between">
                        <span class="border-b w-1/5 md:w-1/4"></span>
                        <a class="text-xs text-gray-500 uppercase" [routerLink]="'/user/register'">or sign up</a>
                        <span class="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [``]
})
export class UserLoginComponent {
    email: string = 'vunguyenba310703@gmail.com';
    password: string = '12345';
    errorMessage: string | null = null;
  
    constructor(
      private authService: AuthService,
      private router: Router
    ) {}
  
    login() {
      this.authService.login(this.email, this.password, 'user').subscribe({
        next: (response) => {
          if (response.success) {       
            const roles = response.data.roles;
  
            if (roles.includes('LEARNER')) {
              this.router.navigate(['/home']);
            } else {
              this.errorMessage = 'Tài khoản không hợp lệ cho trang người dùng!';
              this.autoHideError();
            }
          } else {
            this.errorMessage = 'Sai email hoặc mật khẩu.';
            this.autoHideError();
          }
        },
        error: (err) => {
            // this.errorMessage = err.error?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.';
            this.errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại.';
            this.autoHideError();
        }
      });
    }
  
    autoHideError() {
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);  // Sau 3 giây sẽ tự động ẩn thông báo lỗi
    }
  }
  



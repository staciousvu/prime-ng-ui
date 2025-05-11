import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavBarComponent } from "../4User/component/navbar";
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [CommonModule, FormsModule, NavBarComponent,RouterLink],
    template: `
        <app-navbar-home></app-navbar-home>
        <div class="mt-16 pt-16">
            <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div class="hidden lg:block lg:w-1/2 bg-cover"
                    style="background-image:url('https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80')">
                </div>
                <div class="w-full p-8 lg:w-1/2">
                    <h2 class="text-2xl font-semibold text-gray-700 text-center">Eduflow</h2>
                    <p class="text-xl text-gray-600 text-center">Reset your password</p>

                    <form (ngSubmit)="resetPassword()">
                        <div class="mt-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input [(ngModel)]="email" name="email" placeholder="Nhập email"
                                class="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email" required />
                        </div>

                        <div class="mt-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                            <input [(ngModel)]="newPassword" name="newPassword" placeholder="Nhập password"
                                class="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password" required />
                        </div>

                        <div class="mt-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
                            <input [(ngModel)]="confirmNewPassword" name="confirmNewPassword" placeholder="Nhập lại password"
                                class="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password" required />
                        </div>

                        <div class="mt-8">
                            <button type="submit"
                                class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Reset
                                Password</button>
                        </div>
                    </form>

                    <div class="mt-4 flex items-center justify-between">
                        <span class="border-b w-1/5 md:w-1/4"></span>
                        <a [routerLink]="'/user/login'" class="text-xs text-gray-500 uppercase">Back to login</a>
                        <span class="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-80 p-4 bg-red-500 text-white rounded-lg shadow-md"
            *ngIf="errorMessage" [ngClass]="{ 'opacity-100': errorMessage, 'opacity-0': !errorMessage }">
            <p class="text-center">{{ errorMessage }}</p>
        </div>
    `,
    styles: [``]
})
export class ResetPasswordComponent {
    email: string = '';
    newPassword: string = '';
    confirmNewPassword: string = '';
    errorMessage: string = '';

    constructor(private http: HttpClient,private route:Router) {}

    resetPassword() {
        this.errorMessage = '';

        if (this.newPassword !== this.confirmNewPassword) {
            this.errorMessage = 'Passwords do not match.';
            return;
        }

        const requestBody = {
            email: this.email,
            password: this.newPassword
        };

        this.http.post<any>('http://localhost:8080/user/sent-otp-reset', requestBody).subscribe({
            next: (response) => {
                // Có thể chuyển hướng hoặc hiển thị thêm tùy ý
                this.route.navigate(['user/verify-reset-otp'], { queryParams: { email: this.email } });
            },
            error: (error: HttpErrorResponse) => {
                this.errorMessage = error.error.message || 'Something went wrong.';
            }
        });
    }
}

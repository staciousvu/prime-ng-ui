import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../4User/component/navbar';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-register',
    standalone: true,
    imports: [CommonModule, FormsModule, NavBarComponent],
    template: `
        <app-navbar-home></app-navbar-home>
        <div class="py-16">
    <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div class="hidden lg:block lg:w-1/2 bg-cover" style="background-image:url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"></div>
        <div class="w-full p-8 lg:w-1/2">
            <h2 class="text-2xl font-semibold text-gray-700 text-center">Eduflow</h2>
            <p class="text-xl text-gray-600 text-center">Create your account</p>

            <form (ngSubmit)="register()">
                <div class="mt-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                    <input [(ngModel)]="firstName" name="firstName" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required />
                </div>
                <div class="mt-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    <input [(ngModel)]="lastName" name="lastName" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required />
                </div>
                <div class="mt-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input [(ngModel)]="email" name="email" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" required />
                </div>
                <div class="mt-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input [(ngModel)]="password" name="password" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" required />
                </div>
                <div class="mt-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input [(ngModel)]="confirmPassword" name="confirmPassword" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" required />
                </div>
                <div class="mt-8">
                    <button type="submit" class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Register</button>
                </div>
            </form>

            <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 md:w-1/4"></span>
                <a href="#" class="text-xs text-gray-500 uppercase">or login</a>
                <span class="border-b w-1/5 md:w-1/4"></span>
            </div>
        </div>
    </div>
</div>

    `,
    styles: [``]
})
export class UserRegisterComponent {
firstName: any;
lastName: any;
confirmPassword: any;
register() {
throw new Error('Method not implemented.');
}
    email: string = 'test@gmail.com';
    password: string = '12345678';

    onSubmit() {
        console.log('Email:', this.email, 'Password:', this.password);
    }
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}
    login() {
        this.authService.login(this.email, this.password).subscribe((response) => {
            if (response.success) {
                if (response.data.roles.includes('LEARNER')) {
                    this.router.navigate(['/home']);
                }
            }
        });
    }
}

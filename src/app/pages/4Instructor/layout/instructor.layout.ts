import { Component } from '@angular/core';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { OnlyNotificationContainerComponent } from '../../SharedComponent/only-notification-container';
import { ToastContainerComponent } from '../../SharedComponent/toast-container-components';

@Component({
    selector: 'app-instructor-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterModule, OnlyNotificationContainerComponent, ToastContainerComponent],
    template: `
        <app-only-notification-container />
        <app-toast-container></app-toast-container>
        <div class="relative h-screen">
            <!-- Sidebar -->
            <div
                class="group fixed top-0 left-0 h-full z-20 
                transition-all duration-300 
                w-20 hover:w-80 bg-gray-900 text-white overflow-hidden"
            >
                <div class="p-4 flex flex-col space-y-4">
                    <div
                        class="flex items-center space-x-2 px-3 py-4
                                hover:bg-gray-800 rounded-md cursor-pointer 
                                transition active:scale-95"
                        routerLinkActive="border-l-4 border-purple-500 font-semibold"
                        [routerLink]="['/instructor/courses']"
                    >
                        <i class="fa-solid fa-video me-3"></i>
                        <span
                            class="transition-all duration-300 
                                   opacity-0 translate-x-[-20px]
                                   group-hover:opacity-100 group-hover:translate-x-0 
                                   whitespace-nowrap"
                        >
                            Courses
                        </span>
                    </div>

                    <div
                        class="flex items-center space-x-2 px-3 py-4
                                hover:bg-gray-800 rounded-md cursor-pointer 
                                transition active:scale-95"
                        routerLinkActive="border-l-4 border-purple-500 font-semibold"
                        [routerLink]="['/instructor/communications']"
                    >
                        <i class="fa-solid fa-comments me-3"></i>
                        <span
                            class="transition-all duration-300 
                                   opacity-0 translate-x-[-20px]
                                   group-hover:opacity-100 group-hover:translate-x-0 
                                   whitespace-nowrap"
                        >
                            Communications
                        </span>
                    </div>
                    <div
                        class="flex items-center space-x-2 px-3 py-4
                                hover:bg-gray-800 rounded-md cursor-pointer 
                                transition active:scale-95"
                        routerLinkActive="border-l-4 border-purple-500 font-semibold"
                        [routerLink]="['/instructor/performances']"
                    >
                        <i class="fa-solid fa-chart-simple me-3"></i>
                        <span
                            class="transition-all duration-300 
                                   opacity-0 translate-x-[-20px]
                                   group-hover:opacity-100 group-hover:translate-x-0 
                                   whitespace-nowrap"
                        >
                            Performance
                        </span>
                    </div>
                    <div
                        class="flex items-center space-x-2 px-3 py-4
                                hover:bg-gray-800 rounded-md cursor-pointer 
                                transition active:scale-95"
                        routerLinkActive="border-l-4 border-purple-500 font-semibold"
                        [routerLink]="['/instructor/profiles']"
                    >
                        <i class="bi bi-person-circle me-3"></i>
                        <span
                            class="transition-all duration-300 
                                   opacity-0 translate-x-[-20px]
                                   group-hover:opacity-100 group-hover:translate-x-0 
                                   whitespace-nowrap"
                        >
                            Profile
                        </span>
                    </div>
                </div>
            </div>

            <!-- Main content -->
            <!-- Main content -->
            <div class="ml-16 bg-white min-h-screen">
                <!-- Navbar (KHÔNG bị padding) -->
                <div class="flex justify-end items-center bg-white p-4 rounded-b-md">
                    <!-- Notification -->
                    <div class="relative mx-2 cursor-pointer">
                        <button class="bg-white text-gray-800 px-4 py-3  hover:bg-gray-100 hover:scale-105 transition-all duration-200 ease-in-out" [routerLink]="['/home']">Student</button>
                    </div>
                </div>

                <!-- Content có padding -->
                <router-outlet />
                <!-- <div class="p-10">
                    <router-outlet />
                </div> -->
            </div>
        </div>
    `,
    styles: ``
})
export class InstructorLayoutComponent {
    img: string = localStorage.getItem('avatar')!;
}

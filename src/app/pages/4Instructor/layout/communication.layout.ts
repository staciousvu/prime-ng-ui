import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-communication-layout',
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <div class="flex h-screen">
            <!-- Sidebar -->
            <nav class="w-64 bg-white shadow-md rounded-lg overflow-hidden p-5">
                <ul class="space-y-1">
                    <!-- Q&A -->
                    <li>
                        <div routerLink="/instructor/communications/qna" routerLinkActive="border-l-4 border-purple-500 bg-purple-50 text-purple-700 font-semibold" class="px-6 py-4 hover:bg-gray-100 text-gray-800 transition cursor-pointer">Q&A</div>
                    </li>

                    <!-- Messages -->
                    <li>
                        <div
                            routerLink="/instructor/communications/messages"
                            routerLinkActive="border-l-4 border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                            class="flex items-center justify-between px-6 py-4 hover:bg-gray-100 text-gray-800 transition cursor-pointer"
                        >
                            <span>Messages</span>
                            <span class="bg-purple-500 text-white text-xs font-semibold rounded-full px-2 py-1">7</span>
                        </div>
                    </li>

                    <!-- Assignments -->
                    <li>
                        <div routerLink="/instructor/communications/assignments" routerLinkActive="border-l-4 border-purple-500 bg-purple-50 text-purple-700 font-semibold" class="px-6 py-4 hover:bg-gray-100 text-gray-800 transition cursor-pointer">
                            Assignments
                        </div>
                    </li>

                    <!-- Announcements -->
                    <li>
                        <div routerLink="/instructor/communications/announcements" routerLinkActive="border-l-4 border-purple-500 bg-purple-50 text-purple-700 font-semibold" class="px-6 py-4 hover:bg-gray-100 text-gray-800 transition cursor-pointer">
                            Announcements
                        </div>
                    </li>
                </ul>
            </nav>

            <!-- Main Content -->
            <div class="flex-1 bg-white-100 p-6 overflow-y-auto">
                <!-- Angular router outlet here -->
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A expedita accusantium maxime! Doloremque voluptas delectus recusandae sed mollitia. Nobis harum id tempore voluptate rerum minima dignissimos quod eveniet nulla
                    accusantium!
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A expedita accusantium maxime! Doloremque voluptas delectus recusandae sed mollitia. Nobis harum id tempore voluptate rerum minima dignissimos quod eveniet nulla
                    accusantium!
                </p>

                <!-- <router-outlet></router-outlet> -->
            </div>
        </div>
    `,
    styles: ``
})
export class CommunicationLayoutComponent {}

import { Component } from '@angular/core';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-performance-layout',
    standalone: true,
    imports: [RouterOutlet,RouterLink,RouterModule],
    template: `
        <div class="flex h-screen">
            <!-- Sidebar -->
            <nav class="w-64 bg-white shadow-md rounded-lg overflow-hidden p-5">
                <ul class="space-y-1">
                    <!--Overviews -->
                    <li>
                        <div routerLink="/instructor/performances/overview" routerLinkActive="border-l-4 border-purple-500 bg-purple-50 text-purple-700 font-semibold" 
                        class="px-6 py-4 hover:bg-gray-100 text-gray-800 transition cursor-pointer">Overview</div>
                    </li>

                    <!-- Students -->
                    <li>
                        <div
                            routerLink="/instructor/performances/student"
                            routerLinkActive="border-l-4 border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                            class="flex items-center justify-between px-6 py-4 hover:bg-gray-100 text-gray-800 transition cursor-pointer">
                            <span>Students</span>
                            <!-- <span class="bg-purple-500 text-white text-xs font-semibold rounded-full px-2 py-1">7</span> -->
                        </div>
                    </li>

                    <!-- Reviews -->
                    <li>
                        <div routerLink="/instructor/performances/review" routerLinkActive="border-l-4 border-purple-500 bg-purple-50 text-purple-700 font-semibold" class="px-6 py-4 hover:bg-gray-100 text-gray-800 transition cursor-pointer">
                            Reviews
                        </div>
                    </li>

                </ul>
            </nav>

            <!-- Main Content -->
            <div class="flex-1 bg-white-100 p-6 overflow-y-auto">
                <!-- Angular router outlet here -->


                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: ``
})
export class PerformanceLayoutComponent {}

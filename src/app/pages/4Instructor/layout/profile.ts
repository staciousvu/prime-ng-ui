import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports:[RouterOutlet,RouterModule],
    template: `
        <div class="px-10">
            <div class="w-[80%] mx-auto">
                <h1 class="text-5xl font-bold mb-10">Profile &amp; settings</h1>
                <div>
                    <nav class="flex space-x-6 border-b border-gray-300 mb-8 text-sm font-semibold text-gray-700">
                        <button class="text-xl pb-2 border-b-2 border-black"
                        routerLink="/instructor/profiles/basic-information"
                        routerLinkActive="border-black text-black"
                        >Eduflow profile</button>
                        <button class="text-xl pb-2"
                        routerLink="/instructor/profiles/photo"
                        routerLinkActive="border-black text-black"
                        >Profile picture</button>
                    </nav>
                    <router-outlet/>
                </div>
            </div>
        </div>
    `,
    styles: ``
})
export class ProfileComponent {}

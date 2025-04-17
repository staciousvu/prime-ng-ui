import { Component } from '@angular/core';

@Component({
    selector: 'app-profile-basic',
    standalone: true,
    template: `
        <form class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full mx-auto">
            <div>
                <label for="firstName" class="block font-semibold mb-2">First Name</label>
                <input id="firstName" type="text" value="Staciousvu" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>
            <div>
                <label for="website" class="block font-semibold mb-2">Website</label>
                <input id="website" type="text" placeholder="URL" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>
            <div>
                <label for="lastName" class="block font-semibold mb-2">Last Name</label>
                <input id="lastName" type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>
            <div>
                <label class="block font-semibold mb-2">Facebook</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <span class="bg-gray-100 font-semibold px-4 py-2 border-r border-gray-300 select-none">facebook.com/</span>
                    <input type="text" placeholder="Username" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div>
                <label for="headline" class="block font-semibold mb-2">Headline</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <input id="headline" type="text" value="Instructor at Udemy" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                    <span class="bg-white border-l border-gray-300 px-4 py-2 text-gray-600 select-none">60</span>
                </div>
            </div>
            <div>
                <label class="block font-semibold mb-2">Instagram</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <span class="bg-gray-100 font-semibold px-4 py-2 border-r border-gray-300 select-none">instagram.com/</span>
                    <input type="text" placeholder="Username" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div>
                <label for="biography" class="block font-semibold mb-2">Biography</label>
                <div class="border border-gray-300 rounded-md">
                    <div class="flex items-center space-x-2 border-b border-gray-300 px-3 py-1 text-gray-700 font-semibold select-none">
                        <span>B</span>
                        <span class="italic">I</span>
                    </div>
                    <textarea id="biography" rows="5" class="w-full px-3 py-2 text-gray-700 resize-none focus:outline-none"></textarea>
                </div>
                <p class="mt-2 text-xs text-gray-600 max-w-xl">
                    To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.
                </p>
            </div>
            <div>
                <label class="block font-semibold mb-2">LinkedIn</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <span class="bg-gray-100 font-semibold px-4 py-2 border-r border-gray-300 select-none">linkedin.com/</span>
                    <input type="text" placeholder="Public profile URL" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div></div>
            <div>
                <label class="block font-semibold mb-2">TikTok</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <span class="bg-gray-100 font-semibold px-4 py-2 border-r border-gray-300 select-none">tiktok.com/</span>
                    <input type="text" placeholder="@Username" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                </div>
            </div>
        </form>
        <!-- Nút Save ở dưới cùng -->
        <div class="mt-5 flex justify-end mb-8">
            <button type="submit" class="bg-purple-700 text-white font-semibold rounded-md px-10 py-3 hover:bg-purple-800 transition-colors">Save</button>
        </div>
    `,
    styles: ``
})
export class ProfileBasicComponent {}

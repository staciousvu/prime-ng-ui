import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Editor, EditorModule } from 'primeng/editor';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-profile-basic',
    standalone: true,
    imports: [CommonModule, EditorModule, TextareaModule, FormsModule,ToastModule],
    template: `
        <main class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full mx-auto">
            <div>
                <label for="firstName" class="block font-semibold mb-2">First Name</label>
                <input id="firstName" type="text" [(ngModel)]="user.firstName" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>
            <div>
                <label for="lastName" class="block font-semibold mb-2">Last Name</label>
                <input id="lastName" [(ngModel)]="user.lastName" type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>
            <div>
                <label for="birthdate" class="block font-semibold mb-2">Birthdate</label>
                <input id="birthdate" [(ngModel)]="user.dateOfBirth" type="date" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>

            <div>
                <label for="expertise" class="block font-semibold mb-2">Expertise</label>
                <input id="expertise" [(ngModel)]="user.expertise" type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>
            <div>
                <label for="country" class="block font-semibold mb-2">Country</label>
                <select id="country" [(ngModel)]="user.country" class="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400">
                    <option value="">Select a country</option>
                    <option value="Vietnam">Việt Nam</option>
                    <option value="American">Mỹ</option>
                    <option value="Japan">Nhật Bản</option>
                    <option value="Korea">Hàn Quốc</option>
                    <option value="Franch">Pháp</option>
                </select>
            </div>

            <div>
                <label class="block font-semibold mb-2">Facebook</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <span class="bg-gray-100 font-semibold px-4 py-2 border-r border-gray-300 select-none">facebook.com/</span>
                    <input type="text" [(ngModel)]="user.facebookUrl" placeholder="Username" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div>
                <label for="headline" class="block font-semibold mb-2">Headline</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <input id="headline" type="text" value="Instructor at Eduflow" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                    <span class="bg-white border-l border-gray-300 px-4 py-2 text-gray-600 select-none">60</span>
                </div>
            </div>
            <div>
                <label class="block font-semibold mb-2">Instagram</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <span class="bg-gray-100 font-semibold px-4 py-2 border-r border-gray-300 select-none">instagram.com/</span>
                    <input [(ngModel)]="user.instagramUrl" type="text" placeholder="Username" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div>
                <label for="biography" class="block font-semibold mb-2">Biography</label>
                <div class="border border-gray-300 rounded-md">
                    <p-editor [(ngModel)]="user.bio" [style]="{ height: '250px' }" />
                </div>
                <p class="mt-2 text-xs text-gray-600 max-w-xl">
                    To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.
                </p>
            </div>
            <div>
                <label class="block font-semibold mb-2">LinkedIn</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <span class="bg-gray-100 font-semibold px-4 py-2 border-r border-gray-300 select-none">linkedin.com/</span>
                    <input type="text" [(ngModel)]="user.linkedinUrl" placeholder="Public profile URL" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div></div>
            <div>
                <label class="block font-semibold mb-2">X</label>
                <div class="flex border border-gray-300 rounded-md overflow-hidden">
                    <span class="bg-gray-100 font-semibold px-4 py-2 border-r border-gray-300 select-none">x.com/</span>
                    <input type="text" [(ngModel)]="user.twitterUrl" placeholder="@Username" class="flex-1 px-4 py-2 text-gray-700 focus:outline-none" />
                </div>
            </div>
        </main>
        <!-- Nút Save ở dưới cùng -->
        <div class="mt-5 flex justify-end" style="margin-bottom:20px ;">
            <button (click)="updateProfile()" type="submit" class="bg-purple-700 text-white font-semibold rounded-lg  px-10 py-3 hover:bg-purple-800 transition-colors">Save</button>
        </div>
        <p-toast></p-toast>
    `,
    styles: ``,
    providers:[MessageService]
})
export class ProfileBasicComponent implements OnInit {
    user: any;
    constructor(
        private http: HttpClient,
        private router: ActivatedRoute,
        private messageService:MessageService
    ) {}
    ngOnInit(): void {
        this.http.get<any>(`http://localhost:8080/profile`).subscribe((response) => {
            this.user = response.data;
        });
    }
    updateProfile() {
        const request={
            firstName:this.user.firstName,
            lastName:this.user.lastName,
            dateOfBirth:this.user.dateOfBirth,
            country:this.user.country,
            bio:this.user.bio,
            facebookUrl:this.user.facebookUrl,
            twitterUrl:this.user.twitterUrl,
            linkedinUrl:this.user.linkedinUrl,
            instagramUrl:this.user.instagramUrl,
            expertise:this.user.expertise
        }
        console.log('request: ',request)
        this.http.put<any>('http://localhost:8080/user/update-profile', request).subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Profile updated successfully'
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update profile'
                });
            }
        );
        
    }
}

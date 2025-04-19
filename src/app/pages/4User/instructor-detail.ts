import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-instructor-detail',
    standalone: true,
    imports: [],
    template: `
        <div class="bg-[#f0f0ff] p-8 md:p-12 lg:p-16 relative overflow-visible">
            <div class="w-[80%] mx-auto relative z-10">
                <!-- Nội dung chính -->
                <div class="max-w-4xl">
                    <p class="text-xl font-extrabold text-gray-900 mb-1">INSTRUCTOR</p>
                    <h1 class="text-3xl md:text-4xl font-extrabold leading-tight mb-1">{{ user.fullName }}, {{ user.expertise }}</h1>
                    <h2 class="font-extrabold text-gray-900 text-xl mb-4">
                        {{ user.expertise }}
                    </h2>
                    <button class="bg-[#a9a6ff] text-[#3f3cd8] font-extrabold text-xs rounded-md px-3 py-1" type="button">Eduflow Instructor Partner</button>
                </div>
            </div>

            <!-- Ảnh + mạng xã hội nằm lệch phải và xuống dưới -->
            <div
                class="absolute top-[30%] right-[20%] z-20 
              bg-white rounded-xl p-8 flex flex-col items-center shadow-md max-w-xs w-full"
            >
                <img alt="Portrait photo of Dr. Angela Yu" class="w-40 h-40 rounded-full object-cover mb-8" [src]="user.avatar" width="160" height="160" />
                <button (click)="navigateMessage()" class="bg-[#6b21a8] px-10 py-3 text-white w-full mb-4 rounded-md hover:bg-[#6b21a8c5]">Send message</button>
                <div class="flex gap-6">
                    <a
                        [href]="user.facebookUrl"
                        target="_blank"
                        aria-label="Facebook"
                        class="border border-[#6b21a8] text-[#6b21a8] rounded-md w-12 h-12 flex items-center justify-center text-lg hover:bg-[#6b21a8] hover:text-white transition"
                    >
                        <i class="fab fa-facebook"></i>
                    </a>

                    <a
                        [href]="user.linkedinUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        class="border border-[#6b21a8] text-[#6b21a8] rounded-md w-12 h-12 flex items-center justify-center text-lg hover:bg-[#6b21a8] hover:text-white transition"
                    >
                        <i class="fab fa-linkedin-in"></i>
                    </a>

                    <a
                        [href]="user.twitterUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X (Twitter)"
                        class="border border-[#6b21a8] text-[#6b21a8] rounded-md w-12 h-12 flex items-center justify-center text-lg hover:bg-[#6b21a8] hover:text-white transition"
                    >
                        <i class="fab fa-x-twitter"></i>
                    </a>

                    <a
                        [href]="user.instagramUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        class="border border-[#6b21a8] text-[#6b21a8] rounded-md w-12 h-12 flex items-center justify-center text-lg hover:bg-[#6b21a8] hover:text-white transition"
                    >
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="w-[80%] mx-auto px-8 md:px-12 lg:px-16 py-10">
            <div class="flex flex-col md:flex-row md:gap-20">
                <div class="flex gap-16 mb-5 md:mb-8">
                    <div>
                        <p class="font-extrabold text-lg md:text-xl text-gray-900 mb-1">3,127,567</p>
                        <p class="text-sm text-gray-700">Total learners</p>
                    </div>
                    <div>
                        <p class="font-extrabold text-lg md:text-xl text-gray-900 mb-1">952,779</p>
                        <p class="text-sm text-gray-700">Reviews</p>
                    </div>
                </div>
            </div>
            <h3 class="font-extrabold text-xl md:text-2xl mb-4">About me</h3>
            <p class="text-justify mb-3 max-w-3xl text-gray-900 text-base md:text-lg leading-relaxed overflow-wrap break-words" [innerHTML]="santinizeBio()"></p>
        </div>
    `,
    styles: ``,
    providers: []
})
export class InstructorDetailComponent implements OnInit {
    navigateMessage() {
        this.http.get<any>(`http://localhost:8080/conversations/get-or-create?instructorId=${this.userId}`).subscribe((response) => {
            const conversationId = response.data.id;
            this.route.navigate(['/message'], { queryParams: { conversationId: conversationId } });
        });
    }
    userId: any;
    user: any;
    check_b: boolean = false;
    constructor(
        private http: HttpClient,
        private router: ActivatedRoute,
        private route: Router
    ) {}
    ngOnInit(): void {
        // this.http.get<any>(`http://localhost:8080/enrolls/check`)
        this.router.paramMap.subscribe((params) => {
            this.userId = params.get('id');
        });
        this.http.get<any>(`http://localhost:8080/profile/${this.userId}`).subscribe((response: any) => {
            this.user = response.data;
            console.log(this.user);
        });
    }
    santinizeBio() {
        return this.user.bio.replace(/&nbsp;/g, ' ');
    }
}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-post-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="mt-5 w-full">
            <div class="w-[80%] mx-auto flex flex-col">
                <!-- Header + Search in one row -->
                <div class="flex items-center justify-between py-2">
                    <h1 class="text-4xl font-bold">Post</h1>
                </div>
            </div>
        </div>

        <div class="bg-white text-black">
            <div class="w-[80%] mx-auto flex flex-col md:flex-row md:space-x-10">
                <!-- Left side: Latest News -->
                <div class="md:w-3/4">
                    <h2 class="font-semibold text-lg mb-4">Latest News</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- News item 1 -->
                        <div (click)="viewPost(post)" *ngFor="let post of posts" class="cursor-pointer border border-gray-200 rounded-md overflow-hidden shadow-sm">
                            <img alt="City skyline at sunset with tall buildings and orange sky" class="w-full h-40 object-cover" height="200" [src]="post.imageUrl" width="400" />
                            <div class="p-3">
                                <div class="flex items-center space-x-2 mb-2">
                                    <img [src]="post.authorAvatar" alt="Author" class="w-6 h-6 rounded-full" />
                                    <span class="text-sm font-medium text-gray-800">{{ post.authorFullname }}</span>
                                </div>

                                <h3 class="font-semibold text-base mb-1 leading-tight">{{ post.title }}</h3>
                                <p class="text-xs text-gray-500">17 mins read</p>
                            </div>
                        </div>
                    </div>
                    <!-- Pagination -->
                    <div class="pagination" *ngIf="totalPages > 1">
                        <button (click)="goToPage(page - 1)" [disabled]="page === 0">Previous</button>

                        <button *ngFor="let p of [].constructor(totalPages); let i = index" (click)="goToPage(i)" [class.active]="i === page">
                            {{ i + 1 }}
                        </button>

                        <button (click)="goToPage(page + 1)" [disabled]="page === totalPages - 1">Next</button>
                    </div>
                </div>
                <!-- Right side: Popular Articles -->
                <div class="relative md:w-1/4 mt-8 md:mt-0">
                    <h2 class="font-semibold text-lg mb-4">Popular Articles</h2>
                    <ul class="space-y-3 text-base text-gray-700">
                        <li (click)="viewPost(post)" *ngFor="let post of postssv">
                            <a class="hover:underline block"> {{post.title}} </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    `,
    styles: `
        .pagination {
            margin-top: 20px;
            display: flex;
            gap: 8px;
            align-items: center;
            justify-content: center;
        }

        .pagination button {
            padding: 6px 12px;
            border: none;
            background-color: #eee;
            cursor: pointer;
        }

        .pagination button.active {
            background-color: blue;
            color: white;
            font-weight: bold;
        }

        .pagination button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    `
})
export class UserPostComponent implements OnInit {
    viewPost(post: any) {
        this.router.navigate(['post-detail', post.slug]);
    }

    posts: any[] = [];
    totalPages = 0;
    page: number = 0;
    size: number = 6;
    keyword: string = '';
    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
            this.page = page;
            this.loadPosts();
        }
    }

    ngOnInit() {
        this.loadPosts();
        this.loadPostsSortView();
    }
    loadPosts() {
        const params = new HttpParams().set('page', this.page.toString()).set('size', this.size.toString()).set('keyword', this.keyword);
        console.log(params);
        this.http.get<any>(`http://localhost:8080/post/all`, { params }).subscribe((response) => {
            this.posts = response.data.content;
            this.totalPages = response.data.totalPages;
        });
    }
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}
    postssv: any[] = [];
    pagesv: number = 0;
    sizesv: number = 20;
    keywordsv: string = '';
    loadPostsSortView() {
        const params = new HttpParams().set('page', this.pagesv.toString()).set('size', this.sizesv.toString()).set('keyword', this.keywordsv);
        console.log(params);
        this.http.get<any>(`http://localhost:8080/post/all/sort-view`, { params }).subscribe((response) => {
            this.postssv = response.data.content;
        });
    }
}

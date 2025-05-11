import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
    selector: 'app-user-post-detail',
    standalone: true,
    imports: [CommonModule],
    template: `
        <!-- <div class="bg-white text-[#1E1E1E]">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex flex-col lg:flex-row gap-12">
      
      <main class="flex-1">
        <img [src]="post.imageUrl" alt="Post Image" class="w-full rounded-lg mb-8 object-cover max-h-[500px]">
        
        <h1 class="text-2xl lg:text-3xl font-bold mb-4">
          {{ post.title }}
        </h1>

        <div class="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6">
          <span>{{ post.authorFullname }}</span>
          <span>·</span>
          <span>Ngày 20 tháng 10, 2024</span>
          <span>·</span>
          <span>Đọc 5 phút</span>
        </div>

        <div class="prose prose-sm max-w-none text-justify text-[15px] leading-relaxed" [innerHTML]="post.content"></div>

        <div class="flex items-center gap-4 border-t border-gray-300 pt-8 mt-10">
          <img 
            src="https://storage.googleapis.com/a1aa/image/b7126972-65ea-459a-28e0-3d1046363245.jpg" 
            alt="Avatar of Nguyễn Văn A" 
            class="w-12 h-12 rounded-full object-cover" 
          />
          <div class="text-sm text-gray-600">
            <p class="font-semibold text-[#1E1E1E]">Nguyễn Văn A</p>
            <p class="text-xs">Chuyên gia thiết kế trải nghiệm người dùng và phát triển ứng dụng di động</p>
            <a href="#" class="text-blue-600 underline text-xs">Xem tất cả bài viết</a>
          </div>
        </div>
      </main>

      <aside class="w-full lg:w-80">
        <h3 class="text-sm font-bold mb-4 text-[#1E1E1E]">
          BÀI VIẾT NỔI BẬT
        </h3>
        <div class="space-y-5">
          <article *ngFor="let item of posts" class="flex gap-4">
            <img 
              [src]="item.imageUrl" 
              alt="Ảnh bài viết nổi bật" 
              class="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div class="text-sm text-gray-700">
              <p class="font-semibold text-[#1E1E1E] leading-tight">
                {{ item.title }}
              </p>
            </div>
          </article>
        </div>
      </aside>

    </div>
  </div>
</div> -->

        <div class="bg-white text-[#1E1E1E]">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div class="flex flex-col lg:flex-row gap-12">
                    <!-- Main content -->
                    <main class="flex-1">
                        <img [src]="post.imageUrl" alt="Post Image" class="w-full rounded-lg mb-8 object-cover max-h-[500px]" />

                        <h1 class="text-2xl lg:text-3xl font-bold mb-4">
                            {{ post.title }}
                        </h1>

                        <div class="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6">
                            <span>{{ post.authorFullname }}</span>
                            <span>·</span>
                            <span>Ngày 20 tháng 10, 2024</span>
                            <span>·</span>
                            <span>Đọc 5 phút</span>
                        </div>

                        <div class="prose prose-sm max-w-none text-justify text-[15px] leading-relaxed" [innerHTML]="post.content"></div>

                        <div class="mt-5 pt-5">
                          <div class="flex items-center gap-3 ml-auto w-fit">
                            <img [src]="post.authorAvatar" alt="Avatar của Trần Minh Tuấn" class="w-8 h-8 rounded-full object-cover" />
                            <div class="text-[10px] text-gray-600 leading-tight">
                              <p class="font-semibold text-base text-[#1E1E1E]">{{post.authorFullname}}</p>
                            </div>
                          </div>
                        </div>

                    </main>

                    <!-- Sidebar cố định -->
                    <aside class="hidden lg:block w-80 flex-shrink-0 relative">
                        <div class="sticky top-24">
                            <h3 class="text-sm font-bold mb-4 text-[#1E1E1E]">BÀI VIẾT NỔI BẬT</h3>
                            <div class="space-y-5">
                                <article (click)="viewPost(item)" *ngFor="let item of posts" class="flex gap-4 cursor-pointer">
                                    <img [src]="item.imageUrl" alt="Ảnh bài viết nổi bật" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                                    <div class="text-sm text-gray-700">
                                        <p class="font-semibold text-[#1E1E1E] leading-tight">
                                            {{ item.title }}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    `,
    styles: ``
})
export class UserPostDetailComponent implements OnInit {
    slug: string = '';
    post: any;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
        this.slug = params.get('slug') || '';
        if (this.slug) {
            this.getPostBySlug(this.slug);
        }
    });

    this.loadPosts();
}


    getPostBySlug(slug: string): void {
        const url = `http://localhost:8080/post/${slug}`;
        this.http.get<any>(url).subscribe(
            (res) => {
                this.post = res.data;
            },
            (error) => {
                console.error('Lỗi khi lấy bài viết:', error);
            }
        );
    }
    posts: any[] = [];
    page: number = 0;
    size: number = 10;
    keyword: string = '';
    loadPosts() {
        const params = new HttpParams().set('page', this.page.toString()).set('size', this.size.toString()).set('keyword', this.keyword);
        console.log(params);
        this.http.get<any>(`http://localhost:8080/post/all/sort-view`, { params }).subscribe((response) => {
            this.posts = response.data.content;
        });
    }
    viewPost(post: any) {
        this.router.navigate(['post-detail', post.slug]);
    }
}

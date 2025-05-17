import { Component, model, OnInit, ViewEncapsulation } from '@angular/core';
import { NavBarComponent } from './component/navbar';
import { ProductService } from '../service/product.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from './star-rating';
import { ProductCarouselComponent } from './product-carousel';
import { CategoryNavComponent } from './component/category-list';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { RouterLink } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { PopupComponent } from './component/popup-ads';

@Component({
    selector: 'app-home',
    standalone: true,
    // encapsulation: ViewEncapsulation.None,
    imports: [PopupComponent,GalleriaModule, RouterLink, ProductCarouselComponent, ButtonModule, TagModule, CarouselModule, CommonModule, RatingModule, FormsModule, CategoryNavComponent],
    template: `
        <div class="hidden md:block">
            <app-category-list />
        </div>
        <div class="welcome">
            <div class="avatar">
                <img class="avatar" [src]="myprofile.avatar ? myprofile.avatar : 'https://th.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7'" alt="" />
            </div>
            <div class="info">
                <p class="welcome-name">Bạn đã trở lại, {{ fullname }}</p>
                <div class="major" *ngIf="myprofile.favoriteCategory">
                    <span class="major-name">Danh mục yêu thích: {{ myprofile.favoriteCategory }}</span>  
                    <a href="#" class="edit-major text-blue-400 hover:text-blue-300 active:text-blue-300" [routerLink]="['/survey']">Chỉnh sửa thông tin</a>
                </div>
                <div class="major" *ngIf="!myprofile.favoriteCategory">
                    <span class="major-name">Chưa có danh mục yêu thích</span>
                    <a href="#" class="edit-major text-blue-400 hover:text-blue-300 active:text-blue-300" [routerLink]="['/survey']">Thêm thông tin</a>
                </div>
            </div>
        </div>

        <div class="banner">
            <p-galleria [value]="images" [numVisible]="5" [circular]="true" [showItemNavigators]="true" [autoPlay]="true" [showThumbnails]="false" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '100%' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; height:350px;object-fit:cover; display: block;" />
                </ng-template>
            </p-galleria>
        </div>

        <div class="what-will-you-learn" style="position: relative;">
            <app-product-carousel
                *ngIf="courses_preference_root != null && courses_preference_root.courses.length > 0"
                [title]="'Vì bạn đã chọn danh mục yêu thích'"
                [keyword]="courses_preference_root.categoryRoot"
                [courses]="courses_preference_root.courses"
            >
            </app-product-carousel>
            <app-product-carousel
                *ngIf="courses_preference_topic != null && courses_preference_topic?.[0]?.courses?.length > 0"
                [title]="'Vì bạn đã chọn chủ đề'"
                [keyword]="courses_preference_topic[0].categoryName"
                [courses]="courses_preference_topic[0].courses"
            >
            </app-product-carousel>
            <app-product-carousel
                *ngIf="courses_preference_topic != null && courses_preference_topic?.[1]?.courses?.length > 0"
                [title]="'Vì bạn đã chọn chủ đề'"
                [keyword]="courses_preference_topic[1].categoryName"
                [courses]="courses_preference_topic[1].courses"
            >
            </app-product-carousel>
            <app-product-carousel *ngIf="courses_activity != null && courses_activity.courses.length > 3" [title]="'Vì bạn đã xem khóa học liên quan đến '" [keyword]="courses_activity.categoryRoot" [courses]="courses_activity.courses">
            </app-product-carousel>

            <app-product-carousel *ngIf="courses_keyword.length > 3" [title]="'Vì bạn tìm kiếm từ khóa'" [keyword]="courses_keyword[0].keyword" [courses]="courses_keyword[0].courses"></app-product-carousel>
            <app-product-carousel *ngIf="courses_keyword.length > 3" [title]="'Vì bạn đã tìm kiếm từ khóa'" [keyword]="courses_keyword[1].keyword" [courses]="courses_keyword[1].courses"></app-product-carousel>
            <app-product-carousel *ngIf="courses_related_enrolled.length > 3" [title]="'Đề xuất theo những khóa học bạn đã mua gần đây'" [courses]="courses_related_enrolled"></app-product-carousel>
            <!-- <app-product-carousel *ngFor="let item of courses_recommend_admin" *ngIf="item.courses.length>0" [title]="'Hệ thống đề xuất cho bạn chủ đề '" [keyword]="item.categoryName" [courses]="item.courses"></app-product-carousel> -->
            <ng-container *ngFor="let item of courses_recommend_admin">
                <app-product-carousel *ngIf="item.courses.length > 3" [title]="'Hệ thống đề xuất cho bạn chủ đề '" [keyword]="item.categoryName" [courses]="item.courses"> </app-product-carousel>
            </ng-container>
        </div>
        <app-popup [course]="popupcourse"/>
    `,
    styles: `
        .border {
            border: 1px solid orange;
        }

        /* welcome */
        .welcome {
            width: 70%;
            margin: 30px auto;
            display: flex;
            align-items: center;
            padding: 20px 30px;
            border-radius: 12px;
            gap: 20px;
        }

        .avatar {
            width: 60px;
            height: 60px;
            flex-shrink: 0;
            overflow: hidden;
            border-radius: 50%;
            border: 2px solid #60A5FA;
        }

        .avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .welcome-name {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
            color: #333;
        }

        .major {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;
        }

        .major-name {
            font-size: 16px;
            color: #666;
        }

        .edit-major {
            font-size: 14px;
            // color: #a435f0;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.3s;
        }

        // .edit-major:hover {
        //     color: #7f24c9;
        // }

        .banner {
            max-width: 80%;
            margin: 0 auto;
            position: relative;
        }
        .banner img {
            width: 100%;
        }
        .banner-info {
            padding: 20px;
            width: 400px;
            background-color: #ffffff;
            position: absolute;
            top: 20%;
            left: 10%;
        }
        .banner-info-title {
            font-size: 25px;
            font-weight: bold;
        }
        .description {
            font-size: 18px;
            letter-spacing: 1px;
        }
        // letstart
        .let-start {
            max-width: 80%;
            margin: 30px auto;
            display: flex;
            flex-direction: column;
        }
        .p-link {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .p-link .title1 {
            font-size: 24px;
            font-weight: 600;
        }
        .p-link .link {
            color: #a435f0;
            font-size: 18px;
            font-weight: 700;
        }
        .p-link .link:active {
            background-color: red;
        }
        .past-video {
            margin-top: 20px;
            display: flex;
            flex: 1;
            justify-content: space-between;
        }
        .video-info img {
            width: 50%;
            /* flex-shrink: 0; */
        }

        .video-info {
            position: relative;
            width: 32%;
            display: flex;
            align-items: stretch;
            border-width: 1px 1px 1px 0px; /* Top Right Bottom Left */
            border-style: solid;
            border-color: rgba(0, 0, 0, 0.46);
        }
        .video-info::after {
            content: 'Play';
            position: absolute;
            top: 50%;
            left: 15%;
            transform: translate(-50%, -50%);
            font-size: 32px;
            color: white;
            background-color: rgba(0, 0, 0, 0.6);
            width: 70px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;
            transition: 0.3s ease-in-out;
        }
        .video-info::after:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }
        .infomation {
            display: flex;
            flex-direction: column;
            position: relative;
        }
        .infomation .title {
            margin-top: 10px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.742);
            margin-left: 15px;
        }
        .infomation .lecture-name {
            font-size: 16px;
            font-weight: 600;
            margin-left: 15px;
            margin-bottom: 5px;
        }
        .infomation::after {
            content: '';
            display: block;
            width: 100%;
            height: 5px;
            background-color: var(--primary-color);
        }
    `,
    providers: []
})
export class HomeComponent implements OnInit {
    courses_preference_root: any | null;
    courses_preference_topic: any | null;
    courses_activity: any | null;
    courses_keyword: any[] = [];
    courses_recommend_admin: any[] = [];
    courses_related_enrolled: any[] = [];
    value: number = 3;
    avatarUrl: string | null | undefined;
    fullname: string | null | undefined;
    favoriteCategory: string | null | undefined;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}
    popupcourse:any;

    ngOnInit() {
        this.loadProfile();
        this.avatarUrl = this.authService.getAvatar();
        this.fullname = this.authService.getFullname();
        this.favoriteCategory = this.authService.getFavoriteCategory();
        this.http.get<any>(`http://localhost:8080/advertisements/ads-for-learner`).subscribe((response) => {
            this.popupcourse = response.data;
        });
        this.http.get<any>(`http://localhost:8080/recommend/root`).subscribe((response) => {
            this.courses_preference_root = response.data;
            console.log('courses_preference_root:', this.courses_preference_root);
        });
        this.http.get<any>(`http://localhost:8080/recommend/recommend-admin`).subscribe((response) => {
            this.courses_recommend_admin = response.data;
        });
        this.http.get<any>(`http://localhost:8080/recommend/leafs`).subscribe((response) => {
            this.courses_preference_topic = response.data;
            console.log('courses_preference_topic:', this.courses_preference_topic);
        });
        this.http.get<any>(`http://localhost:8080/recommend/activity`).subscribe((response) => {
            this.courses_activity = response.data;
            console.log('courses_activity:', this.courses_activity);
        });
        this.http.get<any>(`http://localhost:8080/recommend/keyword`).subscribe((response) => {
            this.courses_keyword = response.data;
            console.log('courses_keyword:', this.courses_keyword);
        });
        this.http.get<any>(`http://localhost:8080/recommend/leafs`).subscribe((response) => {
            this.courses_preference_topic = response.data;
            console.log('courses_preference_topic:', this.courses_preference_topic);
        });
        this.http.get<any>(`http://localhost:8080/recommend/related-enrolled`).subscribe((response) => {
            this.courses_related_enrolled = response.data;
            console.log('related-enrolled:' + this.courses_related_enrolled);
        });
    }
    images: any[] = [
        {
            itemImageSrc: 'https://unisallevirtual.lasalle.edu.co/pluginfile.php/4049002/course/overviewfiles/6aa96182-b121-4e69-9427-f6450794018b.png',
            alt: 'Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: 'https://img-c.udemycdn.com/notices/web_carousel_slide/image/10ca89f6-811b-400e-983b-32c5cd76725a.jpg',
            alt: 'Image 2',
            title: 'Title 2'
        },
        {
            itemImageSrc: 'https://img-c.udemycdn.com/notices/web_carousel_slide/image/e6cc1a30-2dec-4dc5-b0f2-c5b656909d5b.jpg',
            alt: 'Image 3',
            title: 'Title 3'
        }
    ];

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];
    myprofile:any;
    loadProfile(){
        this.http.get<any>(`http://localhost:8080/profile`).subscribe((response) => {
            this.myprofile = response.data;
        });
    }
}

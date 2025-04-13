import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

@Component({
    selector: 'app-navbar',
    standalone: true,
    // encapsulation: ViewEncapsulation.None,
    imports: [RouterLink,ProductCarouselComponent, ButtonModule, TagModule, CarouselModule, CommonModule, RatingModule, FormsModule, CategoryNavComponent],
    template: `
        <app-category-list />
        <div class="welcome">
            <div class="avatar">
            <img class="avatar" [src]="avatarUrl ? avatarUrl : 'https://th.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7'" alt="" />
            </div>
            <div class="info">
                <p class="welcome-name">Bạn đã trở lại, {{fullname}}</p>
                <div class="major" *ngIf="favoriteCategory">
                    <span class="major-name">Danh mục yêu thích: {{favoriteCategory}}</span>
                    <a href="#" class="edit-major" [routerLink]="['/survey']">Chỉnh sửa thông tin</a>
                </div>
                <div class="major" *ngIf="!favoriteCategory">
                    <span class="major-name">Chưa có danh mục yêu thích</span>
                    <a href="#" class="edit-major" [routerLink]="['/survey']">Thêm thông tin</a>
                </div>
            </div>
        </div>

        <div class="banner">
            <!-- <img src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg" alt="" /> -->
            <img src="https://unisallevirtual.lasalle.edu.co/pluginfile.php/4049002/course/overviewfiles/6aa96182-b121-4e69-9427-f6450794018b.png" alt="" />
            <!-- <div class="banner-info">
                <h3 class="banner-info-title">Hãy bắt đầu ngay hôm nay</h3>
                <p class="description">Rèn luyện kĩ năng cho hiện tại và cả tương lai , hãy bắt đầu với chúng tôi</p>
            </div> -->
        </div>
        <!-- let start -->
        <!-- <div class="let-start">
            <div class="p-link">
                <span class="title1">Bắt đầu ngay thôi</span>
                <a href="#" class="link">My learning</a>
            </div>
            <div class="past-video">
                <div class="video-info">
                    <img src="https://s1.ivolunteer.vn/wp-content/uploads/2024/12/bc275b4ebf1523090460fb6b1ac68747.png" alt="" />
                    <div class="infomation">
                        <p class="title">Angular - The completed Guid 2024</p>
                        <p class="lecture-name">10. A new Starting Project & Analyzing The Project Structure</p>
                    </div>
                </div>
                <div class="video-info">
                    <img src="https://s1.ivolunteer.vn/wp-content/uploads/2024/12/bc275b4ebf1523090460fb6b1ac68747.png" alt="" />
                    <div class="infomation">
                        <p class="title">Angular - The completed Guid 2024</p>
                        <p class="lecture-name">10. A new Starting Project & Analyzing The Project Structure</p>
                    </div>
                </div>
                <div class="video-info">
                    <img src="https://s1.ivolunteer.vn/wp-content/uploads/2024/12/bc275b4ebf1523090460fb6b1ac68747.png" alt="" />
                    <div class="infomation">
                        <p class="title">Angular - The completed Guid 2024</p>
                        <p class="lecture-name">10. A new Starting Project & Analyzing The Project Structure</p>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="what-will-you-learn" style="position: relative;">
            <app-product-carousel *ngIf="courses_preference_root.courses.length > 0" [title]="'Vì bạn đã chọn danh mục yêu thích'" [keyword]="courses_preference_root.categoryRoot" [courses]="courses_preference_root.courses"> </app-product-carousel>
            <app-product-carousel *ngIf="courses_preference_topic?.[0]?.courses?.length > 0" [title]="'Vì bạn đã chọn chủ đề'" [keyword]="courses_preference_topic[0].categoryName" [courses]="courses_preference_topic[0].courses">
            </app-product-carousel>
            <app-product-carousel *ngIf="courses_preference_topic?.[1]?.courses?.length > 0" [title]="'Vì bạn đã chọn chủ đề'" [keyword]="courses_preference_topic[1].categoryName" [courses]="courses_preference_topic[1].courses">
            </app-product-carousel>
            <app-product-carousel *ngIf="courses_activity.courses.length > 0" [title]="'Vì bạn đã xem khóa học liên quan đến '" [keyword]="courses_activity.categoryRoot" [courses]="courses_activity.courses">
            </app-product-carousel>
            
            <app-product-carousel *ngIf="courses_keyword" [title]="'Vì bạn tìm kiếm từ khóa'" [keyword]="courses_keyword[0].keyword" [courses]="courses_keyword[0].courses"></app-product-carousel>
            <app-product-carousel *ngIf="courses_keyword" [title]="'Vì bạn đã tìm kiếm từ khóa'" [keyword]="courses_keyword[1].keyword" [courses]="courses_keyword[1].courses"></app-product-carousel>
            <app-product-carousel *ngIf="courses_related_enrolled" [title]="'Đề xuất theo những khóa học bạn đã mua gần đây'"  [courses]="courses_related_enrolled"></app-product-carousel>
        </div>
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
            border: 2px solid #a435f0;
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
            color: #a435f0;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.3s;
        }

        .edit-major:hover {
            color: #7f24c9;
        }

        .banner {
            max-width: 75%;
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
    courses_keyword: any | null;
    courses_related_enrolled: any|null;
    value: number = 3;
    avatarUrl:string | null |undefined;
    fullname:string | null |undefined;
    favoriteCategory:string | null |undefined;

    constructor(private http: HttpClient,private authService:AuthService) {}

    ngOnInit() {
        this.avatarUrl = this.authService.getAvatar();
        this.fullname = this.authService.getFullname();
        this.favoriteCategory = this.authService.getFavoriteCategory();
        this.http.get<any>(`http://localhost:8080/recommend/root`).subscribe((response) => {
            this.courses_preference_root = response.data;
        });
        this.http.get<any>(`http://localhost:8080/recommend/leafs`).subscribe((response) => {
            this.courses_preference_topic = response.data;
        });
        this.http.get<any>(`http://localhost:8080/recommend/activity`).subscribe((response) => {
            this.courses_activity = response.data;
        });
        this.http.get<any>(`http://localhost:8080/recommend/keyword`).subscribe((response) => {
            this.courses_keyword=response.data;
        });
        this.http.get<any>(`http://localhost:8080/recommend/leafs`).subscribe((response) => {
            this.courses_preference_topic = response.data;
        });
        this.http.get<any>(`http://localhost:8080/recommend/related-enrolled`).subscribe((response) => {
            this.courses_related_enrolled = response.data;
            console.log('related-enrolled:'+this.courses_related_enrolled)
        });
    }
}

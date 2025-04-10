import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { StarRatingComponent } from './star-rating';
import { CartService } from '../service/cart.service';

@Component({
    selector: 'app-course-detail',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [AccordionModule, CommonModule, StarRatingComponent],
    template: `
        <div class="wrapper">
            <div class="top-container">
                <div class="grid1">
                    <div class="course-info">
                        <!-- <p class="breadcrumb">IT & Software > Other IT & Software > Microservices</p> -->
                        <nav class="breadcrumb">
                            <a href="#">{{ course.categories[0].categoryName }}</a>
                            <span class="divider">/</span>
                            <a href="#">{{ course.categories[1].categoryName }}</a>
                            <span class="divider">/</span>
                            <span class="current">{{ course.categories[2].categoryName }}</span>
                        </nav>

                        <h1 class="course-detail-title">{{ course.title }}</h1>
                        <p class="course-subtitle">{{ course.subtitle }}</p>
                        <div class="rating-info">
                            <div class="rating-group" style="display: flex;gap:5px;">
                                <span class="avg-rating">{{ course.avgRating }}</span>
                                <app-star-rating [rating]="course.avgRating"></app-star-rating>
                            </div>
                            <span class="total-ratings">( {{ course.countRating }} ratings )</span>
                            <span class="total-students">( {{ course.countEnrolled }} students )</span>
                        </div>
                        <p class="author">
                            Created by <a href="#" class="author-link">{{ course.author.authorName }}</a>
                        </p>
                        <p class="updated-at"><i class="fa-solid fa-calendar"></i> Last Updated: October 2025</p>
                    </div>
                    <div class="course-preview">
                        <iframe
                            style="width: 100%;"
                            src="https://www.youtube.com/embed/l_uTKg05zIU"
                            title="PHD | Khởi Nghiệp Với 200 Nghìn Bằng Nghề Lái Xe Ôm Trong 30 Giờ | Tập 2 | Start Up"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                        <div class="course-preview-info">
                            <div class="cpi-price">
                                <span class="cpi-discount">đ{{ course.discount_price }}</span>

                                <!-- Chỉ hiển thị nếu có giảm giá -->
                                <span *ngIf="course.discount_price !== course.price" class="cpi-old-price"> đ{{ course.price }} </span>

                                <span *ngIf="course.discount_price !== course.price" class="cpi-sale-off"> {{ calculateDiscount(course.price, course.discount_price) }}% off </span>
                            </div>

                            <!-- Thông báo khẩn nếu đang giảm giá -->
                            <div *ngIf="course.discount_price !== course.price" class="emergency" style="margin-bottom:6px;">
                                <i class="fa-solid fa-bell"></i>
                                <strong>10 hour </strong>left at this price
                            </div>

                            <div class="cart-and-favorite">
                                <!-- <button class="btn-addtocart" (click)="handleCartClick()">
                                    {{ isInCart ? 'Go to cart' : 'Add to cart' }}
                                </button> -->
                                <button class="btn-addtocart" (click)="handleCartClick()" [disabled]="loading">
                                    <span *ngIf="!loading">{{ isInCart ? 'Go to cart' : 'Add to cart' }}</span>
                                    <span *ngIf="loading" class="spinner"></span>
                                </button>
                                <i class="fa-solid fa-heart heart"></i>
                            </div>
                            <div class="benefits">
                                <p class="benefit-title">This course includes:</p>
                                <ul class="benefit-list">
                                    <li class="benefit-item"><i class="fa-solid fa-video"></i>{{ course.duration }} hours on-demand video</li>
                                    <li class="benefit-item"><i class="fa-regular fa-file"></i>1 article</li>
                                    <li class="benefit-item"><i class="fa-solid fa-download"></i>3 downloadable resources</li>
                                    <li class="benefit-item"><i class="fa-solid fa-mobile"></i>Access on mobile and TV</li>
                                    <li class="benefit-item"><i class="fa-solid fa-infinity"></i>Full lifetime access</li>
                                    <li class="benefit-item"><i class="fa-solid fa-trophy"></i>Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bot-container">
                <div class="grid">
                    <div class="content-bottom">
                        <div class="whatwillyoulearn">
                            <h2 class="wwyl-title">Bạn sẽ được học những nội dung</h2>
                            <ul class="wwyl-list">
                                <li class="wwyl-item" *ngFor="let content of course.contents">{{ content.title }}</li>
                            </ul>
                        </div>
                        <div class="course-content">
                            <h2 class="course-content-title">Course Content</h2>
                            <div class="course-timeline">
                                <span class="ct-totalsections">21 sections</span>
                                <span class="ct-totallectures">200 lectures</span>
                                <span class="ct-totallength">32h 12m total length</span>
                            </div>
                            <div class="card" style="padding:0;width:100%;">
                                <p-accordion [value]="0" [multiple]="true">
                                    @for (section of courseSections; track section.id) {
                                        <p-accordion-panel [value]="section.id">
                                            <p-accordion-header>{{ section.title }}</p-accordion-header>
                                            <p-accordion-content>
                                                <ul>
                                                    @for (lecture of section.lectures; track lecture.id) {
                                                        <li>
                                                            {{ lecture.title }} ({{ lecture.duration }} mins)
                                                            <span *ngIf="lecture.type === 'video'">🎥</span>
                                                            <span *ngIf="lecture.type === 'quiz'">📝</span>
                                                        </li>
                                                    }
                                                </ul>
                                            </p-accordion-content>
                                        </p-accordion-panel>
                                    }
                                </p-accordion>
                            </div>
                        </div>
                        <div class="course-requirement" *ngIf="course.requirements.length > 0">
                            <h2 class="course-requirement-title">Yêu cầu của khóa học</h2>
                            <ul class="requirement-list">
                                <li class="requirement-item" *ngFor="let requirement of course.requirements">{{ requirement.title }}</li>
                            </ul>
                        </div>
                        <div class="course-description" *ngIf="course.description">
                            <h2 class="course-description-title">Mô tả khóa học</h2>
                            <p class="description-content" [innerHTML]="course.description"></p>
                        </div>
                        <div class="course-target" *ngIf="course.targets.length > 0">
                            <h2 class="course-target-title">Đối tượng phù hợp với khóa học</h2>
                            <ul class="target-list">
                                <li class="target-item" *ngFor="let target of course.targets">{{ target.title }}</li>
                            </ul>
                        </div>
                        <div class="course-instructor">
                            <h2 class="course-instructor-title">Giáo viên khóa học</h2>
                            <div class="course-instructor-content">
                                <a href="#" class="instructor-name">{{ course.author.authorName }}</a>
                                <span class="expertise">{{ course.author.expertise }}</span>
                                <div class="img-group">
                                    <img src="{{ course.author.authorAvatar }}" alt="Avatar" />
                                </div>
                                <span class="bio">{{ course.author.bio }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: `
    .spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
        .course-instructor {
            padding: 20px;
            background-color: #fdfdfd;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            width: 100%;
            margin: 0 auto;
            font-family: 'Segoe UI', sans-serif;
            color: #333;
        }

        .course-instructor-title {
            font-size: 1.5rem;
            margin-bottom: 16px;
            color: #222;
            font-weight: 600;
            border-left: 4px solid #007bff;
            padding-left: 12px;
        }

        .course-instructor-content {
            display: flex;
            align-items: flex-start;
            gap: 16px;
        }

        .img-group img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid #ccc;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .instructor-name {
            font-size: 1.2rem;
            font-weight: 600;
            color: #007bff;
            text-decoration: none;
        }

        .instructor-name:hover {
            text-decoration: underline;
        }

        .expertise {
            display: block;
            font-size: 0.95rem;
            color: #666;
            margin-bottom: 8px;
        }

        .bio {
            font-size: 1rem;
            color: #444;
            line-height: 1.6;
            white-space: pre-line;
        }

        // hehe
        .course-timeline {
            margin-bottom: 10px;
            font-size: 14px; /* Giảm kích thước chữ */
            color: #6c757d; /* Màu xám nhạt, hài hòa với màu tiêu đề accordion */
            display: flex;
            gap: 15px; /* Khoảng cách giữa các phần tử */
            align-items: center;
            margin-top: 20px; /* Khoảng cách trên cùng */
        }

        .ct-totalsections,
        .ct-totallectures,
        .ct-totallength {
            font-weight: normal; /* Không đậm, tạo sự nhẹ nhàng */
            font-size: 14px; /* Kích thước chữ nhỏ để dễ nhìn hơn */
            color: #6c757d; /* Màu chữ xám, dễ đọc và không gây mất tập trung */
        }

        .ct-totalsections span,
        .ct-totallectures span,
        .ct-totallength span {
            font-weight: normal; /* Giảm độ đậm của text */
        }

        p-accordion-header {
            background-color: #f8f9fa !important;
            font-weight: bold;
            padding: 12px;
            border-bottom: 1px solid #ddd;
        }

        p-accordion-content ul {
            list-style-type: none;
            padding: 10px;
        }

        p-accordion-content li {
            padding: 5px 0;
            font-size: 16px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        .wrapper {
            margin-top: 0;
            width: 100%;
        }

        .top-container {
            background-color: #1d1e27;
            color: white;
            padding: 20px 0;
        }

        .grid1 {
            position: relative;
            max-width: 70%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }

        .course-info {
            width: 70%;
        }
        // breadcrump
        .breadcrumb {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #6c757d;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .breadcrumb a {
            color: rgb(111, 131, 246);
            text-decoration: none;
            transition: color 0.2s;
        }

        .breadcrumb a:hover {
            color: rgba(111, 131, 246, 0.52);
            text-decoration: underline;
        }

        .breadcrumb .divider {
            margin: 0 8px;
            color: #9e9e9e;
        }

        .breadcrumb .current {
            font-weight: 500;
            color: #ffffff;
        }

        .course-detail-title {
            color: #fff;
            font-size: 32px;
            font-weight: bold;
            margin-top: 40px;
        }

        .course-subtitle {
            margin-top: 30px;
            font-size: 18px;
            color: #ffffff;
        }

        .rating-info {
            display: flex;
            gap: 10px;
            align-items: center;
            margin: 10px 0;
            font-size: 16px;
        }
        .avg-rating {
            font-size: 14px;
            color: #ffb400;
        }
        .total-ratings {
            font-size: 14px;
            color: rgb(111, 131, 246);
            text-decoration: underline;
        }
        .total-students {
            font-size: 14px;
        }

        .author {
            font-size: 14px;
            color: #ffffff;
            margin-right: 5px;
        }
        .author-link {
            font-size: 14px;
            color: rgb(111, 131, 246);
        }

        .updated-at {
            font-size: 14px;
            color: #be9a66;
            margin-top: 8px;
        }

        .course-preview {
            color: black;
            position: absolute;
            top: 15%;
            right: 0;
            background-color: #ffffff;
            width: 30%;
        }
        //         .course-preview {
        //     color: black;
        //     position: sticky;
        //     top: 100px; /* khoảng cách từ top khi sticky */
        //     background-color: #ffffff;
        //     width: 30%;
        //     align-self: flex-start; /* giữ chiều cao khớp khi sticky */
        // }

        .thumbnail {
            width: 100%;
            border-radius: 10px;
        }

        .enroll-btn {
            margin-top: 15px;
            padding: 12px 20px;
            background-color: #f04e30;
            color: white;
            font-size: 16px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }
        .grid {
            max-width: 70%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }

        .bot-container {
            width: 100%;
            padding: 40px 0;
        }

        .section-title {
            font-size: 24px;
            margin-bottom: 15px;
        }

        .learning-list {
            list-style: none;
        }

        .learning-list li {
            font-size: 16px;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }

        .learning-list li::before {
            content: '\xb9';
            color: #f04e30;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        /* course preview info */
        .course-preview-info {
            // position:fixed;
            background-color: white;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            font-family: Arial, sans-serif;
        }
        .cpi-price {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 10px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .cpi-discount {
            font-size: 22px;
            font-weight: 600;
            color: #111827; /* Gần như đen, nhẹ nhàng hơn */
        }

        .cpi-old-price {
            font-size: 16px;
            color: #9ca3af; /* xám nhạt hơn */
            text-decoration: line-through;
        }

        .cpi-sale-off {
            font-size: 14px;
            color: #10b981; /* xanh ngọc nhẹ */
            font-weight: 500;
            background-color: #ecfdf5;
            padding: 2px 6px;
            border-radius: 4px;
        }

        .emergency {
            font-size: 13px;
            color: #dc2626; /* đỏ nổi bật nhưng không quá gắt */
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 4px;
            background-color: #fef2f2;
            padding: 4px 8px;
            border-radius: 4px;
            max-width: fit-content;
        }

        .cart-and-favorite {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }

        .btn-addtocart {
            background-color: #6d28d9;
            color: white;
            padding: 12px;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            border: none;
            flex: 1;
        }
        .btn-addtocart:hover {
            background-color: rgb(109, 51, 202);
        }
        .btn-addtocart:active {
            background-color: rgba(108, 40, 217, 0.79);
        }

        .cart-and-favorite i {
            font-size: 20px;
            color: #6d28d9;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            border: 2px solid #6d28d9;
        }

        .benefits {
            margin-top: 16px;
        }

        .benefit-title {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 12px;
        }

        .benefit-list {
            list-style: none;
            padding: 0;
            color: #374151;
        }

        .benefit-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            font-size: 15px;
        }

        .benefit-item i {
            margin-right: 8px;
            color: #6d28d9;
        }
        /* wwyl */
        .whatwillyoulearn {
            border: 1px solid rgba(66, 65, 65, 0.42);
            background-color: white;
            /* padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(66, 65, 65, 0.42); */
            width: 65%;
            font-family: Arial, sans-serif;
        }
        .course-description,
        .course-requirement,
        .course-target {
            margin: 10px 0;
            width: 65%;
        }
        .requirement-list {
            list-style-type: disc; /* Hiển thị dấu chấm tròn */
            padding-left: 20px; /* Thụt vào để thấy rõ dấu chấm */
            margin: 0;
        }

        .requirement-item {
            margin-bottom: 6px; /* Khoảng cách giữa các dòng */
        }
        .target-list {
            list-style-type: disc; /* Hiển thị dấu chấm tròn */
            padding-left: 20px; /* Thụt vào để thấy rõ dấu chấm */
            margin: 0;
        }

        .target-item {
            margin-bottom: 6px; /* Khoảng cách giữa các dòng */
        }

        .description-content * {
            max-width: 100%;
            box-sizing: border-box;
            overflow-wrap: break-word;
            word-break: break-word;
        }

        .wwyl-title {
            font-size: 20px;
            font-weight: bold;
            color: #1f2937;
            // margin-bottom: 24px;
            padding: 24px 24px 0 24px;
        }

        .wwyl-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Chia cột động */
            gap: 16px;
            list-style: none;
            padding: 0;
            color: #374151;
            padding: 24px;
        }

        .wwyl-item {
            display: flex;
            align-items: center;
            position: relative;
            padding-left: 20px;
            font-size: 14px;
        }

        .wwyl-item::before {
            content: '✔';
            color: rgb(50, 50, 50);
            font-weight: bold;
            position: absolute;
            top: 10%;
            left: 0;
        }
        .content-bottom {
            width: 100%;
        }
        .course-content {
            margin-top: 24px;
            width: 65%;
        }
        .course-content-title {
            font-size: 20px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 24px;
        }
    `,
    providers: []
})
export class CourseDetailComponent implements OnInit {
    courseId: any;
    course: any;
    specialObject: any;
    courseSections: any[] = [];
    constructor(
        private router: ActivatedRoute,
        private http: HttpClient,
        private cartService: CartService,
        private route: Router
    ) {}
    ngOnInit(): void {
        this.router.paramMap.subscribe((params) => {
            this.courseId = +params.get('id')!;
            console.log('Course ID:', this.courseId);
        });
        this.http.get<any>(`http://localhost:8080/course/course-detail/${this.courseId}`).subscribe((response) => {
            this.course = response.data;
        });
        this.http.get<any>(`http://localhost:8080/course/${this.courseId}/sections-lectures`).subscribe((response) => {
            this.specialObject = response.data;
            this.courseSections = response.data.sections;
        });
        this.cartService.carts$.subscribe((carts) => {
            console.log(carts);
            this.isInCart = carts.some((c) => c.courseResponse.id === this.courseId);
            console.log('isInCart:', this.isInCart);
        });
    }
    isInCart: boolean = false;
    loading: boolean = false;
    handleCartClick() {
        if (this.isInCart) {
          this.route.navigate(['/cart']);
        } else {
          this.loading = true;
          this.cartService.addToCart(this.courseId).subscribe(() => {
            this.cartService.loadCart();
            // giả lập hiệu ứng loading 1s rồi mới set lại
            setTimeout(() => {
              this.loading = false;
              this.isInCart = true; // nếu bạn không dùng BehaviorSubject thì set thủ công
            }, 1000);
          });
        }
      }

    calculateDiscount(original: number, discount: number): number {
        if (!original || original === 0) return 0;
        const percent = Math.round(((original - discount) / original) * 100);
        return percent;
    }
    trackBySection(index: number, section: any) {
        return section.id;
    }

    trackByLecture(index: number, lecture: any) {
        return lecture.id;
    }
}

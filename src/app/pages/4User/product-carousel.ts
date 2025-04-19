import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { StarRatingComponent } from './star-rating';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-product-carousel',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [ToastModule,CommonModule, TagModule, CarouselModule, StarRatingComponent, RouterLink],
    template: `
        <div class="what-will-you-learn-item">
            <h2 class="card-container-title">
                {{ title }} <span *ngIf="keyword" class="keyword">"{{ keyword }}"</span>
            </h2>
            <div class="card-container">
                <div class="card-item" *ngFor="let course of courses">
                    <img [src]="course.thumbnail" alt="" class="card-item-img" [routerLink]="['/course-detail', course.id]" />
                    <span class="card-item-course-name">{{ course.title }}</span>
                    <span class="card-item-author-name">{{ course.authorName }}</span>
                    <div class="rating-info">
                        <span class="avg-rating">{{ course.avgRating }}</span>
                        <app-star-rating [rating]="course.avgRating" />
                        <span class="total-rating">( {{ course.countRating }} )</span>
                    </div>
                    <div class="price">
                        <span class="discount-price"> đ{{ course.discount_price | number:'1.0-0' }} </span>
                        <span class="origin-price">đ{{ course.price | number:'1.0-0' }}</span>
                    </div>
                    <span class="label" *ngIf="course.label !== 'NONE'" [ngClass]="course.label.toLowerCase()">
                        {{ course.label }}
                    </span>

                    <div class="product_carousel-hover">
                        <div class="wrapper">
                            <p class="product_carousel-hover-name">{{ course.title }}</p>
                            <div class="label-updated-at">
                                <span>Updated at March 3</span>
                            </div>
                            <div class="course-section-lecture">
                                <span class="totalhour">10 hours</span> |
                                <span class="level">{{ course.level }}</span>
                            </div>
                            <p class="subtitle">
                                {{ course.subtitle }}
                            </p>
                            <ul class="learning-content" *ngIf="course.contents.length > 0">
                                <li class="learning-content-item">{{ course.contents[0].title }}</li>
                                <li class="learning-content-item">{{ course.contents[1].title }}</li>
                                <li class="learning-content-item">{{ course.contents[2].title }}</li>
                            </ul>
                            <ul class="learning-content" *ngIf="course.contents.length == 0">
                                <li class="learning-content-item">Khẳng định mình là một nhà phát triển chuyên nghiệp lành nghề</li>
                                <li class="learning-content-item">Tự mình xây dựng các ứng dụng trong thế giới thực</li>
                                <li class="learning-content-item">Hiểu cách cấu trúc một ứng dụng bằng cách sử dụng các phương pháp hay nhất</li>
                            </ul>
                            <div class="btn-group">
                                <!-- <button class="add-to-cart" (click)="hello()">Add to cart</button> -->
                                <button class="add-to-cart" (click)="handleCartClick(course.id)" [disabled]="loadingMap[course.id]">
                                    <span *ngIf="!loadingMap[course.id]">
                                        {{ isInCartMap[course.id] ? 'Go to cart' : 'Add to cart' }}
                                    </span>
                                    <span *ngIf="loadingMap[course.id]" class="spinner"></span>
                                </button>

                                <button class="add-to-withlist"><i class="bi bi-heart"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p-toast></p-toast>
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
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        // hehe
        .keyword {
            font-size: 24px;
            text-decoration: underline;
            color: green;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Roboto', sans-serif;
        }

        .what-will-you-learn-item {
            margin-top: 20px;
            width: 100%;
            padding: 20px 0;
        }
        .card-container-title {
            width: 80%;
            margin: 20px auto;
        }

        .card-container {
            width: 90%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            position: relative;
            overflow: visible;
            z-index: 1;
        }

        .card-item {
            width: 220px;
            border-radius: 12px;
            transition:
                transform 0.3s ease,
                box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 10px;
            cursor: pointer;
        }

        .card-item:active {
            background-color: rgba(224, 219, 219, 0.61);
        }

        .card-item-img {
            width: 100%;
            border-radius: 8px;
            object-fit: cover;
            height: 120px;
            margin-bottom: 10px;
        }

        .card-item-course-name {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 6px;
            color: #333;
            line-height: 1.4;

            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .card-item-author-name {
            font-size: 13px;
            color: #666;
            margin-bottom: 6px;
        }

        .rating-info {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: #c4710d;
            margin-bottom: 6px;
        }
        .avg-rating {
            font-weight: 600;
        }
        .total-rating {
            color: rgba(61, 58, 58, 0.634);
        }

        .price {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 8px;
        }

        .discount-price {
            font-weight: bold;
            color: #000;
            font-size: 14px;
        }

        .origin-price {
            text-decoration: line-through;
            font-size: 12px;
            color: #999;
        }

        .label {
            position: absolute;
            top: 15px;
            left: 15px;
            color: white;
            padding: 4px 10px;
            font-size: 14px;
            border-radius: 4px;
            font-weight: bold;
            letter-spacing: 0.3px;
        }

        /* Style riêng cho từng loại */
        .new {
            background-color: #22c55e; /* xanh lá */
        }

        .bestseller {
            background-color: #f59e0b; /* cam */
        }

        .highrating {
            background-color: #3b82f6; /* xanh dương */
        }

        .trending {
            background-color: #ec4899; /* hồng */
        }

        .product_carousel-hover {
            background-color: #fff;
            width: 350px;
            position: absolute;
            top: -50%;
            // left: 100%;

            z-index: 999;
            // display: none;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease-in-out;
            transform: translateY(20px); /* hiệu ứng nhảy lên */
            padding: 16px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
        }

        .card-item:hover .product_carousel-hover {
            // display: block;
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .card-item:nth-child(1) .product_carousel-hover,
        .card-item:nth-child(2) .product_carousel-hover,
        .card-item:nth-child(3) .product_carousel-hover,
        .card-item:nth-child(4) .product_carousel-hover {
            left: 100%;
            right: auto; /* đảm bảo không bị ảnh hưởng */
        }

        .card-item:nth-child(5) .product_carousel-hover {
            right: 100%;
            left: auto;
        }

        .product_carousel-hover-name {
            font-size: 15px;
            font-weight: 600;
            color: #222;
            margin-bottom: 10px;
        }

        .label-updated-at span {
            font-size: 12px;
            color: #666;
            margin-bottom: 10px;
            display: block;
        }

        .course-section-lecture {
            font-size: 13px;
            color: #555;
            margin-bottom: 10px;
        }

        .course-section-lecture .totalhour,
        .course-section-lecture .level {
            font-weight: 500;
        }

        .subtitle {
            font-size: 13px;
            color: #333;
            line-height: 1.5;
            /* height: 150px;
    overflow: hidden;
    text-overflow: ellipsis; */
        }
        .btn-group {
            display: flex;
            gap: 8px;
            margin-top: 12px;
        }

        .add-to-cart {
            flex: 8;
            background-color: #1e40af;
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.3s ease;
        }

        .add-to-withlist {
            flex: 2;
            background-color: white;
            color: #1e40af;
            border: 1px solid #1e40af;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 18px;
            padding: 0 10px;
        }

        .add-to-withlist:hover {
            background-color: #1e40af;
            color: white;
        }

        .add-to-cart:hover {
            background-color: #1c40aad0;
        }

        .learning-content {
            list-style: none;
            padding: 0;
            margin-top: 12px;
        }

        .learning-content-item {
            position: relative;
            padding-left: 24px;
            margin-bottom: 8px;
            font-size: 14px;
            color: #333;
            line-height: 1.4;
        }

        .learning-content-item::before {
            content: '✓';
            position: absolute;
            left: 0;
            top: 0;
            color: green;
            font-weight: bold;
            font-size: 14px;
        }
    `,
    providers:[MessageService]
})
export class ProductCarouselComponent implements OnInit{

    @Input() title: string = ''; // Tiêu đề danh sách
    @Input() keyword?: string; // kwyword danh sach
    @Input() courses: any[] = []; // Danh sách sản phẩm
    isInCartMap: { [key: number]: boolean } = {};
    loadingMap: { [key: number]: boolean } = {};
    constructor(
        private cartService: CartService,
        private route: Router,
        private messageService:MessageService
    ) {}
    ngOnInit(): void {
        this.courses.forEach(course => {
            this.isInCartMap[course.id] = this.cartService.isInCart(course.id);
            console.log(this.isInCartMap)
          });
    }
    isCourseInCart(courseId: number): boolean {
        return this.cartService.isInCart(courseId);
    }

    handleCartClick(courseId: number) {
        if (this.isCourseInCart(courseId)) {
            this.route.navigate(['/cart']);
        } else {
            this.loadingMap[courseId] = true;
            this.cartService.addToCart(courseId).subscribe(() => {
                this.cartService.loadCart();
                setTimeout(() => {
                    this.loadingMap[courseId] = false;
                    this.isInCartMap[courseId] = true;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Add course to cart successfully'
                    });
                }, 1000);
            });
        }
    }
}

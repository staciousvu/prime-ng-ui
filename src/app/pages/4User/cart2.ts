import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './component/navbar';
import { CartService } from '../service/cart.service';
import { CommonModule } from '@angular/common';
import { forkJoin, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-cart2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <!-- <div class="max-w-6xl mx-auto p-6">
  <h1 class="text-4xl font-bold mb-6">Shopping Cart</h1>
  <p class="text-lg font-semibold mb-4">3 Courses in Cart</p>

  <div class="space-y-6">
    <div class="flex items-start justify-between border-b pb-4">
      <div class="flex gap-4">
        <img src="course1.jpg" alt="Course 1" class="w-36 h-24 object-cover rounded" />
        <div>
          <h2 class="font-bold text-lg">Java Spring Boot: Professional eCommerce Project Masterclass</h2>
          <p class="text-gray-600 text-sm">By Faisal Memon (EmbarkX) and 1 other</p>
          <div class="mt-1 flex items-center gap-2">
            <span class="bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">Bestseller</span>
            <span class="text-yellow-500 font-semibold">4.6</span>
            <span class="text-gray-500 text-sm">(1,436 ratings)</span>
          </div>
          <p class="text-sm text-gray-500 mt-1">89.5 total hours • 638 lectures • All Levels</p>
          <div class="mt-2 text-purple-600 text-sm space-x-4">
            <button>Remove</button>
            <button>Save for Later</button>
            <button>Move to Wishlist</button>
          </div>
        </div>
      </div>
      <div class="text-right font-semibold text-lg">₫1,099,000</div>
    </div>

  </div>

  <div class="mt-8 border-t pt-6 flex justify-between items-start">
    <div>
      <p class="text-2xl font-bold">Total: <span class="text-purple-700">₫3,617,000</span></p>
      <p class="text-sm text-gray-500 mt-1">You won't be charged yet</p>
    </div>
    <div class="space-y-4">
      <button class="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 w-full text-lg font-semibold">
        Proceed to Checkout →
      </button>
      <div>
        <p class="font-semibold mb-1">Promotions</p>
        <div class="flex items-center border rounded p-2 gap-2 bg-gray-50">
          <input type="text" value="KEEPLEARNING" class="flex-1 bg-transparent outline-none text-sm text-gray-700" readonly />
          <button class="text-gray-500 text-xl">✕</button>
        </div>
        <div class="mt-2 flex gap-2">
          <input type="text" placeholder="Enter Coupon" class="border px-3 py-2 rounded w-full text-sm" />
          <button class="bg-purple-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-purple-700">Apply</button>
        </div>
      </div>
    </div>
  </div>
</div> -->

        <div class="app">
            <div class="grid wrapper">
                <h1 class="myshoppingcart_title text-4xl">Shopping Cart</h1>
                <div class="myshoppingcart_content">
                    <div class="myshoppingcart_content-left">
                        <p class="total_course text-lg font-semibold mb-4">{{ myCarts.length }} Courses in Cart</p>
                        <ul class="myshoppingcart_content__list">
                            <li class="myshoppingcart_content__item-course" *ngFor="let item of myCarts">
                                <img [src]="item.courseResponse.thumbnail" alt="" class="myshoppingcart_content__item-course-img" />
                                <div class="myshoppingcart_content__item-course-information">
                                    <p class="course_name font-bold text-lg">{{ item.courseResponse.title }}</p>
                                    <p class="course_author text-gray-600 text-sm">{{ item.courseResponse.authorName }}</p>
                                    <div class="tag-rating">
                                        <span class="bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">{{ item.courseResponse.label }}</span>
                                        <span class="text-yellow-500 font-semibold">{{ item.courseResponse.avgRating }}</span>
                                        <span class="text-gray-500 text-sm">({{ item.courseResponse.countRating }} ratings)</span>
                                    </div>
                                    <p class="text-sm text-gray-500 mt-1">{{ item.totalHour.toFixed(1) }} total hours • {{ item.totalLectures }} lectures • {{ item.courseResponse.level }}</p>
                                </div>
                                <div class="myshoppingcart_content__item-course-action">
                                    <p class="remove padding-action" (click)="removeCourse(item.courseResponse.id)">
                                        <ng-container *ngIf="loadingRemoveIds.includes(item.courseResponse.id); else showText">
                                            <i class="fas fa-spinner fa-spin"></i>
                                        </ng-container>
                                        <ng-template #showText> Remove </ng-template>
                                    </p>
                                    <p class="save padding-action">Save for Later</p>
                                    <p class="move_to_with_list padding-action">Move to Withlist</p>
                                </div>
                                <div class="myshoppingcart_content__item-course-price">
                                    <p class="discount-price">đ{{ item.courseResponse.discount_price | number: '1.0-1' }} <i class="fa-solid fa-tag" style="color: #6c28d2;"></i></p>
                                    <p class="old-price">đ{{ item.courseResponse.price | number: '1.0-1' }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="myshoppingcart_content-right">
                        <div class="p-6 w-full max-w-md">
                            <p class="text-lg font-semibold text-gray-700 mb-2">Total:</p>
                            <p class="text-2xl font-bold text-dark-500 mb-2">đ{{ totalMoney | number: '1.0-1' }}</p>
                            <p class="text-base line-through text-gray-600 mb-2">đ{{ totalOldMoney | number: '1.0-1' }}</p>
                            <p class="text-lg text-[#6c28d2] font-medium mb-4">Sale off {{ saleOff.toFixed(1) }}%</p>

                            <button
                                (click)="onPayment()"
                                class="w-full bg-[#6c28d2] text-white py-3 px-5 rounded-xl transition mb-4 flex items-center justify-center gap-2
                                        hover:opacity-80 active:opacity-70"
                            >
                                Payment courses
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>

                            <p class="text-xs text-gray-500 text-center mb-6">You won't be charged yet</p>

                            <div class="border-t pt-4">
                                <p class="text-sm font-semibold text-gray-700 mb-2">Promotions</p>

                                <div class="bg-white border border-dark rounded-lg p-3 mb-4">
                                    <p class="text-sm font-medium text-dark-700 mb-1">ST13872HU is applied</p>
                                    <p class="text-xs text-dark-600">EduFlow coupon</p>
                                </div>

                                <div class="flex items-center gap-2">
                                    <input type="text" placeholder="Enter Coupon" class="flex-1 border border-[#6c28d2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" />
                                    <button class="bg-[#6c28d2] text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: `
        .app {
            margin-top: 20px;
            width: 100%;
        }
        .grid {
            max-width: 80%;
            margin: 0 auto;
        }
        .wrapper {
            display: flex;
            flex-direction: column;
        }
        .myshoppingcart_title {
            padding-top: 15px;
            margin-bottom: 20px;
            font-size: 36px;
            font-weight: bolder;
        }
        .myshoppingcart_content {
            display: flex;
        }
        .total_course {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        .myshoppingcart_content__list {
            padding-left: 0;
        }
        .myshoppingcart_content__list li {
            padding: 20px 0;
        }
        .myshoppingcart_content__list li:nth-child(odd) {
            border-top: 1px solid rgba(141, 139, 139, 0.668);
            border-bottom: 1px solid rgba(141, 139, 139, 0.668);
        }
        /* content left */
        .myshoppingcart_content-left {
            flex: 3;
            margin-right: 20px;
        }
        /* content right */
        .myshoppingcart_content-right {
            flex: 1;
        }
        .myshoppingcart_content__item-course {
            display: flex;
            align-items: flex-start;
        }
        .myshoppingcart_content__item-course-img {
            width: 150px;
            // height: 100px;
        }
        .myshoppingcart_content__item-course-information {
            width: 45%;
            margin-left: 20px;
        }
        .myshoppingcart_content__item-course-information .course_name {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.77);
            font-weight: bold;
            margin-bottom: 5px;
        }
        .myshoppingcart_content__item-course-information .course_author {
            font-size: 14px;
            font-weight: 400;
            color: rgb(134, 134, 134);
            margin-bottom: 13px;
        }
        .tag-rating {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        .tag-course {
            background-color: #c2e9eb;
            color: rgba(0, 0, 0, 0.688);
            padding: 4px 15px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: bold;
        }
        .avg-rating {
            color: #dd6e13;
            font-size: 14px;
        }
        .total-rating {
            font-size: 14px;
            font-weight: 400;
        }
        .hour-lecture-level {
            display: flex;
            gap: 15px;
            font-size: 12px;
            font-weight: 900;
            color: rgba(0, 0, 0, 0.747);
        }
        .dotted {
            position: relative;
        }
        .dotted::before {
            position: absolute;
            content: '.';
            width: 5px;
            height: 5px;
            background-color: rgba(0, 0, 0, 0.747);
            border-radius: 100%;
            top: 35%;
            left: -10px;
            display: block;
        }
        .myshoppingcart_content__item-course-action {
            display: flex;
            flex-direction: column;
            align-items: end;
            margin-right: 25px;
            font-size: 14px;
            color: #6d28d2;
        }
        .padding-action {
            padding: 5px 15px;
            cursor: pointer;
            /* border-radius: 5px; */
            /* border: 1px solid #6c28d2aa; */
        }
        .padding-action:hover {
            background-color: #6c28d2aa;
            color: #fff;
            border-radius: 5px;
            transition: all 0.2s;
        }
        .padding-action:active {
            background-color: #6c28d25d;
            color: #fff;
        }
        .myshoppingcart_content__item-course-price {
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
        }
        .discount-price {
            font-size: 18px;
            font-weight: bold;
        }
        .old-price {
            color: #000000c0;
            font-size: 18px;
            font-weight: bold;
            text-decoration: line-through;
            margin-right: 30px;
        }
        /* payment */
        .myshoppingcart_content-right {
            width: 100%;
        }
        .payment-wrapper {
            display: flex;
            flex-direction: column;
        }
        .payment_total {
            font-size: 18px;
            color: #403e3e;
            font-weight: bold;
        }
        .paymant_total-discount-price {
            font-size: 32px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.782);
        }
        .payment_total-oldprice {
            font-size: 18px;
            text-decoration: line-through;
            font-weight: bold;
            color: rgb(66, 64, 64);
        }
        .percent-off {
            font-size: 20px;
        }
        .btn-payment {
            width: 100%;
            padding: 10px 15px;
            background-color: #6c28d2;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
        }
        .btn-payment:hover {
            background-color: hsla(264, 68%, 49%, 0.74);
        }
        .btn-payment:active {
            background-color: rgba(108, 40, 210, 0.47);
            color: rgba(58, 57, 59, 0.47);
        }
        .wontcharged {
            font-size: 14px;
            font-weight: 300;
            padding-bottom: 15px;
            border-bottom: 1px solid rgb(110, 109, 109);
        }
        .promotion-title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 15px;
        }
        .promotion_box-voucher {
            display: flex;
            flex-direction: column;
            align-items: start;
            padding: 5px 15px;
            border: 2px dashed rgba(90, 86, 86, 0.708);
        }
        .marginb {
            margin-bottom: 8px;
        }
        .voucher-code {
            font-size: 15px;
            font-weight: 400;
            color: rgb(60, 58, 58);
        }
        .eduflow-coupon {
            font-size: 15px;
            font-weight: 400;
            color: rgb(60, 58, 58);
        }
        .enter-voucher {
            display: flex;
            align-items: center;
        }
        .enter-voucher input {
            width: 70%;
            margin-right: 5px;
            height: 25px;
            padding: 5px;
            border-color: #6c28d2;
            /* box-sizing: border-box; */
        }
        .btn-apply {
            height: 38px;
            width: 30%;
            background-color: #6c28d2;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }
    `
})
export class Cart2Component implements OnInit {
    onPayment() {
        const request = {
            email: this.authService.getEmail(),
            payment_method: 'VNPAY',
            total_amount: this.totalMoney,
            // total_amount:10000,
            courses: this.myCarts.map((item) => item.courseResponse.id),
            order_info: `Thanh toán đơn hàng cho user ${localStorage.getItem('email')}`
        };
        console.log('request:', request);
        this.http.post<any>('http://localhost:8080/payment/vn-pay', request).subscribe(
            (res) => {
                window.location.href = res.data;
            },
            (err) => {
                console.error('Lỗi thanh toán:', err);
            }
        );
    }
    loadingRemoveIds: number[] = [];
    totalMoney: number = 0;
    totalOldMoney: number = 0;
    saleOff: number = 0;
    removeCourse(courseId: number) {
        this.loadingRemoveIds.push(courseId); // Hiện spinner

        // Gọi API xoá + chờ ít nhất 1.5 giây
        const removeApi$ = this.cartService.removeFromCart(courseId);
        const minDelay$ = timer(1500);

        forkJoin([removeApi$, minDelay$]).subscribe({
            next: () => {
                this.cartService.loadCart(); // Load lại giỏ hàng
            },
            error: (err) => {
                console.error('Lỗi xoá khoá học khỏi giỏ:', err);
            },
            complete: () => {
                this.loadingRemoveIds = this.loadingRemoveIds.filter((id) => id !== courseId); // Ẩn spinner
            }
        });
    }
    myCarts: any[] = [];
    constructor(
        private cartService: CartService,
        private http: HttpClient,
        private router: Router,
        private authService:AuthService
    ) {}
    ngOnInit(): void {
        this.cartService.carts$.subscribe((carts) => {
            this.myCarts = carts;
        });
        this.cartService.totalMoney$.subscribe((totalMoney) => {
            this.totalMoney = totalMoney;
        });
        this.cartService.totalOldMoney$.subscribe((totalOldMoney) => {
            this.totalOldMoney = totalOldMoney;
        });
        this.cartService.saleOff$.subscribe((saleOff) => {
            this.saleOff = saleOff;
        });
    }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CartService } from '../../service/cart.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../service/notification.service';

@Component({
    selector: 'app-navbar-home',
    standalone: true,
    // encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="wrapper-nav w-full bg-white z-50">
            <!-- <div class="hidden md:block wrapper-nav w-full bg-white z-50"> -->

            <nav class="navbar">
                <div class="navbar-left">
                    <div class="logo">
                        <a href="#">Edu<span>Flow</span></a>
                    </div>
                    <span class="explore">Explore</span>
                    <div class="flex-1 relative w-full">
                        <input
                            type="text"
                            placeholder="Search courses for you..."
                            [(ngModel)]="searchKeyword"
                            (input)="onSearchInput()"
                            (keydown.enter)="onSearch()"
                            class=" w-full pl-10 pr-4 py-2 rounded-2xl bg-white shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                        />
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                        </svg>
                    </div>

                    <!-- <input type="text" placeholder="Search course for you" class="search-box" (input)="onSearchInput()" [(ngModel)]="searchKeyword" (keydown.enter)="onSearch()" /> -->
                    <ul class="search-result" *ngIf="coursesInput.length > 0">
                        <li *ngFor="let course of coursesInput" [routerLink]="['/course-detail', course.id]" (click)="clearSuggestions()">
                            <img [src]="course.thumbnail" alt="Course image" class="course-image" />
                            <div class="course-info">
                                <div class="course-title">{{ course.title }}</div>
                                <div class="course-author">{{ course.authorName }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="navbar-right">
                    <ul class="nav-links" *ngIf="isLoggedIn">
                        <li [routerLink]="'/post'" class="nav-link-item">Blog</li>
                        <li class="nav-link-item" [routerLink]="['/instructor/courses']">Teacher</li>
                        <li [routerLink]="'/my-learning'" class="nav-link-item mylearning" style="position: relative;">
                            My learning
                            <div class="mylearning_dropdown">
                                <ul class="mylearning_dropdown-list">
                                    <li class="mylearning_dropdown-item" *ngFor="let item of mycourses">
                                        <a href="#">
                                            <img [src]="item.thumbnail" alt="" />
                                            <div class="mylearning_dropdown-item-info">
                                                <div class="mylearning_dropdown-item-name">
                                                    <span class="course-name">{{ item.title }}</span>
                                                </div>
                                                <div class="progress"></div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="mylearning_dropdown-bottom">
                                    <button [routerLink]="'/my-learning'" class="mylearning_dropdown-btn">Khóa học của tôi</button>
                                </div>
                            </div>
                        </li>
                        <li [routerLink]="'/favorite'" class="nav-link-item">
                            <i class="bi bi-heart"></i>
                        </li>
                        <li [routerLink]="'/cart'" class="nav-link-item cart" style="position: relative;">
                            <i class="bi bi-cart"></i>
                            <span *ngIf="mycarts.length > 0" class="badge">{{ mycarts.length }}</span>
                            <div class="cart_dropdown" *ngIf="mycarts.length > 0">
                                <ul class="cart_dropdown__list">
                                    <li class="cart_dropdown__item" *ngFor="let item of mycarts">
                                        <img [src]="item.courseResponse.thumbnail" alt="" class="cart_dropdown__item-img" />
                                        <div class="cart_dropdown__item-information">
                                            <p class="name">{{ item.courseResponse.title }}</p>
                                            <p class="author">{{ item.courseResponse.authorName }}</p>
                                            <p class="price">đ{{ item.courseResponse.discount_price | number: '1.0-0' }}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="cart_dropdown-bottom">
                                    <p class="total_price">Total price : {{ totalInCart | number: '1.0-0' }}đ</p>
                                    <button [routerLink]="'/cart'" class="cart_dropdown__bottom-go">Tới giỏ hàng</button>
                                </div>
                            </div>
                        </li>
                        <li class="nav-link-item notification" style="position: relative;">
                            <i class="bi bi-bell"></i>
                            <span *ngIf="notifications.length > 0" class="badge">{{ notifications.length }}</span>
                            <div class="notification_dropdown" *ngIf="notifications.length > 0">
                                <div class="bg-white rounded-xl shadow-md w-full border border-gray-200">
                                    <div class="px-4 py-3 border-b border-gray-200">
                                        <p class="text-lg font-semibold text-gray-800">Notifications</p>
                                    </div>
                                    <ul class="max-h-96 overflow-y-auto divide-y divide-gray-100">
                                        <li class="flex items-start gap-4 px-4 py-3 hover:bg-gray-50 transition" *ngFor="let item of notifications">
                                            <div class="mr-3">
                                                <img class="rounded-full w-10 h-10" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                                            </div>
                                            <div class="font-semibold mr-3 flex-1">
                                                <div class="truncate">{{ item.title || 'Notification Title' }}</div>
                                                <div class="text-gray-600" style="font-size: 13px;font-weight:400">{{ item.message }}</div>
                                            </div>
                                            <div class="ml-auto text-right text-sm text-gray-500">
                                                <div class="pt-1">3d</div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="px-4 py-2 text-center border-t border-gray-200">
                                        <button class="text-sm font-medium text-blue-600 hover:underline" (click)="maskAllAsRead()">Mark all as read</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nav-link-item user-menu" style="position: relative;">
                            <img class="avatar" [src]="myprofile.avatar ? myprofile.avatar : 'https://th.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7'" alt="" />
                            <ul class="dropdown bg-white shadow-md rounded-lg py-2 px-0 w-56">
                                <li class="hover:bg-gray-100 px-4 py-2 rounded-md transition">
                                    <a [routerLink]="'/instructor/profiles/basic-information'" class="block text-gray-800 font-medium">Profile</a>
                                </li>
                                <li class="hover:bg-gray-100 px-4 py-2 rounded-md transition">
                                    <a [routerLink]="'/my-learning'" class="block text-gray-800 font-medium">My Learning</a>
                                </li>
                                <li class="hover:bg-gray-100 px-4 py-2 rounded-md transition">
                                    <a [routerLink]="'/favorite'" class="block text-gray-800 font-medium">Favorite</a>
                                </li>
                                <li class="hover:bg-gray-100 px-4 py-2 rounded-md transition">
                                    <a [routerLink]="'/cart'" class="block text-gray-800 font-medium">My Cart</a>
                                </li>
                                <li class="hover:bg-gray-100 px-4 py-2 rounded-md transition">
                                    <a [routerLink]="'/message'" class="block text-gray-800 font-medium">Message</a>
                                </li>
                                <li class="hover:bg-gray-100 px-4 py-2 rounded-md transition">
                                    <a href="#" class="block text-gray-800 font-medium">Settings</a>
                                </li>
                                <li class="px-4">
                                    <hr class="my-2 border-gray-300" />
                                </li>
                                <li class="hover:bg-gray-100 px-4 py-2 rounded-md transition">
                                    <button class="w-full text-left text-red-600 font-medium hover:text-red-800" (click)="logout()">Logout</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav-links-noauth" *ngIf="!isLoggedIn">
                        <li class="nav-link-item-noauth"><button (click)="login()" class="login">Login</button></li>
                        <li class="nav-link-item-noauth"><button class="signup" [routerLink]="'/user/register'">Sign up</button></li>
                    </ul>
                </div>
            </nav>
        </div>
    `,
    styles: `
        .wrapper-nav {
            //   margin: 2px 0px;
            width: 100%;
            border-bottom: 2px solid rgba(223, 223, 223, 0.69);
        }
        * {
            text-decoration: none;
            margin: 0;
            font-size: 15px;
            color: rgb(73, 72, 72);
            font-family: 'Roboto', sans-serif;
        }
        li {
            list-style: none;
        }
        .logo a {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-decoration: none;
        }
        .logo span {
            color: #007bff;
            font-size: 24px;
        }
        .navbar {
            width: 80%;
            margin: 10px auto;
            display: flex;
        }
        .navbar-left {
            position: relative;
            flex: 6;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
        // search result
        .search-result {
            position: absolute;
            top: 100%;
            left: 30%;
            width: 500px;
            z-index: 1000;
            color: #000;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 6px;
            max-height: 500px;
            overflow-y: auto;
            padding: 0;
            margin: 5px 0 0 0;
            list-style: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .search-result li {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .search-result li:hover {
            background-color: #f9f9f9;
        }

        .course-image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 4px;
            margin-right: 12px;
        }

        .course-info {
            display: flex;
            flex-direction: column;
        }

        .course-title {
            font-weight: 600;
            font-size: 16px;
        }

        .course-author {
            font-size: 14px;
            color: #777;
        }

        // search result
        .search-box {
            width: 100%;
            height: 40px;
            padding: 0 15px;
            border: 1px solid #ccc;
            border-radius: 20px;
            font-size: 14px;
            margin-left: 20px;
            outline: none;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        .search-box:focus {
            border-color: #6d28d2;
        }

        .navbar-right {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 4;
        }
        .navbar-right .nav-links {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding-left: 0;
        }
        .nav-link-item {
            font-weight: 500;
            cursor: pointer;
            padding: 7px 10px;
        }
        .nav-link-item:hover {
            background-color: #6c28d219;
            border-radius: 6px;
        }
        .nav-link-item:hover,
        .nav-link-item:hover i {
            color: #6d28d2;
        }
        .nav-link-item:active,
        .nav-link-item:active i {
            color: #6c28d277;
        }
        .nav-link-item:active {
            background-color: #6c28d219;
            color: #6c28d277;
            border-radius: 6px;
        }
        i {
            color: rgb(55, 54, 54);
        }
        .avatar {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 100%;
        }
        .nav-links-noauth {
            display: flex;
            justify-content: end;
            align-items: center;
            gap: 10px;
            padding-left: 0;
        }

        .signup {
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            padding: 5px 10px;
            background-color: #6d28d2;
        }
        .login {
            color: #6d28d2;
            font-size: 18px;
            font-weight: 600;
            padding: 5px 10px;
            background-color: transparent;
            border: 1px solid #6d28d2;
        }
        .login:active {
            background-color: #6d28d2;
            color: #fff;
        }
        .signup:active {
            background-color: rgba(108, 40, 210, 0.43);
        }
        .badge {
            position: absolute;
            top: 0px;
            right: 0px;
            background-color: #ff0000;
            color: white;
            font-size: 10px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        /* end css nav basic */
        /* notification */
        .notification {
            font-size: 14px;
            position: relative;
        }
        .notification::after {
            content: '';
            width: 100%;
            height: 45px;
            position: absolute;
            right: 0;
            z-index: 999;
            // pointer-events: none;
            // display:none;
            background-color: transparent;
        }
        .notification_dropdown {
            position: absolute;
            top: 147%;
            right: 0;
            width: 400px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: none;
            z-index: 1000;
        }
        .notification_dropdown-header {
            border-bottom: 1px solid rgba(0, 0, 0, 0.201);
        }
        .notification_dropdown__list {
            /* margin: 15px; */
            padding-left: 0;
        }
        .notification_dropdown-header p {
            // font-size: 20px;
            // font-weight: 600;
            margin: 15px;
        }
        .notification:hover .notification_dropdown {
            display: block;
        }
        // .notification:hover .notification::after{
        //     display:block;
        // }
        .notification_dropdown__list-item {
            padding: 0 15px 0 0;
            margin: 15px;
            width: 100%;
            /* margin-bottom: 15px; */
            display: flex;
            align-items: center;
        }

        // .notification_dropdown__list-item a {
        //     font-size: 20px;
        //     font-weight: 500;
        // }

        .notification_dropdown img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
        // .notification_dropdown a {
        //     font-size: 14px;
        //     color: #333;
        //     text-decoration: none;
        // }
        .notification_dropdown a:hover {
            color: #007bff;
        }
        .mask {
            margin: 10px;
            text-align: center;
            background-color: #6d28d2;
        }
        .mask p {
            margin: 0;
            padding: 10px;
            font-size: 16px;
            color: white;
            cursor: pointer;
        }
        .mask:active {
            background-color: #a535f061;
        }
        .mask:hover {
            background-color: #6c28d2cb;
        }
        /* notification */
        /* cart */
        /* .cart {
    position: relative;
    display: inline-block;
    text-decoration: none;
    color: inherit;
} */
        .cart::after {
            content: '';
            position: absolute;
            width: 150%;
            height: 20px; /* Điều chỉnh kích thước phù hợp */
            top: 100%;
            right: 0;
            z-index: 999;
            background: transparent;
        }
        /* Dropdown ẩn mặc định */
        .cart_dropdown {
            background-color: white;
            border: 1px solid #ddd;
            position: absolute;
            width: 320px;
            top: 147%;
            right: 0;
            display: none;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            padding: 10px;
            z-index: 1000;
            border-radius: 8px;
        }

        /* Hiển thị dropdown khi hover vào giỏ hàng */
        .cart:hover .cart_dropdown {
            display: block;
        }

        /* Danh sách sản phẩm trong dropdown */
        .cart_dropdown__list {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 300px;
            overflow-y: auto;
        }

        .cart_dropdown__item {
            height: 100px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
        }
        .cart_dropdown__item:hover {
            background-color: #d6d3d9;
        }
        .cart_dropdown__item:active {
            background-color: #d6d3d988;
        }
        .cart_dropdown__item:last-child {
            border-bottom: none;
        }

        .cart_dropdown__item img {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 5px;
            margin-right: 10px;
        }

        .cart_dropdown__item-information {
            flex: 1;
            font-size: 14px; /* Chữ nhỏ hơn */
            color: black; /* Chữ màu đen */
        }

        .cart_dropdown__item-information p {
            margin: 3px 0;
        }

        .cart_dropdown__item .name {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.823);
            font-weight: 600;
        }
        .cart_dropdown__item .author {
            font-size: 12px;
            color: rgba(74, 74, 74, 0.753);
            font-weight: bold;
        }

        .cart_dropdown__item .price {
            font-size: 14px;
            color: rgb(72, 71, 71);
            font-weight: bold;
        }

        /* Phần tổng tiền và nút đi tới giỏ hàng */
        .cart_dropdown-bottom {
            padding: 5px 10px;
            text-align: left;
            border-top: 1px solid #ddd;
            margin-top: 10px;
        }

        .total_price {
            font-size: 16px; /* Vừa phải */
            font-weight: bold; /* In đậm */
            color: rgb(65, 65, 65);
            margin: 10px 0;
        }

        .cart_dropdown__bottom-go {
            background-color: #6d28d2; /* Nền tím */
            color: white; /* Chữ trắng */
            border: none;
            width: 100%;
            padding: 8px 12px;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
        }

        .cart_dropdown__bottom-go:hover {
            background-color: #6c28d2c8;
        }
        .cart_dropdown__bottom-go:active {
            background-color: #6c28d287;
            color: rgba(255, 255, 255, 0.595);
        }
        /* cart */
        /* my learning */

        .mylearning::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 45px;
            right: 0;
            background-color: transparent;
            z-index: 999;
        }

        .mylearning-link {
            text-decoration: none;
            color: black;
            /* font-weight: bold; */
        }

        .mylearning_dropdown {
            background-color: white;
            position: absolute;
            right: 0;
            top: 147%;
            width: 300px;
            display: none;
            z-index: 1000;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px;
        }

        .mylearning:hover .mylearning_dropdown {
            display: block;
        }

        .mylearning_dropdown-list {
            max-height: 350px;
            overflow-y: auto;
            padding-left: 0;
            margin: 0;
            list-style: none;
        }

        .mylearning_dropdown-item {
            display: flex;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #ddd;
        }
        .mylearning_dropdown-item:hover {
            background-color: #d6d3d9;
        }
        .mylearning_dropdown-item:active {
            background-color: #d6d3d988;
        }

        .mylearning_dropdown-item a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: black;
            width: 100%;
        }

        .mylearning_dropdown-item img {
            width: 80px;
            // height: 60px;
            border-radius: 5px;
            margin-right: 10px;
        }

        .mylearning_dropdown-item-name {
            flex: 1;
        }

        .course-name {
            font-size: 14px;
            font-weight: 500;
        }

        .mylearning_dropdown-bottom {
            text-align: center;
            padding: 10px;
        }

        .mylearning_dropdown-btn {
            width: 100%;
            background-color: #6d28d2;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }

        .mylearning_dropdown-btn:hover {
            background-color: #6c28d2b8;
        }
        .progress {
            width: 100%;
            height: 5px;
            background-color: #706e72;
            position: relative;
        }
        .progress::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 5px;
            background-color: #5a0ca3;
        }
        /* dropdown */
        .user-menu::after {
            content: '';
            position: absolute;
            top: 20%;
            width: 100%;
            height: 50px;
            right: 0;
            background-color: transparent;
            display: block;
            z-index: 999;
        }
        .dropdown {
            position: absolute;
            top: 110%;
            right: 0;
            width: 200px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            list-style: none;
            padding: 10px 0;
            margin: 0;
            display: none;
            z-index: 1000;
        }
        .user-menu:hover .dropdown {
            display: block;
        }
        .dropdown li {
            padding: 5px 15px;
        }
        .dropdown li:hover {
            background-color: #f5f5f5;
        }
        .dropdown li:active {
            background-color: #25242487;
        }
        .dropdown li:active a {
            color: white;
        }
        .dropdown a {
            font-size: 15px;
            color: #333;
            text-decoration: none;
            display: block;
        }

        .dropdown hr {
            border: none;
            border-top: 1px solid #eee;
            margin: 5px 0;
        }
    `
})
export class NavBarComponent implements OnInit {
    blogClick() {
        this.notificationService.addNotification('https://th.bing.com/th/id/OIP.CRJqLVAgLwQL-3KdP8Cz6AHaHa?rs=1&pid=ImgDetMain', 'Bảo trì', 'Hệ thông sẽ tiến hành bảo trì vào 23/05/2025, mong quý học sinh thông cảm ', 3000);
    }
    currentPage = 0;
    pageSize = 8;
    coursesInput: any[] = [];
    onSearchInput() {
        if (this.searchKeyword.trim() != '') {
            const params = new HttpParams().set('page', this.currentPage.toString()).set('size', this.pageSize.toString()).set('keyword', this.searchKeyword.trim());

            this.http.get<any>(`http://localhost:8080/course/search/basic`, { params }).subscribe((response) => {
                this.coursesInput = response.data.content;
            });
        } else {
            this.coursesInput = [];
        }
    }
    clearSuggestions() {
        this.coursesInput = [];
    }

    onSearch(): void {
        if (this.searchKeyword.trim()) {
            this.router.navigate(['/search', this.searchKeyword.trim()]);
            this.coursesInput = [];
        }
    }
    mycourses: any[] = [];
    mycarts: any[] = [];
    totalInCart: any;
    avatarUrl: string | null | undefined;
    notifications: any[] = [];
    searchKeyword: string = '';
    calculateTotalInCart() {
        let total = 0;
        this.mycarts.forEach((item) => {
            total += item.courseResponse.discount_price;
        });
        this.totalInCart = parseFloat(total.toFixed(2));
    }
    login() {
        this.router.navigate(['user/login']);
    }
    logout() {
        console.log('Logout clicked in AppTopbar!');

        this.authService.logout();
        this.router.navigate(['user/login']);
    }
    isLoggedIn: boolean = false;
    constructor(
        private authService: AuthService,
        private router: Router,
        private http: HttpClient,
        private cartService: CartService,
        private notificationService: NotificationService
    ) {}
    loadNotifications() {
        this.http.get<any>(`http://localhost:8080/notification/unread`).subscribe((response) => {
            this.notifications = response.data;
        });
    }
    maskAllAsRead() {
        const request = {
            idsNotificationRead: this.notifications.map((item) => item.id)
        };
        this.http.post<any>(`http://localhost:8080/notification/mark-all-as-read`, request).subscribe((response) => {
            this.loadNotifications;
            this.notifications = [];
        });
    }
    private loadUserData() {
        this.cartService.loadCart();
        this.loadNotifications();
        this.avatarUrl = this.authService.getAvatar();

        this.http.get<any>(`http://localhost:8080/course/my-courses/learner?page=0&size=10`).subscribe((response) => {
            this.mycourses = response.data.content;
        });

        this.cartService.carts$.subscribe((carts) => {
            this.mycarts = carts;
            this.calculateTotalInCart();
        });
    }

    ngOnInit(): void {
        this.loadProfile();
        this.authService.getAuthStatus().subscribe((status) => {
            this.isLoggedIn = status;
            if (status) {
                this.loadUserData();
            }
        });
    }
    myprofile:any;
    loadProfile(){
        this.http.get<any>(`http://localhost:8080/profile`).subscribe((response) => {
            this.myprofile = response.data;
        });
    }
}

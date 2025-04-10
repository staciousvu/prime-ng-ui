import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../service/cart.service';

@Component({
    selector: 'app-navbar-home',
    standalone: true,
    // encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="wrapper-nav">
            <nav class="navbar">
                <div class="navbar-left">
                    <div class="logo">
                        <a href="#">Edu<span>Flow</span></a>
                    </div>
                    <span class="explore">Explore</span>
                    <input type="text" placeholder="Search course for you" class="search-box" />
                </div>
                <div class="navbar-right">
                    <ul class="nav-links" *ngIf="isLoggedIn">
                        <li class="nav-link-item">Blog</li>
                        <li class="nav-link-item">Teacher</li>
                        <li [routerLink]="'/my-learning'" class="nav-link-item mylearning" style="position: relative;">
                            My learning
                            <div class="mylearning_dropdown">
                                <ul class="mylearning_dropdown-list">
                                    <li class="mylearning_dropdown-item" *ngFor="let item of mycourses">
                                        <a href="#">
                                            <img [src]="item.thumbnail" alt="" />
                                            <div class="mylearning_dropdown-item-info">
                                                <div class="mylearning_dropdown-item-name">
                                                    <span class="course-name">{{item.title}}</span>
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
                        <li class="nav-link-item">
                            <i class="bi bi-heart"></i>
                        </li>
                        <li [routerLink]="'/cart'" class="nav-link-item cart" style="position: relative;">
                            <i class="bi bi-cart"></i>
                            <span class="badge">{{mycarts.length}}</span>
                            <div class="cart_dropdown">
                                <ul class="cart_dropdown__list">
                                    <li class="cart_dropdown__item" *ngFor="let item of mycarts">
                                        <img [src]="item.courseResponse.thumbnail" alt="" class="cart_dropdown__item-img" />
                                        <div class="cart_dropdown__item-information">
                                            <p class="name">{{item.courseResponse.title}}</p>
                                            <p class="author">{{item.courseResponse.authorName}}</p>
                                            <p class="price">đ{{item.courseResponse.discount_price}}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="cart_dropdown-bottom">
                                    <p class="total_price">Total price : {{totalInCart}}đ</p>
                                    <button [routerLink]="'/cart'" class="cart_dropdown__bottom-go">Tới giỏ hàng</button>
                                </div>
                            </div>
                        </li>
                        <li class="nav-link-item notification" style="position: relative;">
                            <i class="bi bi-bell"></i>
                            <span class="badge">2</span>
                            <div class="notification_dropdown">
                                <div class="notification_dropdown-header">
                                    <p>Notification</p>
                                </div>
                                <ul class="notification_dropdown__list">
                                    <li class="notification_dropdown__list-item">
                                        <img src="https://cdn1.iconfinder.com/data/icons/man-user-human-profile-avatar-business-person/100/09-1User_3-4-1024.png" alt="Admin" />
                                        <a href="#">Khóa học mới sắp khai giảng!</a>
                                    </li>
                                    <li class="notification_dropdown__list-item">
                                        <img src="https://cdn1.iconfinder.com/data/icons/man-user-human-profile-avatar-business-person/100/09-1User_3-4-1024.png" alt="Admin" />
                                        <a href="#"> Cập nhật quan trọng từ hệ thống.</a>
                                    </li>
                                </ul>
                                <div class="mask">
                                    <p>Mask all as read</p>
                                </div>
                            </div>
                        </li>
                        <li class="nav-link-item user-menu" style="position: relative;">
                            <img class="avatar" src="https://th.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
                            <ul class="dropdown">
                                <li class="dropdown-item"><a href="#">Profile</a></li>
                                <li class="dropdown-item" [routerLink]="'/my-learning'"><a>My Learning</a></li>
                                <li class="dropdown-item" [routerLink]="'/cart'"><a>My Cart</a></li>
                                <li class="dropdown-item"><a href="#">Settings</a></li>
                                <li class="dropdown-item">
                                    <hr />
                                </li>
                                <li class="dropdown-item"><a href="#" class="logout" (click)="logout()">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav-links-noauth" *ngIf="!isLoggedIn">
                        <li class="nav-link-item-noauth"><button (click)="login()" class="login">Login</button></li>
                        <li class="nav-link-item-noauth"><button class="signup">Sign up</button></li>
                    </ul>
                </div>
            </nav>
        </div>
    `,
    styles: `
        .wrapper-nav {
            //   margin: 2px 0px;
            width: 100%;
            border-bottom: 1px solid rgb(159, 154, 154);
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
            flex: 6;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
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
            height: 250%;
            position: absolute;
            right: 0;
            z-index: 999;
            // pointer-events: none;
            // display:none;
            background-color: transparent;
        }
        .notification_dropdown {
            position: absolute;
            top: 240%;
            right: 0;
            width: 300px;
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
            font-size: 20px;
            font-weight: 600;
            margin: 15px;
        }
        .notification:hover .notification_dropdown {
            display: block;
        }
        // .notification:hover .notification::after{
        //     display:block;
        // }
        .notification_dropdown__list-item {
            margin: 15px;
            width: 100%;
            /* margin-bottom: 15px; */
            display: flex;
            align-items: center;
        }

        .notification_dropdown__list-item a {
            font-size: 20px;
            font-weight: 500;
        }

        .notification_dropdown img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .notification_dropdown a {
            font-size: 14px;
            color: #333;
            text-decoration: none;
        }
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
            width: 200%;
            height: 100px; /* Điều chỉnh kích thước phù hợp */
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
            top: 240%; /* Xuất hiện ngay bên dưới */
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
            height: 100px;
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
            top: 240%;
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
            padding :15px 0;
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
            top: 100%;
            width: 100%;
            height: 50px;
            right: 0;
            background-color: transparent;
            display: block;
            z-index: 999;
        }
        .dropdown {
            position: absolute;
            top: 155%;
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
    mycourses:any[]=[];
    mycarts:any[]=[];
    totalInCart:any;
    calculateTotalInCart(){
        let total = 0;
        this.mycarts.forEach(item => {
            total += item.courseResponse.discount_price;
        })
        this.totalInCart = parseFloat(total.toFixed(2));
    }
    login() {
        this.router.navigate(['user/login']);
    }
    logout() {
        console.log('Logout clicked in AppTopbar!');

        this.authService.logout();
        // this.router.navigate(['/home']);
    }
    isLoggedIn: boolean = false;
    constructor(
        private authService: AuthService,
        private router: Router,
        private http:HttpClient,
        private cartService: CartService,
    ) {}
    ngOnInit(): void {
        
        this.authService.getAuthStatus().subscribe((status) => {
            this.isLoggedIn = status;
        });
        this.http.get<any>(`http://localhost:8080/course/my-courses/learner?page=0&size=10`).subscribe(
            (response) => {
                this.mycourses = response.data.content;
                console.log('mycourse:'+this.mycourses);
            }
        )
        this.calculateTotalInCart();
        this.cartService.carts$.subscribe((carts) => {
            this.mycarts = carts;
            this.calculateTotalInCart();
          });
    }
}

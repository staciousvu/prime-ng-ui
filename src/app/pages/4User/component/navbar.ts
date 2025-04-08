import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar-home',
    standalone: true,
    // encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="wrapper">
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
                                <li class="mylearning_dropdown-item">
                                    <a href="#">
                                        <img src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image_variant/a443126035c4_w240.webp" alt="" />
                                        <div class="mylearning_dropdown-item-info">
                                            <div class="mylearning_dropdown-item-name">
                                                <span class="course-name">Angular - The Completed Guide 2024</span>
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
                        <span class="badge">2</span>
                        <div class="cart_dropdown">
                            <ul class="cart_dropdown__list">
                                <li class="cart_dropdown__item">
                                    <img src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image_variant/a443126035c4_w240.webp"
                                        alt="" class="cart_dropdown__item-img" />
                                    <div class="cart_dropdown__item-information">
                                        <p class="name">Angular 2024 completed special course</p>
                                        <p class="author">Ronin Hurt</p>
                                        <p class="price">đ200.000</p>
                                    </div>
                                </li>


                            </ul>
                            <div class="cart_dropdown-bottom">
                                <p class="total_price">Total price : 500.000đ</p>
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
                                    <img src="https://cdn1.iconfinder.com/data/icons/man-user-human-profile-avatar-business-person/100/09-1User_3-4-1024.png"
                                        alt="Admin" />
                                    <a href="#">Khóa học mới sắp khai giảng!</a>
                                </li>
                                <li class="notification_dropdown__list-item">
                                    <img src="https://cdn1.iconfinder.com/data/icons/man-user-human-profile-avatar-business-person/100/09-1User_3-4-1024.png"
                                        alt="Admin" />
                                    <a href="#"> Cập nhật quan trọng từ hệ thống.</a>
                                </li>
                            </ul>
                            <div class="mask">
                                <p>Mask all as read</p>
                            </div>
                        </div>
                    </li>
                    <li class="nav-link-item user-menu" style="position: relative;">
                        <img class="avatar"
                            src="https://th.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                            alt="">
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
        .wrapper {
  margin: 2px 0px;
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
  width: 70%;
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
    border-color: #6D28D2;
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
.nav-link-item:hover{
    background-color: #6c28d219;
    border-radius: 6px;
}
.nav-link-item:hover,
.nav-link-item:hover i {
    color: #6D28D2;
}
.nav-link-item:active,
.nav-link-item:active i {
    color: #6c28d277;
}
.nav-link-item:active{
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
.nav-links-noauth{
    display: flex;
  justify-content: end;
  align-items: center;
  gap:10px;
  padding-left: 0;
}

.signup{
    color:#fff;
    font-size:18px;
    font-weight:600;
    padding: 5px 10px;
    background-color: #6D28D2;
}
.login{
    color:#6D28D2;
    font-size:18px;
    font-weight:600;
    padding: 5px 10px;
    background-color: transparent;
    border:1px solid #6D28D2;
}
.login:active{
    background-color: #6D28D2;
    color:#fff;
}
.signup:active{
    background-color:rgba(108, 40, 210, 0.43);
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
    z-index:999;
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
    background-color: #6D28D2;
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
    z-index:999;
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
    background-color: #6D28D2; /* Nền tím */
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
    z-index:999;
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
    width: 275px;
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
    
    border-bottom: 1px solid #ddd;
}

.mylearning_dropdown-item a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    width: 100%;
}

.mylearning_dropdown-item img {
    width: 60px;
    height: 60px;
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
    background-color: #6D28D2;
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
.user-menu::after{
    content: "";
    position: absolute;
    top: 100%;
    width: 100%;
    height: 50px;
    right:0;
    background-color: transparent;
    display: block;
    z-index:999;
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
.dropdown li:active a{
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
        private router: Router
    ) {}
    ngOnInit(): void {
        this.authService.getAuthStatus().subscribe((status) => {
            this.isLoggedIn = status;
        });
    }
}

// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { AuthService } from '../../service/auth.service';
// import { CommonModule } from '@angular/common';
// import { Router, RouterLink } from '@angular/router';

// @Component({
//     selector: 'app-navbar-home',
//     standalone: true,
//     encapsulation: ViewEncapsulation.None,
//     imports: [CommonModule, RouterLink],
//     template: `
//         <div class="wr">
//             <nav class="navbar">
//                 <div class="logo">
//                     <a href="#">Edu<span>Flow</span></a>
//                 </div>

//                 <span class="explore">Explore</span>

//                 <input type="text" placeholder="Search course for you" class="search-box" />
//                 <div class="loggedin" *ngIf="isLoggedIn">
//                     <div class="nav-links">
//                         <a href="#">Blog</a>
//                         <a href="#">Instructor</a>
//                         <div class="mylearning">
//                             <a [routerLink]="'/my-learning'" class="mylearning-link">My learning</a>
//                             <div class="mylearning_dropdown">
//                                 <ul class="mylearning_dropdown-list">
//                                     <li class="mylearning_dropdown-item">
//                                         <a href="#">
//                                             <img src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image_variant/a443126035c4_w240.webp" alt="" />
//                                             <div class="mylearning_dropdown-item-info">
//                                                 <div class="mylearning_dropdown-item-name">
//                                                     <span class="course-name">Angular - The Completed Guide 2024</span>
//                                                 </div>
//                                                 <div class="progress"></div>
//                                             </div>
//                                         </a>
//                                     </li>
//                                 </ul>
//                                 <div class="mylearning_dropdown-bottom">
//                                     <button [routerLink]="'/my-learning'" class="mylearning_dropdown-btn">Khóa học của tôi</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <ul class="icons">
//                         <li>
//                             <a href="#" style="margin-left: 0px;"><i class="bi bi-heart"></i></a>
//                         </li>
//                         <li [routerLink]="'/cart'">
//                             <div class="cart">
//                                 <i class="bi bi-cart"></i>
//                                 <span class="badge">2</span>
//                                 <div class="cart_dropdown">
//                                     <ul class="cart_dropdown__list">
//                                         <a href="">
//                                             <li class="cart_dropdown__item">
//                                                 <img src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image_variant/a443126035c4_w240.webp" alt="" class="cart_dropdown__item-img" />
//                                                 <div class="cart_dropdown__item-information">
//                                                     <p class="name">Angular 2024 completed special course</p>
//                                                     <p class="author">Ronin Hurt</p>
//                                                     <p class="price">đ200.000</p>
//                                                 </div>
//                                             </li>
//                                         </a>
//                                         <a href="">
//                                             <li class="cart_dropdown__item">
//                                                 <img src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image_variant/a443126035c4_w240.webp" alt="" class="cart_dropdown__item-img" />
//                                                 <div class="cart_dropdown__item-information">
//                                                     <p class="name">Angular 2024 completed special course</p>
//                                                     <p class="author">Ronin Hurt</p>
//                                                     <p class="price">đ200.000</p>
//                                                 </div>
//                                             </li>
//                                         </a>
//                                         <a href="">
//                                             <li class="cart_dropdown__item">
//                                                 <img src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image_variant/a443126035c4_w240.webp" alt="" class="cart_dropdown__item-img" />
//                                                 <div class="cart_dropdown__item-information">
//                                                     <p class="name">Angular 2024 completed special course</p>
//                                                     <p class="author">Ronin Hurt</p>
//                                                     <p class="price">đ200.000</p>
//                                                 </div>
//                                             </li>
//                                         </a>
//                                         <a href="">
//                                             <li class="cart_dropdown__item">
//                                                 <img src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image_variant/a443126035c4_w240.webp" alt="" class="cart_dropdown__item-img" />
//                                                 <div class="cart_dropdown__item-information">
//                                                     <p class="name">Angular 2024 completed special course</p>
//                                                     <p class="author">Ronin Hurt</p>
//                                                     <p class="price">đ200.000</p>
//                                                 </div>
//                                             </li>
//                                         </a>
//                                         <a href="">
//                                             <li class="cart_dropdown__item">
//                                                 <img src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image_variant/a443126035c4_w240.webp" alt="" class="cart_dropdown__item-img" />
//                                                 <div class="cart_dropdown__item-information">
//                                                     <p class="name">Angular 2024 completed special course</p>
//                                                     <p class="author">Ronin Hurt</p>
//                                                     <p class="price">đ200.000</p>
//                                                 </div>
//                                             </li>
//                                         </a>
//                                     </ul>
//                                     <div class="cart_dropdown-bottom">
//                                         <p class="total_price">Total price : 500.000đ</p>
//                                         <button class="cart_dropdown__bottom-go">Tới giỏ hàng</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </li>
//                         <li class="notification">
//                             <a href="#">
//                                 <i class="bi bi-bell"></i>
//                                 <span class="badge">2</span>
//                             </a>
//                             <div class="notification_dropdown">
//                                 <div class="notification_dropdown-header">
//                                     <p>Notification</p>
//                                 </div>
//                                 <ul class="notification_dropdown__list">
//                                     <li class="notification_dropdown__list-item">
//                                         <img src="https://cdn1.iconfinder.com/data/icons/man-user-human-profile-avatar-business-person/100/09-1User_3-4-1024.png" alt="Admin" />
//                                         <a href="#">Khóa học mới sắp khai giảng!</a>
//                                     </li>
//                                     <li class="notification_dropdown__list-item">
//                                         <img src="https://cdn1.iconfinder.com/data/icons/man-user-human-profile-avatar-business-person/100/09-1User_3-4-1024.png" alt="Admin" />
//                                         <a href="#"> Cập nhật quan trọng từ hệ thống.</a>
//                                     </li>
//                                 </ul>
//                                 <div class="mask">
//                                     <p>Mask all as read</p>
//                                 </div>
//                             </div>
//                         </li>
//                     </ul>

//                     <div class="user-menu">
//                         <img src="https://th.bing.com/th/id/OIP.pqzQpx8Wg5fEHznAKKY6ugHaJ4?rs=1&pid=ImgDetMain" alt="User Avatar" class="user-avatar" />
//                         <ul class="dropdown">
//                             <li><a href="#">Profile</a></li>
//                             <li [routerLink]="'/my-learning'"><a>My Learning</a></li>
//                             <li [routerLink]="'/cart'"><a>My Cart</a></li>
//                             <li><a href="#">Settings</a></li>
//                             <li>
//                                 <hr />
//                             </li>
//                             <li><a href="#" class="logout" (click)="logout()">Logout</a></li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div class="loggedin" *ngIf="!isLoggedIn">
//                     <div class="login-signup">
//                         <button class="login me-2" (click)="login()">Login</button>
//                         <button class="signup">Sign Up</button>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     `,
//     styles: `
//         .login-signup {
//             display: flex;
//             justify-content: end;
//         }
//         .signup {
//             color: #fff;
//             font-size: 18px;
//             font-weight: 600;
//             padding: 5px 10px;
//             background-color: #6d28d2;
//         }
//         .login {
//             color: #6d28d2;
//             font-size: 18px;
//             font-weight: 600;
//             padding: 5px 10px;
//             background-color: transparent;
//             border: 1px solid #6d28d2;
//         }
//         .login:active {
//             background-color: #6d28d2;
//             color: #fff;
//         }
//         .signup:active {
//             background-color: rgba(108, 40, 210, 0.43);
//         }
//         .loggedin {
//             display: flex;
//         }
//         /* Tổng quan thanh điều hướng */
//         :root {
//             --primary-color: #a435f0;
//         }
//         body {
//             margin: 0; /* Xoá margin để navbar sát viền */
//             padding: 0;
//             font-size: 18px;
//         }
//         .navbar {
//             max-width: 80%;
//             margin: 0 auto;
//             display: flex;
//             align-items: center;
//             justify-content: space-evenly;
//             height: 60px;
//             background-color: transparent;
//             padding: 0 20px;
//             font-family: Arial, Helvetica, sans-serif;
//         }
//         .wr {
//             padding: 10px 0;

//             background-color: #ffffff;
//             border-bottom: 1px solid rgb(159, 154, 154);
//         }

//         /* Logo */
//         .logo a {
//             font-size: 24px;
//             font-weight: bold;
//             color: #333;
//             text-decoration: none;
//         }
//         .logo span {
//             color: #007bff;
//         }

//         /* Span Explore */
//         .explore {
//             font-size: 16px;
//             color: #555;
//             margin-left: 20px;
//         }

//         /* Hộp tìm kiếm */
//         .search-box {
//             width: 550px;
//             height: 40px;
//             padding: 0 15px;
//             border: 1px solid #ccc;
//             border-radius: 20px;
//             font-size: 14px;
//             margin-left: 20px;
//             outline: none;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             transition: all 0.3s ease;
//         }
//         .search-box:focus {
//             border-color: #007bff;
//             box-shadow: 0 0 0 2px #cceeff;
//         }

//         /* Liên kết điều hướng */
//         .nav-links {
//             display: flex;
//             align-items: center;
//             margin-left: 20px;
//             justify-content: space-between;
//         }
//         .nav-links a {
//             font-size: 15px;
//             color: #333;
//             text-decoration: none;
//             // margin: 10px;
//             transition: color 0.3s ease;
//             padding: 5px;
//         }
//         .nav-links a:hover {
//             background-color: #e1e5e98e;
//             transition: 0.9s;
//             border: 5px;
//         }

//         /* Danh sách biểu tượng */
//         .icons {
//             flex: 1;
//             display: flex;
//             align-items: center;
//             list-style: none;
//             justify-content: space-around;
//             margin: 0;
//             padding: 0;
//             /* margin-left: 10px; */
//         }
//         .icons li {
//             margin-left: 10px;
//             position: relative;
//         }
//         .icons a {
//             font-size: 18px;
//             color: #333;
//             text-decoration: none;
//             transition: color 0.3s ease;
//         }
//         .icons a:hover {
//             color: #007bff;
//         }

//         /* Badge cho giỏ hàng và thông báo */
//         .badge {
//             position: absolute;
//             top: -5px;
//             right: -5px;
//             background-color: #ff0000;
//             color: white;
//             font-size: 10px;
//             width: 16px;
//             height: 16px;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }

//         /* Dropdown thông báo */
//         .notification {
//             position: relative;
//         }
//         .notification::after {
//             content: '';
//             width: 200%;
//             height: 250%;
//             position: absolute;
//             right: 0;
//             background-color: transparent;
//         }
//         .notification_dropdown {
//             position: absolute;
//             top: 240%;
//             right: 0;
//             width: 300px;
//             background-color: white;
//             border: 1px solid #ccc;
//             border-radius: 5px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             display: none;
//             z-index: 10;
//         }
//         .notification_dropdown-header {
//             border-bottom: 1px solid rgba(0, 0, 0, 0.201);
//         }
//         .notification_dropdown__list {
//             /* margin: 15px; */
//             padding-left: 0;
//         }
//         .notification_dropdown-header p {
//             font-size: 20px;
//             font-weight: 600;
//             margin: 15px;
//         }
//         .notification:hover .notification_dropdown {
//             display: block;
//         }
//         .notification_dropdown__list-item {
//             margin: 15px;
//             width: 100%;
//             /* margin-bottom: 15px; */
//             display: flex;
//             align-items: center;
//         }

//         .notification_dropdown__list-item a {
//             font-size: 20px;
//             font-weight: 500;
//         }

//         .notification_dropdown img {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             margin-right: 10px;
//         }
//         .notification_dropdown a {
//             font-size: 14px;
//             color: #333;
//             text-decoration: none;
//         }
//         .notification_dropdown a:hover {
//             color: #007bff;
//         }
//         /* .mask{
//     padding: 15px;
// } */
//         .mask {
//             margin: 10px;
//             text-align: center;
//             background-color: #a435f0;
//         }
//         .mask p {
//             margin: 0;
//             padding: 10px;
//             font-size: 16px;
//             color: white;
//             cursor: pointer;
//         }
//         .mask:active {
//             background-color: #a535f061;
//         }
//         .mask:hover {
//             background-color: #a535f0bf;
//         }

//         /* Menu người dùng */
//         .user-menu {
//             position: relative;
//             margin-left: 20px;
//         }
//         .user-menu::after {
//             content: '';
//             width: 150%;
//             height: 60px;
//             right: 0;
//             background-color: transparent;
//             position: absolute;
//         }
//         .user-avatar {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             cursor: pointer;
//         }
//         .dropdown {
//             position: absolute;
//             top: 142%;
//             right: 0;
//             width: 200px;
//             background-color: white;
//             border: 1px solid #ccc;
//             border-radius: 5px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             list-style: none;
//             padding: 10px 0;
//             margin: 0;
//             display: none;
//             z-index: 10;
//         }
//         .user-menu:hover .dropdown {
//             display: block;
//         }
//         .dropdown li {
//             padding: 5px 15px;
//         }
//         .dropdown li:hover {
//             background-color: #f5f5f5;
//         }
//         .dropdown a {
//             font-size: 15px;
//             color: #333;
//             text-decoration: none;
//             display: block;
//         }

//         .dropdown hr {
//             border: none;
//             border-top: 1px solid #eee;
//             margin: 5px 0;
//         }
//         .logout {
//             color: #ff0000;
//         }
//         .logout:hover {
//             color: #cc0000;
//         }
//         /* Giới hạn danh sách trong 80% chiều rộng và căn giữa */
//         .categories {
//             /* width: 75%;  */
//             width: 100vw;
//             margin: 0 auto;
//             /* border-bottom: 1px solid black; */
//             position: relative;
//             box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//         }

//         /* Thiết lập danh sách nằm ngang */
//         .category-item {
//             /* width: 75%;  */
//             margin: 0;
//             display: flex;
//             justify-content: center;
//             list-style: none;
//             padding: 0;
//         }

//         /* Thiết lập từng mục */
//         .category-item li {
//             padding: 10px 15px; /* Tạo khoảng cách */
//             color: rgba(0, 0, 0, 0.734);
//             border-radius: 5px;
//             font-size: 14px;
//             font-weight: 500;
//             text-align: center;
//             cursor: pointer;
//             white-space: nowrap; /* Không xuống dòng */
//         }

//         /* Hiệu ứng hover */
//         .category-item li:hover {
//             background-color: #e1e5e98e;
//         }
//         /* welcome */
//         .welcome {
//             height: 100px;
//             max-width: 80%;
//             margin: 20px auto;
//             display: flex;
//             align-items: center;
//         }
//         .welcome-name {
//             font-size: 28px;
//             font-weight: bold;
//             margin: 0;
//         }
//         .avatar img {
//             width: 50px;
//             border-radius: 100%;
//             margin-right: 20px;
//         }
//         .info {
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//         }
//         .major {
//             margin-top: 20px;
//         }
//         .major-name {
//             margin-right: 10px;
//             font-size: 18px;
//         }
//         .edit-major {
//             color: #a435f0;
//             font-weight: 600;
//         }
//         .banner {
//             max-width: 80%;
//             margin: 0 auto;
//             position: relative;
//         }
//         .banner img {
//             width: 100%;
//         }
//         .banner-info {
//             padding: 20px;
//             width: 300px;
//             background-color: #ffffff;
//             position: absolute;
//             top: 10%;
//             left: 10%;
//         }
//         .banner-info-title {
//             font-size: 40px;
//             font-weight: bold;
//         }
//         .description {
//             font-size: 18px;
//             letter-spacing: 1px;
//         }
//         /* let start */
//         .let-start {
//             max-width: 80%;
//             margin: 30px auto;
//             display: flex;
//             flex-direction: column;
//         }
//         .p-link {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//         }
//         .p-link .title {
//             font-size: 32px;
//             font-weight: bold;
//         }
//         .p-link .link {
//             color: var(--primary-color);
//             font-size: 18px;
//             font-weight: 700;
//         }
//         .p-link .link:active {
//             background-color: rgba(0, 0, 0, 0.623);
//         }

//         .infomation {
//             display: flex;
//             flex-direction: column;
//             position: relative;
//         }
//         .infomation .title {
//             font-size: 16px;
//             color: rgba(0, 0, 0, 0.742);
//             margin-left: 15px;
//         }
//         .infomation .lecture-name {
//             font-size: 20px;
//             font-weight: 800;
//             margin-left: 15px;
//         }
//         .infomation::after {
//             content: '';
//             display: block;
//             width: 100%;
//             height: 5px;
//             background-color: var(--primary-color);
//         }

//         /* cart dropdown */
//         /* Định dạng chung cho icon cart */
//         /* Định dạng chung cho icon cart */
//         .cart {
//             position: relative;
//             display: inline-block;
//             text-decoration: none;
//             color: inherit;
//         }
//         .cart::after {
//             content: '';
//             position: absolute;
//             width: 200%;
//             height: 40px; /* Điều chỉnh kích thước phù hợp */
//             top: 100%;
//             right: 0;
//             background: transparent;
//         }
//         /* Dropdown ẩn mặc định */
//         .cart_dropdown {
//             background-color: white;
//             border: 1px solid #ddd;
//             position: absolute;
//             width: 300px; /* Giữ nguyên width 400px */
//             top: 244%; /* Xuất hiện ngay bên dưới */
//             right: 0;
//             display: none;
//             box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//             padding: 10px;
//             z-index: 100;
//             border-radius: 8px;
//         }

//         /* Hiển thị dropdown khi hover vào giỏ hàng */
//         .cart:hover .cart_dropdown {
//             display: block;
//         }

//         /* Danh sách sản phẩm trong dropdown */
//         .cart_dropdown__list {
//             list-style: none;
//             padding: 0;
//             margin: 0;
//             max-height: 300px;
//             overflow-y: auto;
//         }

//         .cart_dropdown__item {
//             height: 100px;
//             display: flex;
//             align-items: center;
//             border-bottom: 1px solid #eee;
//         }

//         .cart_dropdown__item:last-child {
//             border-bottom: none;
//         }

//         .cart_dropdown__item img {
//             width: 60px;
//             height: 60px;
//             object-fit: cover;
//             border-radius: 5px;
//             margin-right: 10px;
//         }

//         .cart_dropdown__item-information {
//             flex: 1;
//             font-size: 14px; /* Chữ nhỏ hơn */
//             color: black; /* Chữ màu đen */
//         }

//         .cart_dropdown__item-information p {
//             margin: 3px 0;
//         }

//         .cart_dropdown__item .name {
//             color: rgba(0, 0, 0, 0.705);
//             font-weight: bold;
//         }
//         .cart_dropdown__item .author {
//             color: rgba(80, 77, 77, 0.459);
//             font-weight: bold;
//         }

//         .cart_dropdown__item .price {
//             color: rgba(0, 0, 0, 0.568);
//             font-weight: bold;
//         }

//         /* Phần tổng tiền và nút đi tới giỏ hàng */
//         .cart_dropdown-bottom {
//             padding: 5px 10px;
//             text-align: left;
//             border-top: 1px solid #ddd;
//             margin-top: 10px;
//         }

//         .total_price {
//             font-size: 16px; /* Vừa phải */
//             font-weight: bold; /* In đậm */
//             color: black;
//         }

//         .cart_dropdown__bottom-go {
//             background-color: purple; /* Nền tím */
//             color: white; /* Chữ trắng */
//             border: none;
//             width: 100%;
//             padding: 8px 12px;
//             font-weight: bold;
//             border-radius: 5px;
//             cursor: pointer;
//             transition: 0.3s;
//         }

//         .cart_dropdown__bottom-go:hover {
//             background-color: #5a2d82;
//         }
//         /* my learning */
//         .mylearning {
//             position: relative;
//             display: inline-block;
//             padding: 10px;
//         }
//         .mylearning::after {
//             content: '';
//             position: absolute;
//             width: 50%;
//             height: 50px;
//             right: 0;
//             background-color: transparent;
//         }

//         .mylearning-link {
//             text-decoration: none;
//             color: black;
//             /* font-weight: bold; */
//         }

//         .mylearning_dropdown {
//             background-color: white;
//             position: absolute;
//             right: 0;
//             top: 145%;
//             width: 275px;
//             display: none;
//             z-index: 1000;
//             box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//             border: 1px solid #ddd;
//             border-radius: 8px;
//             padding: 10px;
//         }

//         .mylearning:hover .mylearning_dropdown {
//             display: block;
//         }

//         .mylearning_dropdown-list {
//             max-height: 350px;
//             overflow-y: auto;
//             padding-left: 0;
//             margin: 0;
//             list-style: none;
//         }

//         .mylearning_dropdown-item {
//             display: flex;
//             align-items: center;
//             // padding: 8px;
//             border-bottom: 1px solid #ddd;
//         }

//         .mylearning_dropdown-item a {
//             display: flex;
//             align-items: center;
//             text-decoration: none;
//             color: black;
//             width: 100%;
//         }

//         .mylearning_dropdown-item img {
//             width: 60px;
//             height: 60px;
//             border-radius: 5px;
//             margin-right: 10px;
//         }

//         .mylearning_dropdown-item-name {
//             flex: 1;
//         }

//         .course-name {
//             font-size: 14px;
//             font-weight: 500;
//         }

//         .mylearning_dropdown-bottom {
//             text-align: center;
//             padding: 10px;
//         }

//         .mylearning_dropdown-btn {
//             width: 100%;
//             background-color: #6a0dad;
//             color: white;
//             border: none;
//             padding: 8px 12px;
//             border-radius: 5px;
//             cursor: pointer;
//             font-size: 14px;
//         }

//         .mylearning_dropdown-btn:hover {
//             background-color: #5a0ca3;
//         }
//         .progress {
//             width: 100%;
//             height: 5px;
//             background-color: #706e72;
//             position: relative;
//         }
//         .progress::after {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 50%;
//             height: 5px;
//             background-color: #5a0ca3;
//         }

//         /* my learning */
//     `
// })
// export class NavBarComponent implements OnInit {
//     login() {
//         this.router.navigate(['user/login']);
//     }
//     logout() {
//         console.log('Logout clicked in AppTopbar!');

//         this.authService.logout();
//         // this.router.navigate(['/home']);
//     }
//     isLoggedIn: boolean = false;
//     constructor(
//         private authService: AuthService,
//         private router: Router
//     ) {}
//     ngOnInit(): void {
//         this.authService.getAuthStatus().subscribe((status) => {
//             this.isLoggedIn = status;
//         });
//     }
// }

import { Component } from "@angular/core";
import { NavBarComponent } from "./component/navbar";


@Component({
    selector: 'app-cart',
    standalone:true,
    imports:[],
    template: `
    <div class="app">
        <div class="grid wrapper">
            <h1 class="myshoppingcart_title">Shopping Cart</h1>
            <div class="myshoppingcart_content">
                <div class="myshoppingcart_content-left">
                    <p class="total_course">6 Courses in Cart</p>
                    <ul class="myshoppingcart_content__list">
                        <li class="myshoppingcart_content__item-course">
                            <img src="https://th.bing.com/th/id/OIF.ekKLo0PgJH8OcICotLq1oQ?rs=1&pid=ImgDetMain" alt=""
                                class="myshoppingcart_content__item-course-img">
                            <div class="myshoppingcart_content__item-course-information">
                                <p class="course_name">The Completed Full-Stack Web Development Bootcamp</p>
                                <p class="course_author">By Dr.Angela</p>
                                <div class="tag-rating">
                                    <span class="tag-course">BestSeller</span>
                                    <span class="avg-rating">4,7 <i class="fa-solid fa-star" style="color: #dd6e13;"></i></span>
                                    <span class="total-rating">(411.002 ratings)</span>
                                </div>
                                <div class="hour-lecture-level">
                                    <span class="hour">6.5 hours</span>
                                    <span class="lecture dotted">374 lectures</span>
                                    <span class="level dotted">All levels</span>
                                </div>
                            </div>
                            <div class="myshoppingcart_content__item-course-action">
                                <p class="remove padding-action">Remove</p>
                                <p class="save padding-action">Save for Later</p>
                                <p class="move_to_with_list padding-action">Move to Withlist</p>
                            </div>
                            <div class="myshoppingcart_content__item-course-price">
                                <p class="discount-price">đ279.000 <i class="fa-solid fa-tag" style="color: #6c28d2;"></i></p>
                                <p class="old-price">đ1.200.000</p>
                            </div>
                        </li>
                        <li class="myshoppingcart_content__item-course">
                            <img src="https://th.bing.com/th/id/OIF.ekKLo0PgJH8OcICotLq1oQ?rs=1&pid=ImgDetMain" alt=""
                                class="myshoppingcart_content__item-course-img">
                            <div class="myshoppingcart_content__item-course-information">
                                <p class="course_name">The Completed Full-Stack Web Development Bootcamp</p>
                                <p class="course_author">By Dr.Angela</p>
                                <div class="tag-rating">
                                    <span class="tag-course">BestSeller</span>
                                    <span class="avg-rating">4,7 <i class="fa-solid fa-star" style="color: #dd6e13;"></i></span>
                                    <span class="total-rating">(411.002 ratings)</span>
                                </div>
                                <div class="hour-lecture-level">
                                    <span class="hour">6.5 hours</span>
                                    <span class="lecture dotted">374 lectures</span>
                                    <span class="level dotted">All levels</span>
                                </div>
                            </div>
                            <div class="myshoppingcart_content__item-course-action">
                                <p class="remove padding-action">Remove</p>
                                <p class="save padding-action">Save for Later</p>
                                <p class="move_to_with_list padding-action">Move to Withlist</p>
                            </div>
                            <div class="myshoppingcart_content__item-course-price">
                                <p class="discount-price">đ279.000 <i class="fa-solid fa-tag" style="color: #6c28d2;"></i></p>
                                <p class="old-price">đ1.200.000</p>
                            </div>
                        </li>
                        <li class="myshoppingcart_content__item-course">
                            <img src="https://th.bing.com/th/id/OIF.ekKLo0PgJH8OcICotLq1oQ?rs=1&pid=ImgDetMain" alt=""
                                class="myshoppingcart_content__item-course-img">
                            <div class="myshoppingcart_content__item-course-information">
                                <p class="course_name">The Completed Full-Stack Web Development Bootcamp</p>
                                <p class="course_author">By Dr.Angela</p>
                                <div class="tag-rating">
                                    <span class="tag-course">BestSeller</span>
                                    <span class="avg-rating">4,7 <i class="fa-solid fa-star" style="color: #dd6e13;"></i></span>
                                    <span class="total-rating">(411.002 ratings)</span>
                                </div>
                                <div class="hour-lecture-level">
                                    <span class="hour">6.5 hours</span>
                                    <span class="lecture dotted">374 lectures</span>
                                    <span class="level dotted">All levels</span>
                                </div>
                            </div>
                            <div class="myshoppingcart_content__item-course-action">
                                <p class="remove padding-action">Remove</p>
                                <p class="save padding-action">Save for Later</p>
                                <p class="move_to_with_list padding-action">Move to Withlist</p>
                            </div>
                            <div class="myshoppingcart_content__item-course-price">
                                <p class="discount-price">đ279.000 <i class="fa-solid fa-tag" style="color: #6c28d2;"></i></p>
                                <p class="old-price">đ1.200.000</p>
                            </div>
                        </li>
                    </ul>
                    <!-- <div class="myshoppingcart_content-payment">

                    </div> -->
                </div>
                <div class="myshoppingcart_content-right">
                    <div class="payment-wrapper">
                        <p class="payment_total marginb">Total:</p>
                        <p class="paymant_total-discount-price marginb">đ1,182,200</p>
                        <p class="payment_total-oldprice marginb">đ7,300,500</p>
                        <p class="percent-off marginb">78 % off</p>
                        <button class="btn-payment marginb">Payment courses
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <p class="wontcharged">you won't be charged yet</p>
                        <div class="promotion">
                            <p class="promotion-title marginb">Promotions</p>
                            <div class="promotion_box-voucher marginb">
                                <p class="voucher-code marginb">ST13872HU is applied</p>
                                <p class="eduflow-coupon marginb">EduFlow coupon</p>
                            </div>
                            <div class="enter-voucher">
                                <input type="text" placeholder="Enter Coupon">
                                <button class="btn-apply">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    styles:`
    .app{
        margin-top:20px;
    width: 100%;
}
.grid{
    max-width: 80%;
    margin: 0 auto;
}
.wrapper{
    display: flex;
    flex-direction: column;
}
.myshoppingcart_title{
    padding-top: 15px ;
    margin-bottom: 20px;
    font-size: 36px;
    font-weight: bolder;
}
.myshoppingcart_content{
    display: flex;
}
.total_course{
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
}
.myshoppingcart_content__list{
    padding-left: 0;
}
.myshoppingcart_content__list li{
    padding: 20px 0;
}
.myshoppingcart_content__list li:nth-child(odd) {
    border-top: 1px solid rgba(141, 139, 139, 0.668);
    border-bottom: 1px solid rgba(141, 139, 139, 0.668);
}
/* content left */
.myshoppingcart_content-left{
    flex: 3;
    margin-right: 20px;
}
/* content right */
.myshoppingcart_content-right{
    flex: 1;
}
.myshoppingcart_content__item-course{
    display: flex;
    align-items: flex-start;
}
.myshoppingcart_content__item-course-img{
    width: 120px;
    height: 100px;
}
.myshoppingcart_content__item-course-information{
    width: 50%;
    margin-left: 20px;
}
.myshoppingcart_content__item-course-information .course_name{
    font-size: 16px;
    color: rgba(0, 0, 0, 0.77);
    font-weight: bold;
    margin-bottom: 5px;
}
.myshoppingcart_content__item-course-information .course_author{
    font-size: 14px;
    font-weight: 400;
    color: rgb(134, 134, 134);
    margin-bottom: 13px;
}
.tag-rating{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}
.tag-course{
    background-color: #C2E9EB;
    color: rgba(0, 0, 0, 0.688);
    padding: 4px 15px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
}
.avg-rating{
    color: #dd6e13;
    font-size: 14px;
}
.total-rating{
    font-size: 14px;
    font-weight: 400;
}
.hour-lecture-level{
    display: flex;
    gap: 15px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.747);
}
.dotted{
    position: relative;
}
.dotted::before{
    position: absolute;
    content: ".";
    width: 5px;
    height: 5px;
    background-color: rgba(0, 0, 0, 0.747);
    border-radius: 100%;
    top: 42%;
    left: -6px;
    display: block;
}
.myshoppingcart_content__item-course-action{
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-right: 25px;
    gap: 10px;
    font-size: 14px;
    color: #6D28D2;
}
.padding-action{
    padding: 5px 15px;
    cursor: pointer;
    /* border-radius: 5px; */
    /* border: 1px solid #6c28d2aa; */
}
.padding-action:hover{
    background-color: #6c28d2aa;
    color: #fff;
    border-radius: 5px;
    transition: all 0.2s;
}
.padding-action:active{
    background-color: #6c28d25d;
    color: #fff;
}
.myshoppingcart_content__item-course-price{
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
}
.discount-price{
    font-size: 18px;
    font-weight: bold;
}
.old-price{
    color: #000000c0;
    font-size: 18px;
    font-weight: bold;
    text-decoration: line-through;
    margin-right: 30px;
}
/* payment */
.myshoppingcart_content-right{
    width: 100%;
}
.payment-wrapper{
    display: flex;
    flex-direction: column;
}
.payment_total{
    font-size: 18px;
    color: #403e3e;
    font-weight: bold;
}
.paymant_total-discount-price{
    font-size: 32px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.782);
}
.payment_total-oldprice{
    font-size: 18px;
    text-decoration: line-through;
    font-weight: bold;
    color: rgb(66, 64, 64);
}
.percent-off{
    font-size: 20px;

}
.btn-payment{
    width: 100%;
    padding: 10px 15px;
    background-color:#6c28d2;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
}
.wontcharged{
    font-size: 14px;
    font-weight: 300;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(110, 109, 109);
}
.promotion-title{
    font-size: 18px;
    font-weight: bold;
    margin-top: 15px;
}
.promotion_box-voucher{
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 5px 15px;
    border: 2px dashed rgba(90, 86, 86, 0.708);
}
.marginb{
    margin-bottom: 8px;
}
.voucher-code{
    font-size: 15px;
    font-weight: 400;
    color: rgb(60, 58, 58);
}
.eduflow-coupon{
    font-size: 15px;
    font-weight: 400;
    color: rgb(60, 58, 58);
}
.enter-voucher{
    display: flex;
    align-items: center;
}
.enter-voucher input{
    width: 70%;
    margin-right: 5px;
    height: 25px;
    padding: 5px;
    border-color: #6c28d2;
    /* box-sizing: border-box; */
}
.btn-apply{
    height: 38px;
    width: 30%;
    background-color: #6c28d2;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
}
    `,

})
export class CartComponent {

 
}

import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
    selector: 'app-course-detail',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [AccordionModule, CommonModule],
    template: `
        <div class="wrapper">
            <div class="top-container">
                <div class="grid1">
                    <div class="course-info">
                        <p class="breadcrumb">IT & Software > Other IT & Software > Microservices</p>
                        <h1 class="course-detail-title">Microservices Architecture - The Complete Guide</h1>
                        <p class="course-subtitle">Become an expert in the most popular Software Architecture style in the world!</p>
                        <div class="rating-info">
                            <span class="avg-rating">⭐ 4.5</span>
                            <span class="total-ratings">(16,400 ratings)</span>
                            <span class="total-students">83,562 students</span>
                        </div>
                        <p class="author">Created by <a href="#" class="author-link">Memi Lavi</a></p>
                        <p class="updated-at"><i class="fa-solid fa-calendar"></i> Last Updated: October 2024</p>
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
                                <span class="cpi-discount">đ279,000</span>
                                <span class="cpi-old-price">đ1,539,000</span>
                                <span class="cpi-sale-off">82% off</span>
                            </div>
                            <div class="emergency"><i class="fa-solid fa-bell"></i><strong>10 hour </strong>left at this price</div>
                            <div class="cart-and-favorite">
                                <button class="btn-addtocart">Add to cart</button>
                                <i class="fa-solid fa-heart heart"></i>
                            </div>
                            <div class="benefits">
                                <p class="benefit-title">This course includes:</p>
                                <ul class="benefit-list">
                                    <li class="benefit-item"><i class="fa-solid fa-video"></i>32 hours on-demand video</li>
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
                            <h2 class="wwyl-title">What You'll Learn</h2>
                            <ul class="wwyl-list">
                                <li class="wwyl-item">What is Microservices Architecture and when to use it</li>
                                <li class="wwyl-item">The 9 attributes of Microservices</li>
                                <li class="wwyl-item">How to design a robust and reliable Microservice</li>
                                <li class="wwyl-item">Service Mesh - What it is, its goal, and how and when to use it</li>
                                <li class="wwyl-item">The 3 strategies for breaking Monolith to Microservices</li>
                                <li class="wwyl-item">Predecessors of Microservices and the problems with them</li>
                                <li class="wwyl-item">Architecture Process of Microservices</li>
                                <li class="wwyl-item">Techniques for deploying and testing Microservices</li>
                                <li class="wwyl-item">When NOT to use Microservices</li>
                                <li class="wwyl-item">When NOT to use Microservices</li>
                                <li class="wwyl-item">When NOT to use Microservices</li>
                                <li class="wwyl-item">When NOT to use Microservices</li>
                                <li class="wwyl-item">When NOT to use Microservices</li>
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
                                    @for (section of courseSections; track section.title) {
                                        <p-accordion-panel [value]="section.value">
                                            <p-accordion-header>{{ section.title }}</p-accordion-header>
                                            <p-accordion-content>
                                                <ul>
                                                    @for (lecture of section.lectures; track lecture) {
                                                        <li>{{ lecture }}</li>
                                                    }
                                                </ul>
                                            </p-accordion-content>
                                        </p-accordion-panel>
                                    }
                                </p-accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: `
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
            width: 60%;
        }

        .breadcrumb {
            font-size: 14px;
            color: #bec2f9;
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
            gap: 20px;
            align-items: center;
            margin: 10px 0;
            font-size: 16px;
        }
        .avg-rating {
            font-size: 14px;
        }
        .total-ratings {
            font-size: 14px;
            color: #7c2ae8c3;
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
            color: #7c2ae8c3;
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
            /* text-align: center; */
        }

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
            gap: 8px;
            margin-bottom: 12px;
        }

        .cpi-discount {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
        }

        .cpi-old-price {
            color: #6b7280;
            text-decoration: line-through;
        }

        .cpi-sale-off {
            color:rgb(0, 0, 0);
            font-weight: 600;
        }

        .emergency {
            font-size:14px;
            color: #ef4444;
            font-weight: bold;
            margin-bottom: 16px;
        }

        .emergency i {
            margin-right: 4px;
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
            font-size:15px;
        }

        .benefit-item i {
            margin-right: 8px;
            color: #6d28d9;
        }
        /* wwyl */
        .whatwillyoulearn {
            background-color: white;
            /* padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.416); */
            width: 65%;
            font-family: Arial, sans-serif;
        }

        .wwyl-title {
            font-size: 20px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 24px;
        }

        .wwyl-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Chia cột động */
            gap: 16px;
            list-style: none;
            padding: 0;
            color: #374151;
            padding: 24px;
            border-radius: 5px;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.416);
        }

        .wwyl-item {
            display: flex;
            align-items: center;
            position: relative;
            padding-left: 20px;
            font-size:14px;
        }

        .wwyl-item::before {
            content: '✔';
            color: #6d28d9;
            font-weight: bold;
            position: absolute;
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
export class CourseDetailComponent {
    courseSections = [
        {
            title: 'Introduction to Microservices',
            value: '0',
            lectures: ['What is Microservices?', 'Monolithic vs Microservices', 'Advantages of Microservices']
        },
        {
            title: 'Microservices Architecture',
            value: '1',
            lectures: ['Service Communication', 'Service Discovery', 'API Gateway & Load Balancing']
        },
        {
            title: 'Deployment Strategies',
            value: '2',
            lectures: ['CI/CD for Microservices', 'Kubernetes & Docker', 'Serverless Microservices']
        },
        {
            title: 'Microservices Security',
            value: '3',
            lectures: ['Authentication & Authorization', 'OAuth2 and OpenID Connect', 'JWT in Microservices', 'Securing Microservices Communication']
        },
        {
            title: 'Deployment Strategies',
            value: '4',
            lectures: ['CI/CD for Microservices', 'Kubernetes & Docker', 'Serverless Microservices', 'Canary Deployment & Blue-Green Deployment']
        },
        {
            title: 'Monitoring & Logging',
            value: '5',
            lectures: ['Observability in Microservices', 'Centralized Logging with ELK Stack', 'Monitoring with Prometheus & Grafana', 'Distributed Tracing with Jaeger']
        },
        {
            title: 'Scaling & Performance Optimization',
            value: '6',
            lectures: ['Horizontal vs Vertical Scaling', 'Load Balancing Strategies', 'Circuit Breaker Pattern', 'Rate Limiting & Throttling']
        },
        {
            title: 'Case Studies & Real-World Examples',
            value: '7',
            lectures: ['How Netflix Uses Microservices', 'How Uber Scaled with Microservices', 'Common Pitfalls in Microservices', 'Lessons Learned from Large-Scale Microservices Projects']
        }
    ];
}

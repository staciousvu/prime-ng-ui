import { Component } from "@angular/core";
import { NavBarComponent } from "./component/navbar";


@Component({
    selector: 'app-my-learning',
    standalone:true,
    imports:[],
    template: `
    <div class="app">
        <div class="grid wrapper">
            <h1 class="mylearning_title">My learning</h1>
            <ul class="mylearning_card__list">
                <li class="mylearning_card__item">
                    <div class="course-img-container">
                        <img src="https://s.udemycdn.com/meta/default-meta-image-v2.png" alt="" class="course-img">
                        <div class="overlay">
                            <i class="fa-solid fa-play play-icon" style="color: #ffffff;"></i>
                        </div>
                    </div>
                    <p class="course-name">Angular - The Complete Guide (2025 Edition)</p>
                    <p class="course-author">Maximilan Schwarzmuller</p>
                    <progress value="2" max="100"></progress>
                    <p class="percentcompleted">2% complete</p>
                </li>
                <li class="mylearning_card__item">
                    <div class="course-img-container">
                        <img src="https://th.bing.com/th?id=OIF.t7PLddJ8kdb%2bbUbtYFt%2biA&w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" class="course-img">
                        <div class="overlay">
                            <i class="fa-solid fa-play play-icon" style="color: #ffffff;"></i>
                        </div>
                    </div>
                    <p class="course-name">Angular - The Complete Guide (2025 Edition)</p>
                    <p class="course-author">Maximilian Schwarzmüller</p>
                    <progress value="20" max="100"></progress>
                    <p class="percentcompleted">20% complete</p>
                </li>
                <li class="mylearning_card__item">
                    <div class="course-img-container">
                        <img src="https://th.bing.com/th/id/OIF.V9jRodf4obSYxTMyL9wcpA?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" class="course-img">
                        <div class="overlay">
                            <i class="fa-solid fa-play play-icon" style="color: #ffffff;"></i>
                        </div>
                    </div>
                    <p class="course-name">Spring Boot & Microservices</p>
                    <p class="course-author">John Doe</p>
                    <progress value="50" max="100"></progress>
                    <p class="percentcompleted">50% complete</p>
                </li>
                <li class="mylearning_card__item">
                    <div class="course-img-container">
                        <img src="https://th.bing.com/th/id/OIF.5eyC98RPIkrblsjMDFrrGQ?w=290&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" class="course-img">
                        <div class="overlay">
                            <i class="fa-solid fa-play play-icon" style="color: #ffffff;"></i>
                        </div>
                    </div>
                    <p class="course-name">React Native for Beginners</p>
                    <p class="course-author">Sarah Smith</p>
                    <progress value="75" max="100"></progress>
                    <p class="percentcompleted">75% complete</p>
                </li>
                <li class="mylearning_card__item">
                    <div class="course-img-container">
                        <img src="https://th.bing.com/th?id=OIF.mzNaw%2bWf2%2fSuM%2f99qrUHTg&w=277&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" class="course-img">
                        <div class="overlay">
                            <i class="fa-solid fa-play play-icon" style="color: #ffffff;"></i>
                        </div>
                    </div>
                    <p class="course-name">Python for Data Science</p>
                    <p class="course-author">Jane Doe</p>
                    <progress value="10" max="100"></progress>
                    <p class="percentcompleted">10% complete</p>
                </li>
                <li class="mylearning_card__item">
                    <div class="course-img-container">
                        <img src="https://th.bing.com/th?id=OIF.BthY%2fXKjFVFjacbNRqtPqA&w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" class="course-img">
                        <div class="overlay">
                            <i class="fa-solid fa-play play-icon" style="color: #ffffff;"></i>
                        </div>
                    </div>
                    <p class="course-name">Fullstack JavaScript Developer</p>
                    <p class="course-author">David Wilson</p>
                    <progress value="30" max="100"></progress>
                    <p class="percentcompleted">30% complete</p>
                </li>
                


            </ul>
        </div>
    </div>
    `,
    styles:`
    .app {
        margin-top:20px;
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

.mylearning_title {
    padding: 15px;
    margin-bottom: 20px;
    font-size: 36px;
    font-weight: bolder;
}

.mylearning_card__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Mặc định 4 khóa học trên 1 hàng */
    gap: 10px;
    list-style: none;
    padding: 0;
}

/* Card styling */
.mylearning_card__item {
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
}
/* test */
.course-img-container {
    position: relative;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    border-radius: 5px;
}

.course-img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    display: block;
    transition: 0.3s ease-in-out;
    border-radius: 5px;
    border: 1px solid rgba(119, 116, 116, 0.648);
    box-sizing: border-box; /* Đảm bảo viền không bị tràn */
}

/* Lớp phủ mờ */
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Màu đen trong suốt */
    opacity: 0; /* Ẩn ban đầu */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease-in-out;
    border-radius: 5px;
}

/* Biểu tượng play */
.play-icon {
    font-size: 40px;
    color: white;
    opacity: 0;
    transition: 0.3s ease-in-out;
    cursor: pointer;
}
.play-icon:active{
    transform: scale(1.5);
}

/* Khi hover vào ảnh */
.course-img-container:hover .overlay {
    opacity: 1;
}

.course-img-container:hover .play-icon {
    opacity: 1;
}

/* test */

/* Course name */
.course-name {
    font-size: 18px;
    font-weight: 600;
    margin: 5px 0;
    color: rgb(16, 16, 16);
}

/* Course author */
.course-author {
    font-size: 12px;
    color: gray;
    margin-bottom: 5px;
}

/* Progress bar */
progress {
    width: 100%;
    height: 10px;
    border-radius: 5px;
    overflow: hidden;
}
progress::-webkit-progress-value {
    background-color: #7D2AE8;
    border-radius: 5px;
}

/* Màu nền thanh progress chưa hoàn thành */
progress::-webkit-progress-bar {
    background-color: #e0e0e0; /* Màu xám nhạt */
    border-radius: 5px;
}
progress::-moz-progress-bar {
    background-color: #7D2AE8;
    border-radius: 5px;
}

/* Phần trăm hoàn thành */
.percentcompleted {
    font-size: 10px;
    color: #393939;
    font-weight: bold;
    margin-top: 5px;
}

/* Responsive: 5 khóa học trên hàng nếu màn hình lớn */
@media (min-width: 1200px) {
    .mylearning_card__list {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* Responsive: 3 khóa học trên hàng nếu màn hình nhỏ hơn 900px */
@media (max-width: 900px) {
    .mylearning_card__list {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Responsive: 2 khóa học trên hàng nếu màn hình nhỏ hơn 600px */
@media (max-width: 600px) {
    .mylearning_card__list {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Responsive: 1 khóa học trên hàng nếu màn hình rất nhỏ */
@media (max-width: 400px) {
    .mylearning_card__list {
        grid-template-columns: repeat(1, 1fr);
    }
}

    `,

})
export class MyLearningComponent {

 
}

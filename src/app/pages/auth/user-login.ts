import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavBarComponent } from "../4User/component/navbar";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-user-login',
    standalone: true,
    imports: [CommonModule, FormsModule, NavBarComponent],
    template: `
    <app-navbar-home></app-navbar-home>
    <div class="wrapper">
        <div class="container">
            
            <!-- Right Side -->
            <div class="right-side">
                <div class="content">
                    <h3>Bắt đầu ngay với EDUFLOW</h3>
                    <p>Kết nối và học hỏi</p>
                </div>
            </div>
            <!-- Left Side -->
            <div class="left-side">
                <h2>Login</h2>
                <div class="underline"></div>
                <form (ngSubmit)="onSubmit()">
                    <div class="input-group">
                        <label>
                            <i class="fas fa-envelope"></i>
                            <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
                        </label>
                    </div>
                    <div class="input-group">
                        <label>
                            <i class="fas fa-lock"></i>
                            <input type="password" [(ngModel)]="password" name="password" placeholder="Mật khẩu" required>
                        </label>
                    </div>
                    <div class="forgot-password">
                        <a href="#">Quên mật khẩu?</a>
                    </div>
                    <button type="submit" class="submit-btn" (click)="login()">Đăng nhập</button>
                    <div class="signup-text">
                        <p>Chưa có tài khoản? <a href="#">Đăng ký ngay</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            min-height: 100vh;
            background-color: #f4f4f4;
        }
        .container {
            margin-top:120px;
            display: flex;
            width: 750px;
            height: 400px;
            background: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .left-side {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 15px;
        }
        .left-side h2 {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.8rem;
        }
        .left-side .underline {
            border-bottom: 2px solid #6B46C1;
            width: 3rem;
            margin-bottom: 1rem;
        }
        .left-side form {
            width: 100%;
            max-width: 280px;
        }
        .left-side form .input-group {
            margin-bottom: 0.8rem;
        }
        .left-side form .input-group label {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #4A5568;
            font-size: 0.9rem;
        }
        .left-side form .input-group input {
            flex: 1;
            border: none;
            border-bottom: 2px solid #E2E8F0;
            padding: 0.4rem 0;
            outline: none;
            transition: border-color 0.3s;
            font-size: 0.9rem;
        }
        .left-side form .input-group input:focus {
            border-color: #6B46C1;
        }
        .left-side form .forgot-password {
            text-align: right;
            margin-bottom: 0.8rem;
            font-size: 0.85rem;
        }
        .left-side form .forgot-password a {
            color: #3182CE;
            text-decoration: none;
        }
        .left-side form .submit-btn {
            width: 100%;
            background-color: #6B46C1;
            color: white;
            padding: 0.6rem;
            border: none;
            border-radius: 0.3rem;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 0.95rem;
        }
        .left-side form .submit-btn:hover {
            background-color: #553C9A;
        }
        .left-side form .signup-text {
            text-align: center;
            margin-top: 0.8rem;
            font-size: 0.85rem;
        }
        .left-side form .signup-text a {
            color: #6B46C1;
            text-decoration: none;
        }
        .right-side {
            width: 50%;
            background: url('https://storage.googleapis.com/a1aa/image/83DrEtZ1ELRLkm2T4cug_kcNJuIud1lSelM-_NOqlHQ.jpg') center/cover no-repeat;
            position: relative;
        }
        .right-side .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: white;
            background: rgb(0, 0, 0);
            padding: 12px;
            border-radius: 6px;
        }
        .right-side .content h3 {
            color:white;
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 0.4rem;
        }
        .right-side .content p {
            font-size: 0.85rem;
        }
    `]
})
export class UserLoginComponent {
    email: string = 'test@gmail.com';
    password: string = '12345678';

    onSubmit() {
        console.log('Email:', this.email, 'Password:', this.password);
        
    }
    constructor(private authService:AuthService,private router:Router){}
    login() {
        this.authService.login(this.email, this.password).subscribe((response) => {
            if (response.success) {
                if (response.data.roles.includes('LEARNER')) {
                    this.router.navigate(['/home']);
                } 

            }
        });
    }
}
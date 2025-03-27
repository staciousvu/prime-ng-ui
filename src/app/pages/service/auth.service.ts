// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL API của server
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  // Gọi API đăng nhập
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/log-in`, credentials).pipe(
      tap((response: any) => {
        if (response && response.data.token) {
          localStorage.setItem(this.tokenKey, response.data.token); // Lưu token vào localStorage
        }
      })
    );
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Kiểm tra trạng thái đăng nhập
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Đăng xuất
  logout(): void {
    console.log("Logout function called in AuthService");
    const token = this.getToken(); // Lấy token từ localStorage
  
    if (token) {
      this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
        next: () => {
          localStorage.removeItem(this.tokenKey); // Xóa token sau khi gọi API
          window.location.href = '/auth/login'; // Chuyển hướng về trang đăng nhập
        },
        error: (err) => {
          console.error('Logout failed', err);
          localStorage.removeItem(this.tokenKey); // Dù lỗi vẫn xóa token
          window.location.href = '/auth/login';
        }
      });
    } else {
      // Nếu không có token, chỉ cần chuyển hướng về trang đăng nhập
      window.location.href = '/auth/login';
    }
  }
}
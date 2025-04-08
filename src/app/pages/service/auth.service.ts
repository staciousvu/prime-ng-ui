// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth'; // URL API của server
    private tokenKey = 'jwt_token';
    private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated()); 

    constructor(private http: HttpClient,private router: Router) {}

    // Gọi API đăng nhập
    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/log-in`, { username, password }).pipe(
            tap((response) => {
                if (response.success) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('role', response.data.roles[0]);
                    this.authStatus.next(true);
                }
            })
        );
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getRole(): string | null {
        return localStorage.getItem('role');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    isAdmin(): boolean {
        return this.getRole() === 'ADMIN';
    }

    // Đăng xuất
    // Khi logout, cập nhật trạng thái
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.authStatus.next(false);  // Phát sự kiện: "Đã đăng xuất"
  }

  // Phương thức để các component theo dõi trạng thái đăng nhập
  getAuthStatus() {
      return this.authStatus.asObservable(); // Trả về Observable để các component subscribe
  }
}

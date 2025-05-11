// auth.service.ts
import { Injectable, RESPONSE_INIT } from '@angular/core';
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
    login(username: string, password: string, mode: 'admin' | 'user'): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/log-in`, { username, password }).pipe(
        tap((response) => {
          if (response.success) {
            const roles = response.data.roles;
            
            // Kiểm tra role tùy theo mode
            if (mode === 'admin' && !roles.includes('ADMIN')) {
              throw new Error('Bạn không có quyền truy cập trang admin!');
            }
    
            if (mode === 'user' && roles.includes('ADMIN')) {
              throw new Error('Admin không được đăng nhập tại giao diện user!');
            }
    
            const userData = {
              token: response.data.token,
              roles,
              email: response.data.email,
              avatar: response.data.avatarUrl,
              fullname: response.data.name,
              id: response.data.id,
              favoriteCategory: response.data.favoriteCategory
            };
    
            const key = roles.includes('ADMIN') ? 'admin_data' : 'user_data';
            sessionStorage.setItem(key, JSON.stringify(userData));
            sessionStorage.setItem('roles', JSON.stringify(roles));
            this.authStatus.next(true);
          }
        })
      );
    }
    
    
      
      private getCurrentUserData(): any | null {
        const role = this.getRole();
        const key = role === 'ADMIN' ? 'admin_data' : 'user_data';
        const json = sessionStorage.getItem(key);  // Sử dụng sessionStorage
        return json ? JSON.parse(json) : null;
      }
      
      getToken(): any | null {
        return this.getCurrentUserData()?.token || null;
      }
      
      getRoles(): string[] {
        const roles = sessionStorage.getItem('roles');
        try {
          return roles ? JSON.parse(roles) : [];
        } catch {
          return [];
        }
      }
      
      getRole(): string | null {
        const roles = this.getRoles();
        return roles.length > 0 ? roles[0] : null;
      }
      
      
      
      
      getEmail(): string | null {
        return this.getCurrentUserData()?.email || null;
      }
      
      getAvatar(): string | null {
        return this.getCurrentUserData()?.avatar || null;
      }
      
      getId(): string | null {
        return this.getCurrentUserData()?.id || null;
      }
      
      getFullname(): string | null {
        return this.getCurrentUserData()?.fullname || null;
      }
      
      getFavoriteCategory(): string | null {
        return this.getCurrentUserData()?.favoriteCategory || null;
      }
      
      isAuthenticated(): boolean {
        return !!this.getToken();
      }
    
      isAdmin(): boolean {
        console.log('roleeeeeeeee:',this.getRole());
        return this.getRole() === 'ADMIN';
      }

      logout(): void {
        sessionStorage.removeItem('admin_data');  // Xóa dữ liệu admin
        sessionStorage.removeItem('user_data');   // Xóa dữ liệu user
        sessionStorage.removeItem('roles');        // Xóa role
        this.authStatus.next(false);
        console.log("Toi da dang xuat")
      }
      
      getAuthStatus() {
        return this.authStatus.asObservable();
      }
}

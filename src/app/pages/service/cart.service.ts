import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
    
    addToCart(courseId: number): Observable<any> {
        return this.http.post(`http://localhost:8080/cart/add/${courseId}`, null);
      }
      
      
  private cartsSubject = new BehaviorSubject<any[]>([]);
  carts$ = this.cartsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart(); // tự động load khi khởi tạo
  }

  loadCart() {
    this.http.get<any>(`http://localhost:8080/cart`).subscribe(
      (response) => {
        this.cartsSubject.next(response.data.cartItemResponses);
      },
      (error) => {
        this.cartsSubject.next([]); // tránh null
      }
    );
  }

  getCarts() {
    return this.cartsSubject.value;
  }

  isInCart(courseId: number): boolean {
    return this.getCarts().some(item => item.courseResponse.id === courseId);
  }
}

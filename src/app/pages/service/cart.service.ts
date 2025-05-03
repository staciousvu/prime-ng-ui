import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
    
    addToCart(courseId: number): Observable<any> {
        return this.http.post(`http://localhost:8080/cart/add/${courseId}`, null);
      }
      removeFromCart(courseId: number): Observable<any> {
        return this.http.delete(`http://localhost:8080/cart/remove/${courseId}`);
      }
      moveToCart(courseId: number): Observable<any> {
        return this.http.put<any>(`http://localhost:8080/cart/to-cart/${courseId}`,{});
      }
      moveToFavorite(courseId: number): Observable<any> {
        return this.http.put<any>(`http://localhost:8080/cart/to-favorite/${courseId}`,{});
      }
      
      
  private cartsSubject = new BehaviorSubject<any[]>([]);
  carts$ = this.cartsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart(); // tự động load khi khởi tạo
  }

  loadCart() {
    this.http.get<any>(`http://localhost:8080/cart`).subscribe({
      next: (response) => {
        this.cartsSubject.next(response.data.cartItemResponses);
      },
      error: (error) => {
        this.cartsSubject.next([]); 
      }
    });
  }
  
  totalMoney$: Observable<number> = this.carts$.pipe(
    map((cart) => cart.reduce((sum, item) => sum + item.courseResponse.discount_price, 0))
  );
  
  totalOldMoney$: Observable<number> = this.carts$.pipe(
    map((cart) => cart.reduce((sum, item) => sum + item.courseResponse.price, 0))
  );
  saleOff$: Observable<number> = combineLatest([this.totalMoney$, this.totalOldMoney$]).pipe(
    map(([totalMoney, totalOldMoney]) => {
      if (totalOldMoney === 0) return 0; // tránh chia cho 0
      return ((totalOldMoney - totalMoney) / totalOldMoney) * 100;
    })
  );
  

  getCarts() {
    return this.cartsSubject.value;
  }

  isInCart(courseId: number): boolean {
    return this.getCarts().some(item => item.courseResponse.id === courseId);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
    private apiUrl = 'http://localhost:8080/review';
    constructor(private http: HttpClient) { }
    getReviews(page: number = 0, size: number = 10): Observable<any> {
        const params = new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString());
    
        return this.http.get<any>(`${this.apiUrl}/list`, { params });
      }
    deleteReview(reviewId:number):Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}/${reviewId}`);
    }

}
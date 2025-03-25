import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private API_URL = 'http://localhost:8080/course';

  constructor(private http: HttpClient) {}

  searchCourses(filterRequest: any, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
      
    Object.keys(filterRequest).forEach((key) => {
      if (filterRequest[key]) {
        params = params.set(key, filterRequest[key]);
      }
    });

    return this.http.get(`${this.API_URL}/search`, { params });
  }
}

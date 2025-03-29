import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterRequest } from '../4AdminCustom/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private API_URL = 'http://localhost:8080/course';
  private labelUrl = 'http://localhost:8080/label'

  constructor(private http: HttpClient) {}
  searchCourses(filterRequest: FilterRequest, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/search`, filterRequest, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
    });
  };
  getPendingCourses():Observable<any>{
    return this.http.get<any>(`${this.API_URL}/pending-courses`)
  }
  getAcceptCourses():Observable<any>{
    return this.http.get<any>(`${this.API_URL}/accept-courses`)
  }
  getRejectCourses():Observable<any>{
    return this.http.get<any>(`${this.API_URL}/reject-courses`)
  }
  getDraftCourses():Observable<any>{
    return this.http.get<any>(`${this.API_URL}/draft-courses`)
  }
  getAllCourses(
    sortBy: string[],
    sortDirection: string[],
    page: number,
    size: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Thêm danh sách sortBy vào params
    sortBy.forEach((field) => {
      params = params.append('sortBy', field);
    });

    // Thêm danh sách sortDirection vào params
    sortDirection.forEach((direction) => {
      params = params.append('sortDirection', direction);
    });

    return this.http.get<any>(`${this.API_URL}/courses/accepted`, { params });
  }
  addLabel(labelName: string, labelRequest: any): Observable<any> {
    const url = `${this.labelUrl}/add/${labelName}`;
    return this.http.post<any>(url, labelRequest);
  }
  createDraftCourse(title: string): Observable<any> {
    let params = new HttpParams().set('title', title);
    return this.http.post<any>(`${this.API_URL}/draft`, {}, { params });
  }
}

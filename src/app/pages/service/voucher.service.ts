import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
    private apiUrl = 'http://localhost:8080/voucher';
    constructor(private http: HttpClient) { }
    getActiveVoucherNonExpired():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/getActiveVoucherNonExpired`);
    }
    getInactiveVoucherNonExpired():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/getInactiveVoucherNonExpired`);
    }
    getInactiveVoucherExpired():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/getInactiveVoucherExpired`);
    }
    getInactiveNotStarted():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/getInactiveNotStarted`);
    }
    updateLatest():Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/update-latest`,{})
    }
    toggleActiveVoucher(voucherId:number):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/toggle-active-voucher/${voucherId}`,{})
    }
    createVoucher(voucher:any):Observable<any>{
        console.log('Dữ liệu gửi từ service:', voucher);
        return this.http.post<any>(`${this.apiUrl}/create`,voucher)
    }
}
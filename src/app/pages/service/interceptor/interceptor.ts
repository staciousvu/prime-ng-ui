import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError, throwError } from 'rxjs';
const baseApiUrl = 'http://localhost:8080';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const publicEndpoints = [
    `${baseApiUrl}/auth/log-in`,
    `${baseApiUrl}/user/sent-otp`,
    `${baseApiUrl}/user/create`,
    `${baseApiUrl}/user/sent-otp-reset`,
    `${baseApiUrl}/home`
  ];

  const isPublic = publicEndpoints.some(endpoint => req.url.startsWith(endpoint));

  let requestToSend = req;

  if (!isPublic && token) {
    requestToSend = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(requestToSend).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
        // Có thể điều hướng về trang login nếu muốn
      }
      return throwError(() => error);
    })
  );
};




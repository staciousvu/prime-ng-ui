import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router) as Router;
  const token = authService.getToken();

  const publicEndpoints = [
    '/auth/login',
    '/auth/register',
    '/products/public',
    '/home'
  ];
  const isPublic = publicEndpoints.some(endpoint => req.url.includes(endpoint));

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
        const role = authService.getRole(); // Lấy role từ localStorage
        authService.logout(); // Xoá token, phát authStatus = false

        if (role === 'ADMIN') {
          router.navigate(['/admin/login']);
        } else {
          router.navigate(['/user/login']);
        }
      }
      return throwError(() => error);
    })
  );
};




// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
//   const token = authService.getToken();
//   const publicEndpoints = [
//     '/auth/login',
//     '/auth/register',
//     '/products/public',
//     '/home'
//   ];
//   const isPublic = publicEndpoints.some(endpoint => req.url.includes(endpoint));

//   if (!isPublic && token) {
//     const clonedReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return next(clonedReq);
//   }

//   return next(req);
// };

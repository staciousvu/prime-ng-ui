import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const publicEndpoints = [
    '/auth/login',
    '/auth/register',
    '/products/public',
    '/home'
  ];
  const isPublic = publicEndpoints.some(endpoint => req.url.includes(endpoint));

  if (!isPublic && token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};

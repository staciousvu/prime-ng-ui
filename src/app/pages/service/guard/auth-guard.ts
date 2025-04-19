// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const urlPath = route.url.map(segment => segment.path).join('/');
    const publicRoutes = ['user/login', 'user/register'];
  
    console.log('URL PATH:', urlPath);
  
    if (publicRoutes.includes(urlPath)) {
      return true;
    }
  
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/user/login']);
      return false;
    }
  
    return true;
  }
  
  

  
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (!this.authService.isAdmin()) {
            console.log('not adminnnnnnnnnnnnn')
            this.router.navigate(['/admin/login']);
            return false;
        }
        console.log('is admin')
        return true;
    }
}
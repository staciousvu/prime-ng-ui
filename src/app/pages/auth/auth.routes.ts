import { Routes } from '@angular/router';
import { Access } from './access';
import { AdminLoginComponent } from './admin-login';
import { Error } from './error';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'admin/login', component: AdminLoginComponent }
] as Routes;

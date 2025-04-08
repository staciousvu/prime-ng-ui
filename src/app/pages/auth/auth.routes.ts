import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './admin-login';
import { Error } from './error';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'admin/login', component: Login }
] as Routes;

import { Routes } from "@angular/router";
import { UserComponent } from "./user";





export default [
    { path: 'user', data: { breadcrumb: 'Button' }, component: UserComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
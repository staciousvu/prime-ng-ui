import { Routes } from "@angular/router";
import { ReviewComponent } from "./review";




export default [
    { path: 'list', data: { breadcrumb: 'Button' }, component: ReviewComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
import { Routes } from "@angular/router";
import { NotificationComponent } from "../notification/notification";



export default [
    { path: 'list', data: { breadcrumb: 'Button' }, component: NotificationComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
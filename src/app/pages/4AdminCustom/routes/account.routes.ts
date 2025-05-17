import { Routes } from "@angular/router";
import { AdminAccountComponent } from "../user/admin-account";
import { UpdateAccountAdminComponent } from "../user/update-account-admin";
import { AddAdminComponent } from "../user/add-admin";
import { InstructorAccountComponent } from "../user/instructor-account";
import { ViewInstructorComponent } from "../user/view-instructor/view-instructor";
import { ViewInstructorDetailComponent } from "../user/view-instructor/instructor-detai";


export default [
    { path: 'list-admin', data: { breadcrumb: 'Button' }, component: AdminAccountComponent },
    { path: 'update-admin/:id', data: { breadcrumb: 'Button' }, component: UpdateAccountAdminComponent },
    { path: 'add-admin', data: { breadcrumb: 'Button' }, component: AddAdminComponent },
    { path: 'list-instructor', data: { breadcrumb: 'Button' }, component: InstructorAccountComponent },
    { path: 'view-instructor/:id', data: { breadcrumb: 'Button' }, component: ViewInstructorDetailComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
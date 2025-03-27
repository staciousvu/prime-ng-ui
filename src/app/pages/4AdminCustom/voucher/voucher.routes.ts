import { Routes } from "@angular/router";
import { VoucherComponent } from "./voucher";
import { AddVoucherComponent } from "./add-voucher";



export default [
    { path: 'list', data: { breadcrumb: 'Button' }, component: VoucherComponent },
    { path: 'add-course', data: { breadcrumb: 'Button' }, component: AddVoucherComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
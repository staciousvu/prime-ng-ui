import { Routes } from "@angular/router";
import { VoucherComponent } from "../voucher/voucher";
import { AddVoucherComponent } from "../voucher/add-voucher";




export default [
    { path: 'list', data: { breadcrumb: 'Button' }, component: VoucherComponent },
    { path: 'add-voucher', data: { breadcrumb: 'Button' }, component: AddVoucherComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
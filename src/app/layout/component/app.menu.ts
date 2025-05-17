import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }]
            },
            {
                label: 'Quản lý khóa học',
                items: [
                    // { label: 'List courses', icon: 'pi pi-fw pi-book', routerLink: ['/admin/courses/list'] },
                    { label: 'Courses', icon: 'pi pi-fw pi-check', routerLink: ['/admin/courses/approve-course'] },
                    { label: 'Label', icon: 'pi pi-fw pi-tag', routerLink: ['/admin/courses/label'] },
                    { label: 'Category', icon: 'pi pi-fw pi-tags',routerLink: ['/admin/courses/category']  },
                    { label: 'Recommend', icon: 'pi pi-fw pi-list',routerLink: ['/admin/courses/recommend']  },
                ]
            },
            {
                label: 'Quản lý voucher',
                items: [
                    { label: 'List vouchers', icon: 'pi pi-fw pi-ticket', routerLink: ['/admin/vouchers/list'] },
                    { label: 'Add voucher', icon: 'pi pi-fw pi-plus', routerLink: ['/admin/vouchers/add-voucher'] },
                ]
            },
            {
                label: 'Quản lý báo cáo & khiếu nại',
                items: [
                    { label: 'List reports', icon: 'pi pi-fw pi-flag', routerLink: ['/admin/report/list'] },

                ]
            },
            {
                label: 'Quản lý quảng cáo',
                items: [
                    { label: 'List advertisements', icon: 'pi pi-fw pi-window-maximize', routerLink: ['/admin/advertisements/list'] },
                ]
            },
            // {
            //     label: 'Quản lý đánh giá',
            //     items: [
            //         { label: 'List reviews', icon: 'pi pi-fw pi-ticket', routerLink: ['/admin/reviews/list'] },
            //     ]
            // },
            {
                label: 'Quản lý thông báo',
                items: [
                    { label: 'List notification', icon: 'pi pi-fw pi-bell', routerLink: ['/admin/notifications/list'] },
                ]
            },
            {
                label: 'Quản lý slide',
                items: [
                    { label: 'Slide', icon: 'pi pi-fw pi-sliders-h', routerLink: ['/admin/slide/list'] },
                ]
            },
            {
                label: 'Quản lý bài viết',
                items: [
                    { label: 'Post', icon: 'pi pi-fw pi-file-edit', routerLink: ['/admin/post/list'] },
                    { label: 'Add post', icon: 'pi pi-fw pi-plus', routerLink: ['/admin/post/add'] },
                ]
            },
            {
                label: 'Quản lý đơn hàng',
                items: [
                    { label: 'Đơn hàng', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/admin/order/list'] },
                ]
            },
            {
                label: 'Quản lý tài khoản',
                items: [
                    // { label: 'Admin', icon: 'pi pi-fw pi-users', routerLink: ['/admin/account/list-admin'] },
                    { label: 'Tài khoản', icon: 'pi pi-fw pi-users', routerLink: ['/admin/account/list-instructor'] },
                    // { label: 'Learner', icon: 'pi pi-fw pi-users', routerLink: ['/admin/account/list-student'] }
                ]
            },
            
            
            {
                label: 'Hệ thống',
                items: [
                    { label: 'Cài đặt', icon: 'pi pi-fw pi-cog', routerLink: ['/admin/account/view-instructor'] },
                    { label: 'Lịch sử hoạt động', icon: 'pi pi-fw pi-history', routerLink: ['/admin/account/history-activity'] },
                    // { label: 'Báo cáo & Thống kê', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reports'] }
                    
                ]
            },
            
            // {
            //     label: 'UI Components',
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
            //         { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
            //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
            //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
            //         { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
            //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
            //     ]
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     routerLink: ['/pages'],
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/pages/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         }
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
            //                 }
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation',
            //             icon: 'pi pi-fw pi-book',
            //             routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source',
            //             icon: 'pi pi-fw pi-github',
            //             url: 'https://github.com/primefaces/sakai-ng',
            //             target: '_blank'
            //         }
            //     ]
            // }
        ];
    }
}

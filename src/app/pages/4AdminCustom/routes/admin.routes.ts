// admin.routes.ts
import { Routes } from '@angular/router';
import { Dashboard } from '../../dashboard/dashboard';
import { OrderComponent } from '../order/order';
import { SlideComponent } from '../slide/slide';
import { ReportComponent } from '../report/report';
import { PostComponent } from '../post/post-list';
import { PostAddComponent } from '../post/post-add';
import { PostEditComponent } from '../post/post-edit';
import { AdminReviewComponent } from '../admin-review-course/admin-review';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: Dashboard },
            { 
                path: 'courses', 
                loadChildren: () => import('./4Admin.routes').then(m => m.default) 
            },
            { 
                path: 'vouchers', 
                loadChildren: () => import('./voucher.routes').then(m => m.default) 
            },
            { 
                path: 'reviews', 
                loadChildren: () => import('./review.routes').then(m => m.default) 
            },
            { 
                path: 'notifications', 
                loadChildren: () => import('./notification.routes').then(m => m.default) 
            },
            { 
                path: 'account', 
                loadChildren: () => import('./account.routes').then(m => m.default) 
            },
            { 
                path: 'order/list', 
                component :OrderComponent
            },
            { 
                path: 'slide/list', 
                component :SlideComponent
            },
            { 
                path: 'report/list', 
                component :ReportComponent
            },

            { 
                path: 'post', children:[
                    { path: 'list', component: PostComponent },
                    { path: 'add', component: PostAddComponent },
                    { path: 'edit/:slug', component: PostEditComponent },
                ]
            }
        ]
    }
];

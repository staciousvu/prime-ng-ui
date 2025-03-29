// admin.routes.ts
import { Routes } from '@angular/router';
import { Dashboard } from '../../dashboard/dashboard';

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
        ]
    }
];

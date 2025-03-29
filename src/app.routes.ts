import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/pages/service/guard/guard';
import AdminRoutes from './app/pages/4AdminCustom/routes/4Admin.routes';
// cu
// export const appRoutes: Routes = [
//     {
//         path: '',
//         redirectTo: 'admin', 
//         pathMatch: 'full'
//     },
//     {
//         path: '',
//         component: AppLayout,canActivate:[AuthGuard],
//         children: [
//             { path: 'admin', component: Dashboard},
//             { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
//             { path: 'courses', loadChildren: () => import('./app/pages/4AdminCustom/4Admin.routes') },
//             { path: 'vouchers', loadChildren: () => import('./app/pages/4AdminCustom/voucher/voucher.routes') },
//             { path: 'reviews', loadChildren: () => import('./app/pages/4AdminCustom/review/review.routes') },
//             { path: 'documentation', component: Documentation },
//             { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
//         ]
//     },
//     { path: 'landing', component: Landing },
//     { path: 'notfound', component: Notfound },
//     { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
//     { path: '**', redirectTo: '/notfound' }
// ];
// cu
export const appRoutes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: 'admin',loadChildren: () => import('./app/pages/4AdminCustom/routes/admin.routes').then(m => m.AdminRoutes) },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];

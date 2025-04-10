import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/pages/service/guard/auth-guard';
import AdminRoutes from './app/pages/4AdminCustom/routes/4Admin.routes';
import { HomeComponent } from './app/pages/4User/home';
import { AppUserLayout } from './app/pages/4User/layout/user.layout';
import { AdminGuard } from './app/pages/service/guard/admin-guard';
import { Login } from './app/pages/auth/admin-login';
import { UserLoginComponent } from './app/pages/auth/user-login';
import { BlankLayoutComponent } from './app/pages/4User/layout/blank.layout';
import { CartComponent } from './app/pages/4User/cart';
import { MyLearningComponent } from './app/pages/4User/mylearning';
import { CourseDetailComponent } from './app/pages/4User/course-detail';
import { VideoLearningComponent } from './app/pages/4User/video-learning';
import { QAndAComponent } from './app/pages/4User/video-learning/Q&A';
import { QAndAListComponent } from './app/pages/4User/video-learning/QandAList';
import { QAndADetailComponent } from './app/pages/4User/video-learning/Q&ADetail';
import { OverviewVideoComponent } from './app/pages/4User/video-learning/overview';
import { RatingVideoComponent } from './app/pages/4User/video-learning/rating';
export const appRoutes: Routes = [

    {
        path:'',
        component:AppUserLayout,
        children:[
            {path:'',redirectTo:'home',pathMatch:'full'},
            {path:'home',component:HomeComponent},
            {path:'cart',component:CartComponent},
            {path:'my-learning',component:MyLearningComponent},
            {path:'course-detail/:id',component:CourseDetailComponent}
        ]
    },
    {
        path:'',
        component:BlankLayoutComponent,
        children:[
            {path:'course/video-learning/:id',component:VideoLearningComponent,},
        ]
    },
    {
        path: 'admin',
        component: AppLayout,
        canActivate:[AdminGuard],
        children: [
            { path: '',loadChildren: () => import('./app/pages/4AdminCustom/routes/admin.routes').then(m => m.AdminRoutes) },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path:'admin/login',component:Login},
    { path:'user/login',component:UserLoginComponent},
    { path: 'home', component: HomeComponent },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];

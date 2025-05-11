import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/pages/service/guard/auth-guard';
import { HomeComponent } from './app/pages/4User/home';
import { AppUserLayout } from './app/pages/4User/layout/user.layout';
import { AdminGuard } from './app/pages/service/guard/admin-guard';
import { UserLoginComponent } from './app/pages/auth/user-login';
import { BlankLayoutComponent } from './app/pages/4User/layout/blank.layout';
import { MyLearningComponent } from './app/pages/4User/mylearning';
import { SurveyLayoutComponent } from './app/pages/4User/layout/survey.layout';
import { PaymentSuccessComponent } from './app/pages/4User/payment-success';
import { PaymentFailedComponent } from './app/pages/4User/payment-failed';
import { SearchCourseComponent } from './app/pages/4User/search-course';
import { InstructorLayoutComponent } from './app/pages/4Instructor/layout/instructor.layout';
import { MessageUserComponent } from './app/pages/4User/message';
import { InstructorDetailComponent } from './app/pages/4User/instructor-detail';
import { CourseDetail2Component } from './app/pages/4User/course-detail2';
import { Cart2Component } from './app/pages/4User/cart2';
import { UserRegisterComponent } from './app/pages/auth/register';
import { AdminLoginComponent } from './app/pages/auth/admin-login';
import { RegisterOtpComponent } from './app/pages/auth/register-otp';
import { ResetPasswordComponent } from './app/pages/auth/reset';
import { ResetOtpComponent } from './app/pages/auth/reset-otp';
import { EditCourseInstructorLayoutComponent } from './app/pages/4Instructor/layout/edit-course-instructor.layout';
import { EditCourseCurriculumComponent } from './app/pages/4Instructor/curriculum';
import { EditCourseIntendedLearnerComponent } from './app/pages/4Instructor/intended-learner';
import { EditCourseLandingPageComponent } from './app/pages/4Instructor/landing-page';
import { EditCoursePriceComponent } from './app/pages/4Instructor/price';
import { TestToastComponent } from './app/pages/4Instructor/component/test';
import { VideoLearning1Component } from './app/pages/4User/video-learning1';
import { EditCourseQuizComponent } from './app/pages/4Instructor/quiz';
import { FavoriteComponent } from './app/pages/4User/favorite';
import { UserPostComponent } from './app/pages/4User/user-post-list';
import { UserPostDetailComponent } from './app/pages/4User/user-post-detail';
import { AdminReviewComponent } from './app/pages/4AdminCustom/admin-review-course/admin-review';
import { EditCourseCurriculum2Component } from './app/pages/4Instructor/curriculum2';
export const appRoutes: Routes = [

    {
        path:'',
        component:AppUserLayout,
        canActivate:[AuthGuard],
        children:[
            {path:'',redirectTo:'home',pathMatch:'full'},
            {path:'home',component:HomeComponent},
            {path:'cart',component:Cart2Component},
            {path:'my-learning',component:MyLearningComponent},
            {path:'favorite',component:FavoriteComponent},
            {path:'course-detail/:id',component:CourseDetail2Component},
            {path:'payment-success',component:PaymentSuccessComponent},
            {path:'payment-failed',component:PaymentFailedComponent},
            {path:'post',component:UserPostComponent},
            {path:'post-detail/:slug',component:UserPostDetailComponent},
            {path:'search/:keyword',component:SearchCourseComponent},
            {path:'message',component:MessageUserComponent},
            {path:'instructor-detail/:id',component:InstructorDetailComponent},
        ]
    },
    {
        path:'instructor',
        component:InstructorLayoutComponent,
        canActivate:[AuthGuard],
        children:[
            {path:'',loadChildren: () => import('./app/pages/4Instructor/routes/instructor.routes').then(m => m.default) },
        ]
    },
    {
        path:'test',
        component:TestToastComponent,
    },
    {
        path:'',
        component:BlankLayoutComponent,
        canActivate:[AuthGuard],
        children:[
            {path:'course/video-learning/:id',component:VideoLearning1Component},
            {path:'survey',component:SurveyLayoutComponent},
            { path: 'edit-course/:id', data: { breadcrumb: 'Button' }, component: EditCourseInstructorLayoutComponent,
            children:[
                { path: '', redirectTo: 'goals', pathMatch: 'full' },
                {path:'goals',component:EditCourseIntendedLearnerComponent},
                {path:'curriculum',component:EditCourseCurriculum2Component},
                {path:'landing-page',component:EditCourseLandingPageComponent},
                {path:'price',component:EditCoursePriceComponent},
                {path:'quiz',component:EditCourseQuizComponent},
            ] },
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
    {
        path:'review/course/:courseId/admin/:context',
        component:AdminReviewComponent,
        canActivate:[AdminGuard],
    },
    { path:'admin/login',component:AdminLoginComponent},
    { path:'user/login',component:UserLoginComponent},
    { path:'user/verify-otp',component:RegisterOtpComponent},
    { path:'user/register',component:UserRegisterComponent},
    { path:'user/reset-password',component:ResetPasswordComponent},
    { path:'user/verify-reset-otp',component:ResetOtpComponent},
    { path: 'home', component: HomeComponent },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];

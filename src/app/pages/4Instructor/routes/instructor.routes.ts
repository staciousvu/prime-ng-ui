import { Routes } from "@angular/router";
import { InstructorCoursesComponent } from "../component/instructor-courses";
import { CommunicationLayoutComponent } from "../layout/communication.layout";
import { QNACommunicationComponent } from "../qna";
import { AssignmentsCommunicationComponent } from "../assignments";
import { MessagesCommunicationComponent } from "../messages";
import { AnnouncementsCommunicationComponent } from "../announcements";
import { ProfileComponent } from "../layout/profile";
import { ProfileBasicComponent } from "../component/profile-basic";
import { ProfilePhotoComponent } from "../component/photo";
import { PerformanceLayoutComponent } from "../layout/performance.layout";
import { PerformanceOverviewComponent } from "../component/performance-overview";
import { PerformanceStudentComponent } from "../component/performance-student";
import { PerformanceReviewComponent } from "../component/performance-review";






export default [
    {path:'',redirectTo:'courses',pathMatch:'full'},
    { path: 'courses', data: { breadcrumb: 'Button' }, component: InstructorCoursesComponent },
    { path: 'profiles', data: { breadcrumb: 'Button' }, component: ProfileComponent ,children:[
        {path:'',redirectTo:'basic-information',pathMatch:'full'},
        {path:'basic-information',component:ProfileBasicComponent},
        {path:'photo',component:ProfilePhotoComponent},
    ]},
    { path: 'communications', data: { breadcrumb: 'Button' }, component: CommunicationLayoutComponent,children:[
        { path: '', redirectTo: 'qna', pathMatch: 'full' },
        {path:'qna',component:QNACommunicationComponent},
        {path:'assignments',component:AssignmentsCommunicationComponent},
        {path:'messages',component:MessagesCommunicationComponent},
        {path:'announcements',component:AnnouncementsCommunicationComponent},
    ] },
    { path: 'performances', data: { breadcrumb: 'Button' }, component: PerformanceLayoutComponent,children:[
        { path: '', redirectTo: 'overview', pathMatch: 'full' },
        {path:'overview',component:PerformanceOverviewComponent},
        {path:'student',component:PerformanceStudentComponent},
        {path:'review',component:PerformanceReviewComponent},
    ] },

    { path: '**', redirectTo: '/notfound' }
] as Routes;
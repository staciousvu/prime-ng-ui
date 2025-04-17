import { Routes } from "@angular/router";
import { InstructorCoursesComponent } from "../component/instructor-courses";
import { CommunicationLayoutComponent } from "../layout/communication.layout";
import { QNACommunicationComponent } from "../qna";
import { AssignmentsCommunicationComponent } from "../assignments";
import { MessagesCommunicationComponent } from "../messages";
import { AnnouncementsCommunicationComponent } from "../announcements";






export default [
    {path:'',redirectTo:'courses',pathMatch:'full'},
    { path: 'courses', data: { breadcrumb: 'Button' }, component: InstructorCoursesComponent },
    { path: 'communications', data: { breadcrumb: 'Button' }, component: CommunicationLayoutComponent,children:[
        { path: '', redirectTo: 'qna', pathMatch: 'full' },
        {path:'qna',component:QNACommunicationComponent},
        {path:'assignments',component:AssignmentsCommunicationComponent},
        {path:'messages',component:MessagesCommunicationComponent},
        {path:'announcements',component:AnnouncementsCommunicationComponent},
    ] },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
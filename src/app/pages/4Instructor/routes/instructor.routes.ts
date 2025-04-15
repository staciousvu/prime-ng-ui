import { Routes } from "@angular/router";
import { InstructorCoursesComponent } from "../component/instructor-courses";
import { CommunicationLayoutComponent } from "../layout/communication.layout";






export default [
    { path: 'courses', data: { breadcrumb: 'Button' }, component: InstructorCoursesComponent },
    { path: 'communications', data: { breadcrumb: 'Button' }, component: CommunicationLayoutComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
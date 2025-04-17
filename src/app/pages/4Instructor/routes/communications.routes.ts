


import { Routes } from "@angular/router";
import { InstructorCoursesComponent } from "../component/instructor-courses";
import { CommunicationLayoutComponent } from "../layout/communication.layout";
import { AssignmentsCommunicationComponent } from "../assignments";






export default [
    { path: 'qna', data: { breadcrumb: 'Button' }, component: InstructorCoursesComponent },
    { path: 'assignments', data: { breadcrumb: 'Button' }, component: AssignmentsCommunicationComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
import { Routes } from "@angular/router";
import { CourseList } from "./course";
import { AddCourse } from "./add-course";
import { UpdateCourse } from "./update-course";
import { CurriculumComponent } from "./curriculum";
import { ApproveCourseComponent } from "./approve-course";
import { ViewCourseComponent } from "./view-course";
import { CategoryComponent } from "./category";
import { TestComponent } from "./test";
import { CourseLabelComponent } from "./label-course";



export default [
    { path: 'list', data: { breadcrumb: 'Button' }, component: CourseList },
    { path: 'add-course', data: { breadcrumb: 'Button' }, component: AddCourse },
    { path: 'approve-course', data: { breadcrumb: 'Button' }, component: ApproveCourseComponent},
    {path:'curriculum',data: { breadcrumb: 'Button' }, component: CurriculumComponent},
    {path:'label',data: { breadcrumb: 'Button' }, component: CourseLabelComponent},
    {path:'category',data: { breadcrumb: 'Button' }, component: CategoryComponent},
    {path:'test',data: { breadcrumb: 'Button' }, component: TestComponent},
    { path: 'update-course/:id', data: { breadcrumb: 'Button' }, component: UpdateCourse },
    { path: 'view-course/:id', data: { breadcrumb: 'Button' }, component: ViewCourseComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
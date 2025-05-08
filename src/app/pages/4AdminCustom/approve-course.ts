import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseData } from '../service/data.service';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumpComponent } from './breadcrump';
import { TabsModule } from 'primeng/tabs';
import { CoursePendingComponent } from './course-pending';
import { CourseAcceptComponent } from './accept-course';
import { CourseRejectComponent } from "./reject-course";
import { CourseDraftComponent } from './draft-courses';

@Component({
    selector: 'app-approve',
    standalone: true,
    imports: [
    CourseDraftComponent,
    CourseRejectComponent, 
    CourseAcceptComponent,
    CoursePendingComponent,
    TabsModule,
    BreadcrumpComponent,
    RouterModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    ButtonModule,
    TableModule,
    CommonModule,
    BadgeModule,
    RatingModule,
    FormsModule,
    TagModule
],
    template: `
        <app-breadcrump [apr]="'Approve course'" [manager]="'Manage course'"></app-breadcrump>
        <div class="font-semibold text-xl mb-4">Approve Course</div>
            <p-tabs value="0">
                <p-tablist>
                    <p-tab value="0">Chờ duyệt</p-tab>
                    <p-tab value="1">Đã duyệt</p-tab>
                    <p-tab value="2">Từ chối</p-tab>
                    <p-tab value="3">Bản nháp</p-tab>
                </p-tablist>
                <p-tabpanels>
                    <p-tabpanel value="0">
                        <app-course-pending />
                    </p-tabpanel>
                    <p-tabpanel value="1">
                        <app-course-accept />
                    </p-tabpanel>
                    <p-tabpanel value="2">
                        <app-course-reject/>
                    </p-tabpanel>
                    <p-tabpanel value="3">
                    <app-course-draft/>
                    </p-tabpanel>
                </p-tabpanels>
            </p-tabs>
    `,
    styles: [``],
    providers: [CourseData]
})
export class ApproveCourseComponent {}

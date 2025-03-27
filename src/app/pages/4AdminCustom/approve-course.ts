import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product, ProductService } from '../service/product.service';
import { Customer, CustomerService } from '../service/customer.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { CourseService } from '../service/course.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { SpeedDial } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { Toolbar, ToolbarModule } from 'primeng/toolbar';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { Select } from 'primeng/select';
import { Router, RouterModule } from '@angular/router';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseData } from '../service/data.service';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumpComponent } from './breadcrump';
import { TabsModule } from 'primeng/tabs';
import { CoursePendingComponent } from './course-pending';
import { CourseAcceptComponent } from './accept-course';
import { CourseRejectComponent } from "./reject-course";
import { CourseDraftComponent } from './draft-courses';
interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'app-approve',
    standalone: true,
    imports: [
        CourseDraftComponent,
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
    TagModule,
    CourseRejectComponent
],
    template: `
        <app-breadcrump [apr]="'Approve course'" [manager]="'Manage course'"></app-breadcrump>
        <div class="font-semibold text-xl mb-4">Approve Course</div>
        <div class="card">
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
        </div>
    `,
    styles: [``],
    providers: [CourseData]
})
export class ApproveCourseComponent {}

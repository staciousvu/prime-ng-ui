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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseData } from '../service/data.service';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumpComponent } from './breadcrump';
import { TabsModule } from 'primeng/tabs';
import { FluidModule } from 'primeng/fluid';
import { FileUploadModule } from 'primeng/fileupload';
import { CurriculumComponent } from './curriculum';
import { TextareaModule } from 'primeng/textarea';
import { ViewCourseInfoComponent } from './view-course/basic-info';
import { ViewCurriculumComponent } from './view-course/view-curriculum';
import { ViewIntendedLearnerComponent } from './view-course/view-content';
import { ViewRequirementComponent } from './view-course/view-requirement';
import { ViewTargetComponent } from './view-course/view-target';
@Component({
    selector: 'app-view-course',
    standalone: true,
    imports: [
        ViewRequirementComponent,
        ViewIntendedLearnerComponent,
        ViewCurriculumComponent,
        ViewCourseInfoComponent,
        FileUploadModule,
        FluidModule,
        TabsModule,
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
        TextareaModule,
        ViewTargetComponent
    ],
    template: `
        <div class="card" style="padding: 6px; margin: 8px; background-color: transparent;">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <p-button label="Back" icon="pi pi-arrow-left" class="me-5" [routerLink]="['/admin/courses/list']" />
                    <span class="font-semibold text-xl">View course</span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-2xl font-bold text-gray-800">Lập trình HTML, CSS nâng cao</span>
                </div>
                <div>
                    <!-- <p-button label="Save" icon="pi pi-save" class="text-white px-4 py-2 rounded-lg"/> -->
                </div>
            </div>
        </div>
        <div class="card">
            <p-tabs value="0">
                <p-tablist>
                    <p-tab value="0" class="text-lg">Course information</p-tab>
                    <p-tab value="1" class="text-lg">Curriculum</p-tab>
                    <p-tab value="2" class="text-lg">Course content</p-tab>
                    <p-tab value="3" class="text-lg">Course requirement</p-tab>
                    <p-tab value="4" class="text-lg">Course target</p-tab>
                    <!-- <p-tab value="3" class="text-lg">Intended learner</p-tab> -->
                </p-tablist>
                <p-tabpanels>
                    <p-tabpanel value="0">
                        <app-view-course-info [courseId]="courseId" />
                    </p-tabpanel>
                    <p-tabpanel value="1">
                        <!-- test -->
                        <app-view-curriculum [courseId]="courseId" />
                        <!-- test -->

                        <!-- <p class="m-0">Nội dung của Tab 2</p> -->
                    </p-tabpanel>
                    <p-tabpanel value="2">
                        <app-view-intended-learner [courseId]="courseId" />
                    </p-tabpanel>
                    <p-tabpanel value="3">
                        <app-view-requirement [courseId]="courseId" />
                    </p-tabpanel>
                    <p-tabpanel value="4">
                        <app-view-target [courseId]="courseId" />
                    </p-tabpanel>
                </p-tabpanels>
            </p-tabs>
        </div>
    `,
    styles: [``]
})
export class ViewCourseComponent {
    courseId: number | undefined;
    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            this.courseId = Number(id);
        });
    }
    constructor(private route: ActivatedRoute) {}
}

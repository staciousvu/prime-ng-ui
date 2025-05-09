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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { FluidModule } from 'primeng/fluid';
import { FileUploadModule } from 'primeng/fileupload';
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

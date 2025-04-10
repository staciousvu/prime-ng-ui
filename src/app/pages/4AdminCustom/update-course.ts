import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { CurriculumComponent } from './curriculum';
import { UpdateBasicInfoComponent } from './update-course/basicinfo';
import { UpdateCurriculumComponent } from './update-course/curriculum';
import { UpdateIntendedLearnerComponent } from './update-course/intended-learner';
import { UpdateRequirementComponent } from './update-course/requirement';
import { UpdateTargetComponent } from './update-course/target';

@Component({
    selector: 'update-course',
    standalone: true,
    imports: [
        UpdateBasicInfoComponent,
        UpdateCurriculumComponent,
        UpdateIntendedLearnerComponent,
        UpdateTargetComponent,
        TabsModule,
        UpdateRequirementComponent,
        CommonModule,
        FormsModule,
        FileUploadModule,
        AccordionModule,
        RouterModule,
        InputTextModule,
        FluidModule,
        ButtonModule,
        SelectModule,
        FormsModule,
        TextareaModule
    ],
    template: `
        <div class="card" style="padding: 6px; margin: 8px; background-color: transparent;">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <p-button label="Back" icon="pi pi-arrow-left" class="me-5" [routerLink]="['/admin/courses/list']" />
                    <span class="font-semibold text-xl text-gray-800">Edit course</span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-2xl font-bold text-gray-800">Lập trình HTML, CSS nâng cao</span>
                </div>
                <div>
                    <!-- <p-button label="Save" icon="pi pi-save" class="text-white px-4 py-2 rounded-lg" /> -->
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
                </p-tablist>
                <p-tabpanels>
                    <p-tabpanel value="0">
                        <app-update-basic-info [courseId]="courseId" />
                    </p-tabpanel>

                    <p-tabpanel value="1">
                        <!-- <app-curriculum></app-curriculum> -->
                        <app-update-curriculum [courseId]="courseId" />
                    </p-tabpanel>
                    <p-tabpanel value="2">
                        <app-update-intended-learner [courseId]="courseId" />
                    </p-tabpanel>
                    <p-tabpanel value="3">
                        <app-update-requirement [courseId]="courseId" />
                    </p-tabpanel>
                    <p-tabpanel value="4">
                        <app-update-target [courseId]="courseId" />
                    </p-tabpanel>
                </p-tabpanels>
            </p-tabs>
        </div>
    `
})
export class UpdateCourse implements OnInit {
    courseId: number | undefined;
    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            this.courseId = Number(id);
        });
    }
    constructor(private route: ActivatedRoute) {}
    course: any = { id: 1, title: 'New Course', sections: [] };
    newSection: any = { id: 0, title: '', lectures: [] };
    newLecture: any = { id: 0, title: '', videoUrl: '' };
    languages = [
        { name: 'English', code: 'EN' },
        { name: 'Vietnamese', code: 'VI' },
        { name: 'French', code: 'FR' },
        { name: 'Japanese', code: 'JP' }
    ];

    selectedLanguage: any = null; // Ban đầu chưa chọn ngôn ngữ nào
    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    dropdownItem = null;
    previewUrl: string | ArrayBuffer | null = null;

    onFileSelected(event: any) {
        const file = event.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                this.previewUrl = e.target?.result ?? null; // Nếu undefined thì gán null
            };
            reader.readAsDataURL(file);
        }
    }
    videoUrl: string | ArrayBuffer | null = null;

    onVideoSelected(event: any) {
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => (this.videoUrl = e.target?.result as string | ArrayBuffer);
            reader.readAsDataURL(file);
        }
    }
}

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
import { FluidModule } from 'primeng/fluid';
import { FileUploadModule } from 'primeng/fileupload';
import { CurriculumComponent } from './curriculum';
@Component({
    selector: 'app-view-course',
    standalone:true,
    imports:[CurriculumComponent,FileUploadModule,FluidModule,TabsModule,BreadcrumpComponent,Select, RouterModule, Dialog,DialogModule,ConfirmDialogModule,InputTextModule,
        InputIconModule, IconFieldModule, Toolbar, ButtonModule, TableModule, CommonModule, BadgeModule, RatingModule, FormsModule, TagModule, SpeedDial],
    template: `
    <div class="card p-4 pb-2">
    <div class="flex items-center justify-between">
        <div class="flex items-center">
            <p-button label="Back" icon="pi pi-arrow-left" class="me-5" [routerLink]="['/courses/list']"/>
            <span class="font-semibold text-xl">View course</span>    
        </div>
        <span class="text-lg font-bold text-gray-600">Lập trình HTML , CSS nâng cao</span> 
    </div>
</div>
<div class="card">
    <p-tabs value="0">
        <p-tablist>
            <p-tab value="0">Course information</p-tab>
            <p-tab value="1">Curriculum</p-tab>
            <p-tab value="2">Intended learner</p-tab>
        </p-tablist>
        <p-tabpanels>
            <p-tabpanel value="0">
            <p-fluid>
        <div class="flex flex-col md:flex-row gap-2">
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-5">
                    <div class="font-semibold text-xl">Course landing page</div>
                    <div class="flex flex-col gap-2">
                        <label for="name1">Course title</label>
                        <input pInputText id="name1" type="text" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="email1">Course subtitle</label>
                        <input pInputText id="email1" type="text" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="age1">Description</label>
                        <textarea pTextarea id="address" rows="5"></textarea>
                    </div>
                    <div class="flex flex-wrap gap-6">
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="name2">Category</label>
                            <p-select [options]="languages" [(ngModel)]="selectedLanguage" optionLabel="name" placeholder="Select category" class="w-full" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="email2">Subcategory</label>
                            <p-select [options]="languages" [(ngModel)]="selectedLanguage" optionLabel="name" placeholder="Select subcategory" class="w-full" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="email1">Course subtitle</label>
                        <p-select [options]="languages" [(ngModel)]="selectedLanguage" optionLabel="name" placeholder="Select topic" class="w-full" />
                    </div>
                    <div class="flex flex-wrap gap-6">
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="name2">Language</label>
                            <p-select [options]="languages" [(ngModel)]="selectedLanguage" optionLabel="name" placeholder="Select language" class="w-full" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="email2">Price</label>
                            <p-select [options]="languages" [(ngModel)]="selectedLanguage" optionLabel="name" placeholder="Select price tier" class="w-full" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-1/2">
            <div class="card flex flex-col gap-4">
    <div class="font-semibold text-xl">Upload Course Image</div>


    <div class="flex flex-col gap-2">
        <p-fileUpload name="email1" mode="basic" accept="image/*" (onSelect)="onFileSelected($event)" chooseLabel="Choose Image" />
    </div>


    <div *ngIf="previewUrl" class="grid grid-cols-12 gap-2">
    <div class="col-span-12 md:col-span-12 flex justify-center">
        <img [src]="previewUrl" alt="Course Image" class="w-100 rounded-lg shadow-lg border" />
    </div>
</div>
</div>

<div class="card flex flex-col gap-4">
    <div class="font-semibold text-xl">Upload Course Video</div>


    <div class="flex flex-col gap-2">
        <p-fileUpload name="videoUpload" mode="basic" accept="video/*" (onSelect)="onVideoSelected($event)" chooseLabel="Choose Video" />
    </div>


    <div *ngIf="videoUrl" class="grid grid-cols-12 gap-2">
        <div class="col-span-12 flex justify-center">
            <video [src]="videoUrl" controls class="w-100 rounded-lg shadow-lg border"></video>
        </div>
    </div>
</div>

        <!-- <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Inline</div>
                    <div class="flex flex-wrap items-start gap-6">
                        <div class="field">
                            <label for="firstname1" class="sr-only">Firstname</label>
                            <input pInputText id="firstname1" type="text" placeholder="Firstname" />
                        </div>
                        <div class="field">
                            <label for="lastname1" class="sr-only">Lastname</label>
                            <input pInputText id="lastname1" type="text" placeholder="Lastname" />
                        </div>
                        <p-button label="Submit" [fluid]="false"></p-button>
                    </div>
                </div>
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Help Text</div>
                    <div class="flex flex-wrap gap-2">
                        <label for="username">Username</label>
                        <input pInputText id="username" type="text" />
                        <small>Enter your username to reset your password.</small>
                    </div>
                </div> -->
            </div>
        </div>  
    </p-fluid>
            </p-tabpanel>
            <p-tabpanel value="1">
                <!-- test -->
                 <app-curriculum></app-curriculum>
                <!-- test -->

                <!-- <p class="m-0">Nội dung của Tab 2</p> -->
            </p-tabpanel>
            <p-tabpanel value="2">
                <p class="m-0">Nội dung của Tab 2</p>
            </p-tabpanel>
        </p-tabpanels>
    </p-tabs>
</div>
    `,
    styles:[`
    
        `]
})
export class ViewCourseComponent{
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
            reader.onload = (e) => this.videoUrl = e.target?.result as string | ArrayBuffer;
            reader.readAsDataURL(file);
        }
    }
}
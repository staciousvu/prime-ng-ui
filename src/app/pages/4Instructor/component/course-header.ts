import { Component, Input, OnInit } from '@angular/core';
import { HeaderControl } from '../../models/header-control';
import { HeaderControlService } from '../../service/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-course-header',
    standalone: true,
    imports: [CommonModule, FormsModule,RouterLink],
    template: `
        <nav class="bg-[#0F172A] flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
            <div class="flex items-center text-white text-sm font-semibold">
                <button [routerLink]="['/instructor/courses']" aria-label="Back to courses" 
      class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
        class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span class="text-sm font-medium">Back to courses</span>
    </button>
                <span class="ml-10 font-bold text-base">{{ course.title }}</span>
                <span [ngClass]="{
                        'bg-gray-500 text-white': courseStatus === 'DRAFT',
                        'bg-yellow-500 text-white': courseStatus === 'PENDING',
                        'bg-green-500 text-white':courseStatus === 'ACCEPTED',
                        'bg-red-500 text-white':courseStatus === 'REJECTED'
                    }"
                    class="ml-3 rounded px-2 py-[2px] text-xs font-semibold uppercase select-none">
                {{courseStatus }}
                </span>

            </div>

            <div class="flex items-center space-x-4" *ngIf="controls$ | async as controls">
                <ng-container *ngFor="let control of controls">
                    <!-- Button -->
                    <button
        *ngIf="control.type === 'button'"
        (click)="control.action?.()"
        [disabled]="control.disabled"
        class="relative inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        [ngClass]="{
          'bg-blue-600 hover:bg-blue-700 text-white shadow-sm': !control.disabled,
          'bg-slate-500 bg-opacity-50 text-slate-300 cursor-not-allowed': control.disabled
        }">
        {{ control.label }}
      </button>

                </ng-container>

                <!-- Settings Icon -->

            </div>
        </nav>
    `,
    styles: ``
})
export class CourseHeaderComponent implements OnInit {
    @Input() courseId:number=0;
    @Input() courseStatus='';
    course:any;
    controls$!: Observable<HeaderControl[]>;

    constructor(private headerService: HeaderControlService,
        private http:HttpClient
    ) {}

    ngOnInit(): void {
        this.controls$ = this.headerService.controls$;
        this.http.get<any>(`http://localhost:8080/course/basicinfo/${this.courseId}`).subscribe(
            (res)=>{
                this.course=res.data
            }
        )
    }

    onSelectChange(control: HeaderControl, value: any) {
        control.value = value;
        const selectedOption = control.options?.find((o) => o.value === value);
        selectedOption?.onSelect?.();
    }
}

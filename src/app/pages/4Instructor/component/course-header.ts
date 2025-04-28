import { Component, Input, OnInit } from '@angular/core';
import { HeaderControl } from '../../models/header-control';
import { HeaderControlService } from '../../service/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-course-header',
    standalone: true,
    imports: [CommonModule, FormsModule,RouterLink],
    template: `
        <nav class="bg-[#0F172A] flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
            <div class="flex items-center text-white text-sm font-semibold">
                <button [routerLink]="['/instructor/courses']" aria-label="Back to courses" class="flex items-center space-x-2">
                    <i class="fas fa-arrow-left text-white text-xl"></i>
                    <span class="text-base">Back to courses</span>
                </button>
                <span class="ml-10 font-bold text-base">{{ courseName }}</span>
                <span [ngClass]="{
                        'bg-gray-500 text-white': status === 'DRAFT',
                        'bg-yellow-500 text-white': status === 'PENDING',
                        'bg-green-500 text-white':status === 'ACCEPTED',
                        'bg-red-500 text-white':status === 'REJECTED'
                    }"
                    class="ml-3 rounded px-2 py-[2px] text-xs font-semibold uppercase select-none">
                {{status }}
                </span>

            </div>

            <div class="flex items-center space-x-4" *ngIf="controls$ | async as controls">
                <ng-container *ngFor="let control of controls">
                    <!-- Button -->
                    <button
                        *ngIf="control.type === 'button'"
                        class="bg-[#374151] text-white text-sm font-semibold rounded px-4 py-2 
                            active:bg-[#2d3a41] focus:outline-none"
                            [ngClass]="{
                            'bg-[#374151]': !control.disabled,
                            'bg-gray-400 cursor-not-allowed': control.disabled
                        }"

                        (click)="control.action?.()"
                        [disabled]="control.disabled"
                    >
                        {{ control.label }} 
                    </button>

                    <!-- Select -->
                    <select *ngIf="control.type === 'select'" class="bg-[#374151] text-white text-sm rounded px-2 py-1" [ngModel]="control.value" (ngModelChange)="onSelectChange(control, $event)">
                        <option *ngFor="let opt of control.options" [value]="opt.value">{{ opt.label }}</option>
                    </select>
                </ng-container>

                <!-- Settings Icon -->
                <button aria-label="Settings" class="text-[#9CA3AF] hover:text-white">
                    <i class="fas fa-cog"></i>
                </button>
            </div>
        </nav>
    `,
    styles: ``
})
export class CourseHeaderComponent implements OnInit {
    @Input() status:string='';
    @Input() courseName: string = '';
    controls$!: Observable<HeaderControl[]>;

    constructor(private headerService: HeaderControlService) {}

    ngOnInit(): void {
        this.controls$ = this.headerService.controls$;
    }

    onSelectChange(control: HeaderControl, value: any) {
        control.value = value;
        const selectedOption = control.options?.find((o) => o.value === value);
        selectedOption?.onSelect?.();
    }
}

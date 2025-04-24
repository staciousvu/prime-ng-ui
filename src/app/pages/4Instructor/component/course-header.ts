import { Component, Input, OnInit } from '@angular/core';
import { HeaderControl } from '../../models/header-control';
import { HeaderControlService } from '../../service/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-course-header',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <nav class="bg-[#0F172A] flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
            <div class="flex items-center text-white text-sm font-semibold">
                <button aria-label="Back to courses" class="flex items-center space-x-2">
                    <i class="fas fa-arrow-left text-white text-xl"></i>
                    <span class="text-base">Back to courses</span>
                </button>
                <span class="ml-10 font-bold text-base">{{ courseName }}</span>
                <span class="ml-3 bg-[#6B7280] rounded px-2 py-[2px] text-xs font-semibold uppercase select-none">draft</span>
            </div>

            <div class="flex items-center space-x-4" *ngIf="controls$ | async as controls">
                <ng-container *ngFor="let control of controls">
                    <!-- Button -->
                    <button
                        *ngIf="control.type === 'button'"
                        class="bg-[#374151] text-white text-sm font-semibold rounded px-4 py-2 
                            active:bg-[#2d3a41] focus:outline-none"
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

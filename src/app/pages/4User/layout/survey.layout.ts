import { Component } from "@angular/core";

import { SurveyHeaderComponent } from "../component/survey-header";
import { StepOneComponent } from "../stepone";
import { StepTwoComponent } from "../steptwo";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'app-survey-layout',
    standalone:true,
    imports: [SurveyHeaderComponent,StepOneComponent,StepTwoComponent,CommonModule],
    template: `
    <app-survey-header/>
    <app-stepone *ngIf="currentStep === 1" (next)="goToStepTwo()" [prefRootId]="prefRootId" 
    (next)="goToStepTwo()" 
    (prefRootIdChange)="updatePrefRootId($event)"></app-stepone>
    <app-steptwo *ngIf="currentStep === 2" (prev)="goBackToStepOne()"></app-steptwo>

    `,
    styles:``
})
export class SurveyLayoutComponent{
  prefRootId: string | null = null; // Lưu trữ lựa chọn của người dùng
    currentStep:number =1;
    goToStepTwo() {
        this.currentStep = 2;
      }
    
      goBackToStepOne() {
        this.currentStep = 1;
      }
      updatePrefRootId(newId: string | null) { // Chấp nhận string | null
        this.prefRootId = newId;
    }
}
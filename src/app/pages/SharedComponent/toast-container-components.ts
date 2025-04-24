import { Component, OnInit } from "@angular/core";
import { ToastService } from "../service/toast.service";
import { ToastNotificationComponent } from "./toast-component";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { Toast } from "../models/toast";

@Component({
    selector: 'app-toast-container',
    standalone: true,
    imports: [ToastNotificationComponent, CommonModule],
    template: `
      <div class="notifications">
        <app-toast-notification *ngFor="let toast of toasts$ | async" [toast]="toast" (onClose)="removeToast(toast.id)"></app-toast-notification>
      </div>
    `,
    styles: [`
      .notifications {
        position: fixed;
        top: 30px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
      }
    `]
  })
  export class ToastContainerComponent {
    toasts$!: Observable<Toast[]>; // Khai báo với non-null assertion
  
    constructor(private toastService: ToastService) {
      this.toasts$ = this.toastService.toasts$; // Gán trong constructor
    }
  
    removeToast(id: number) {
      this.toastService.removeToast(id);
    }
  }
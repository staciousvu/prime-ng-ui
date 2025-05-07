import { Component, OnInit } from "@angular/core";
import { ToastService } from "../service/toast.service";
import { ToastNotificationComponent } from "./toast-component";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { Notification, Toast } from "../models/toast";
import { NotificationService } from "../service/notification.service";
import { OnlyNotificationComponent } from "./only-notification";

@Component({
    selector: 'app-only-notification-container',
    standalone: true,
    imports: [OnlyNotificationComponent, CommonModule],
    template: `
      <div class="notifications">
      <app-only-notification
  *ngFor="let notification of notifications$ | async"
  [notification]="notification"
  (onClose)="removeToast(notification.id)">
</app-only-notification>

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
  export class OnlyNotificationContainerComponent {
    notifications$!: Observable<Notification[]>; // Khai báo với non-null assertion
  
    constructor(private notificationService: NotificationService) {
      this.notifications$ = this.notificationService.notifications$; // Gán trong constructor
    }
  
    removeToast(id: number) {
      this.notificationService.removeNotification(id);
    }
  }
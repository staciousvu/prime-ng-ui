import { Component, OnInit, ViewChild } from "@angular/core";
import { NavBarComponent } from "../component/navbar";
import { HomeComponent } from "../home";
import { RouterOutlet } from "@angular/router";
import { BannerNotificationComponent } from "../component/banner-notification";
import { OnlyNotificationContainerComponent } from "../../SharedComponent/only-notification-container";
import { ToastContainerComponent } from "../../SharedComponent/toast-container-components";
import { ChatService } from "../../service/chat.service";
import { NotificationService } from "../../service/notification.service";


@Component({
    selector: 'app-user-layout',
    standalone:true,
    imports: [NavBarComponent,RouterOutlet,BannerNotificationComponent,OnlyNotificationContainerComponent,ToastContainerComponent],
    template: `
    
    <app-only-notification-container/>
    <app-toast-container></app-toast-container>
    <app-banner-notification/>
    <app-navbar-home/>
    <router-outlet/>
    `,
    styles:``
})
export class AppUserLayout implements OnInit{
    @ViewChild(NavBarComponent) navbarComponent!: NavBarComponent;
    constructor(private chatService: ChatService,
        private notificationService:NotificationService
    ) {}

ngOnInit(): void {
  this.chatService.connect(); // đảm bảo kết nối WebSocket
  // Đợi khi kết nối thành công mới subcribe
  this.chatService.onConnected().subscribe((isConnected) => {
    if (isConnected) {
      console.log('🟢 WebSocket connected — subscribing to notifications');
      this.chatService.subscribeToNotification((message) => {
        console.log('🔔 Notification received via WebSocket:', message);
        this.notificationService.addNotification(
          'https://static.vecteezy.com/system/resources/previews/015/145/649/original/man-with-the-inscription-admin-icon-color-outline-vector.jpg',
          message.title,
          message.message
        );
        this.navbarComponent.loadNotifications()
      });
    }
  });
}

}
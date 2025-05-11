import { Component, OnInit, ViewChild } from "@angular/core";
import { NavBarComponent } from "../component/navbar";
import { HomeComponent } from "../home";
import { RouterLink, RouterOutlet } from "@angular/router";
import { BannerNotificationComponent } from "../component/banner-notification";
import { OnlyNotificationContainerComponent } from "../../SharedComponent/only-notification-container";
import { ToastContainerComponent } from "../../SharedComponent/toast-container-components";
import { ChatService } from "../../service/chat.service";
import { NotificationService } from "../../service/notification.service";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../service/auth.service";


@Component({
    selector: 'app-user-layout',
    standalone:true,
    imports: [RouterLink,CommonModule,NavBarComponent,RouterOutlet,BannerNotificationComponent,OnlyNotificationContainerComponent,ToastContainerComponent],
    template: `
    
    <app-only-notification-container/>
    <app-toast-container></app-toast-container>
    <div class="hidden md:block">
    <app-banner-notification/>
    </div>
    <!-- Navbar cho desktop -->
<div class="hidden md:block">
  <app-navbar-home></app-navbar-home>
</div>

<!-- Navbar mobile: chỉ hiện icon 3 gạch -->
<div class="md:hidden fixed top-4 right-4 z-50">
  <button (click)="toggleMobileMenu()" class="text-gray-700 focus:outline-none">
    <!-- Icon hamburger -->
    <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</div>
<!-- Mobile menu (nếu mở) -->
<div *ngIf="showMobileMenu" class="md:hidden fixed top-16 right-4 bg-white shadow-lg p-4 rounded-xl z-50 w-64">
  <ul class="space-y-3">
    <li class="border-b pb-2">
      <a routerLink="/instructor/profiles/basic-information" class="block text-gray-800 hover:text-blue-600 font-medium">Profile</a>
    </li>
    <li class="border-b pb-2">
      <a routerLink="/my-learning" class="block text-gray-800 hover:text-blue-600 font-medium">My Learning</a>
    </li>
    <li class="border-b pb-2">
      <a routerLink="/favorite" class="block text-gray-800 hover:text-blue-600 font-medium">Favorite</a>
    </li>
    <li class="border-b pb-2">
      <a routerLink="/cart" class="block text-gray-800 hover:text-blue-600 font-medium">My Cart</a>
    </li>
    <li class="border-b pb-2">
      <a routerLink="/message" class="block text-gray-800 hover:text-blue-600 font-medium">Message</a>
    </li>
    <li class="border-b pb-2">
      <a href="#" class="block text-gray-800 hover:text-blue-600 font-medium">Settings</a>
    </li>
    <li>
      <button (click)="logout()" class="w-full text-left text-red-600 hover:text-red-800 font-medium">Logout</button>
    </li>
  </ul>
</div>


    
    <router-outlet/>
    `,
    styles:``
})
export class AppUserLayout implements OnInit{
  showMobileMenu = false;

toggleMobileMenu() {
  this.showMobileMenu = !this.showMobileMenu;
}

    @ViewChild(NavBarComponent) navbarComponent!: NavBarComponent;
    constructor(private chatService: ChatService,
        private notificationService:NotificationService,
        private authService:AuthService
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
logout() {
        console.log('Logout clicked in AppTopbar!');

        this.authService.logout();
        // this.router.navigate(['/home']);
    }

}
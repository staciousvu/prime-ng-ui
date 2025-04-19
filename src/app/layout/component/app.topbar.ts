import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { BadgeModule } from 'primeng/badge';
import { AuthService } from '../../pages/service/auth.service';
@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, BadgeModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/admin">
                <div class="logo">
      <a href="#">Edu<span>Flow</span></a>
    </div>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                    <i class="pi pi-bell"></i>
                        <span>Notifications</span>
                    </button>
                    <button type="button" class="layout-topbar-action" (click)="toggleDropdown()">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
      <!-- Dropdown Menu -->
      <div *ngIf="isOpen"
        class="absolute right-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
        <ul class="py-2 text-gray-700">
          <li>
            <a routerLink="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
          </li>
          <li>
            <button (click)="logout()"  class="w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
          </li>
        </ul>
      </div>
                </div>
            </div>
        </div>
    </div>`
    , styles: `  .logo a {
        font-size: 30px;
        font-weight: bold;
        font-family: 'Poppins', sans-serif;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        background: linear-gradient(45deg, #ff6600, #ffcc00);
        -webkit-background-clip: text;
        color: transparent;
        display: inline-block;
    }
    
    .logo a span {
        color: #007bff; 
    }
    
    .notification-icon-container {
        position: relative;
        display: inline-block;
    }
    
    .notification-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: #ff0000;
        color: white;
        border-radius: 50%;
        padding: 0 5px;
        font-size: 12px;
        min-width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
    }`
})
export class AppTopbar {
    logout() {
        console.log("Logout clicked in AppTopbar!");
        
        this.auth.logout();
        window.location.href = '/auth/admin/login'; 
    }
    isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
    items!: MenuItem[];

    constructor(public layoutService: LayoutService,private auth:AuthService) { }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}

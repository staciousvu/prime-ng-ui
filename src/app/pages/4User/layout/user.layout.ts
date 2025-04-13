import { Component } from "@angular/core";
import { NavBarComponent } from "../component/navbar";
import { HomeComponent } from "../home";
import { RouterOutlet } from "@angular/router";
import { BannerNotificationComponent } from "../component/banner-notification";


@Component({
    selector: 'app-user-layout',
    standalone:true,
    imports: [NavBarComponent,RouterOutlet,BannerNotificationComponent],
    template: `
    <app-banner-notification/>
    <app-navbar-home/>
    <router-outlet/>
    `,
    styles:``
})
export class AppUserLayout{

}
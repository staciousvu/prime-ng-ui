import { Component } from "@angular/core";
import { NavBarComponent } from "../component/navbar";
import { HomeComponent } from "../home";
import { RouterOutlet } from "@angular/router";


@Component({
    selector: 'app-user-layout',
    standalone:true,
    imports: [NavBarComponent,RouterOutlet],
    template: `
    <app-navbar-home/>
    <router-outlet/>
    `,
    styles:``
})
export class AppUserLayout{

}
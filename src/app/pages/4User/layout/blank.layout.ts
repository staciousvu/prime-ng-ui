import { Component } from "@angular/core";
import { NavBarComponent } from "../component/navbar";
import { HomeComponent } from "../home";
import { RouterOutlet } from "@angular/router";


@Component({
    selector: 'app-blank-layout',
    standalone:true,
    imports: [RouterOutlet],
    template: `
    <router-outlet/>
    `,
    styles:``
})
export class BlankLayoutComponent{

}
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastContainerComponent } from './app/pages/SharedComponent/toast-container-components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule,ToastContainerComponent],
    template: `
    <app-toast-container></app-toast-container>
    <router-outlet></router-outlet>
    `
})
export class AppComponent {}

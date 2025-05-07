import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastContainerComponent } from './app/pages/SharedComponent/toast-container-components';
import { OnlyNotificationContainerComponent } from './app/pages/SharedComponent/only-notification-container';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `
    
    <router-outlet></router-outlet>
    `
})
export class AppComponent {}

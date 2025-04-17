import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-performance-review',
    standalone: true,
    imports:[RouterModule],
    template: `
        <p>performance review</p>
    `,
    styles: ``
})
export class PerformanceReviewComponent {}

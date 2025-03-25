import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { BreadcrumpComponent } from "./breadcrump";
import { TabsModule } from "primeng/tabs";
import { FluidModule } from "primeng/fluid";
import { SelectModule } from "primeng/select";

@Component({
    selector:'app-approve',
    standalone: true,
    imports: [SelectModule,FluidModule,TabsModule,RouterLink, BreadcrumpComponent],
    template: `
    <app-breadcrump [apr]="'Approve course'" [manager]="'Manage course'"></app-breadcrump>
    <div class="font-semibold text-xl mb-4">Approve Course</div>
    <div class="card">
    <p-tabs value="0">
        <p-tablist>
            <p-tab value="0">Course information</p-tab>
            <p-tab value="1">Curriculum</p-tab>
            <p-tab value="2">Intended learner</p-tab>
        </p-tablist>
        <p-tabpanels>
            <p-tabpanel value="0">
            <p class="m-0">Nội dung của Tab 1</p>
            </p-tabpanel>
            <p-tabpanel value="1">
                <!-- test -->
                <!-- test -->

                <p class="m-0">Nội dung của Tab 2</p>
            </p-tabpanel>
            <p-tabpanel value="2">
                <p class="m-0">Nội dung của Tab 3</p>
            </p-tabpanel>
        </p-tabpanels>
    </p-tabs>
</div>
    `,
    styles: [`
        
    `]
})
export class ApproveCourseComponent {
}
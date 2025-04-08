import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuItem } from "primeng/api";
import { BreadcrumbModule } from "primeng/breadcrumb";

@Component({
    selector:'app-breadcrump',
    standalone:true,
    imports:[BreadcrumbModule,RouterModule,CommonModule],
    template: `
    <div class="breadcrumb-container">
        <nav class="breadcrumb">
            <a [routerLink]="['/']" class="breadcrumb-item">
                <i class="pi pi-home"></i>
            </a>
            <span class="separator">/</span>
            <a [routerLink]="['/admin/courses/list']" class="breadcrumb-item">{{manager}}</a>
            <span class="separator">/</span>
            <span class="breadcrumb-item active">{{apr}}</span>
        </nav>
    </div>
    `,
    styles: [`
        .breadcrumb-container {
            padding: 8px 0;
            margin-bottom: 1rem;
        }
        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.875rem;
        }
        .breadcrumb-item {
            color: #6c757d;
            text-decoration: none;
            display: flex;
            align-items: center;
        }
        .breadcrumb-item:hover {
            color: #495057;
            text-decoration: underline;
        }
        .breadcrumb-item.active {
            color: #495057;
            font-weight: 500;
        }
        .separator {
            color: #6c757d;
            font-size: 0.875rem;
        }
        i {
            font-size: 0.875rem;
        }
    `]
})
export class BreadcrumpComponent{
    @Input () manager!: string;
    @Input () apr!:string;
}
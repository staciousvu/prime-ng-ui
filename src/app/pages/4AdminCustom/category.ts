import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product, ProductService } from '../service/product.service';
import { Customer, CustomerService } from '../service/customer.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { CourseService } from '../service/course.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { SpeedDial } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { Toolbar, ToolbarModule } from 'primeng/toolbar';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { Select, SelectModule } from 'primeng/select';
import { Router, RouterModule } from '@angular/router';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumpComponent } from './breadcrump';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TreeTableModule } from 'primeng/treetable';
import { NodeService } from '../service/node.service';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../service/toast.service';

interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    SelectModule,
    ToastModule,
    TreeTableModule,
    ContextMenuModule,
    TreeModule,
    BreadcrumpComponent,
    RouterModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    ButtonModule,
    TableModule,
    CommonModule,
    BadgeModule,
    RatingModule,
    FormsModule,
    TagModule
  ],
  template: `
        <app-breadcrump [apr]="'List category'" [manager]="'Manage course'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">Quản lí danh mục</div>

        <div class="container">
            <!-- Action buttons -->
            <div class="flex space-x-3 mb-4">
                <button class="btn-action" (click)="openDialogRoot()">
                    <svg class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Danh mục gốc
                </button>

                <button class="btn-action" (click)="openDialogSub()">
                    <svg class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Danh mục con
                </button>

                <button class="btn-action" (click)="openDialogTopic()">
                    <svg class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Chủ đề
                </button>
            </div>

            <!-- Main Layout -->
            <div class="main-layout">
                <!-- Tree Table -->
                <div class="tree-table-container">
                    <div class="card">
                        <p-treetable [value]="files" [columns]="cols" [loading]="loading" [scrollable]="true">
                            <ng-template pTemplate="caption">
                                <div class="flex justify-end items-center">
                                    <p-iconfield>
                                        <p-inputicon class="pi pi-search"></p-inputicon>
                                        <input type="text" pInputText placeholder="Tìm kiếm danh mục..." />
                                    </p-iconfield>
                                </div>
                            </ng-template>

                            <ng-template pTemplate="header" let-columns>
                                <tr>
                                    <th *ngFor="let col of columns">{{ col.header }}</th>
                                </tr>
                            </ng-template>

                            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                                <tr [ttRow]="rowNode">
                                    <td *ngFor="let col of columns; let i = index; let last = last">
                                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                                        {{ rowData[col.field] }}
                                        <ng-container *ngIf="last">
                                            <p-button icon="pi pi-pencil" rounded="true" (click)="openDialogEdit(rowData.name,rowData.id)"></p-button>
                                            <p-button icon="pi pi-trash" rounded="true" severity="danger" (click)="deleteCategory(rowData.id)"></p-button>
                                        </ng-container>
                                    </td>
                                </tr>
                            </ng-template>

                            <ng-template pTemplate="summary">
                                <div style="text-align:left">
                                    <p-button icon="pi pi-refresh" label="Reload" severity="warn" (click)="refresh()"></p-button>
                                </div>
                            </ng-template>
                        </p-treetable>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div class="other-elements">
                    <div class="summary-card bg-green-100 border-green-500 text-green-800">
                        <p class="summary-text">
                            <svg class="summary-icon text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Có 100 danh mục gốc
                        </p>
                    </div>

                    <div class="summary-card bg-yellow-100 border-yellow-500 text-yellow-800">
                        <p class="summary-text">
                            <svg class="summary-icon text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 100-20 10 10 0 000 20z" />
                            </svg>
                            Có 200 danh mục con
                        </p>
                    </div>

                    <div class="summary-card bg-blue-100 border-blue-500 text-blue-800">
                        <p class="summary-text">
                            <svg class="summary-icon text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16l4-4 4 4M16 12l-4-4-4 4M4 12a8 8 0 1016 0 8 8 0 00-16 0z" />
                            </svg>
                            Có 300 topic chính
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <p-dialog header="Tạo danh mục gốc" [modal]="true" [(visible)]="visibleAddRoot" [style]="{ width: '25rem' }">
            <div class="flex flex-col gap-2 mb-4">
                <label for="rootCategory">Root Category</label>
                <input pInputText id="rootCategory" type="text" [(ngModel)]="newRootCategoryName"/>
            </div>

            <div class="flex justify-end gap-2">
                <p-button label="Cancel" severity="secondary" (click)="cancelAddRoot()" />
                <p-button label="Save" (click)="saveAddRoot()" />
            </div>
        </p-dialog>
        <p-dialog header="Tạo danh mục con" [modal]="true" [(visible)]="visibleAddSub" [style]="{ width: '25rem' }">
        <div class="flex flex-col gap-2 mb-4">
            <label for="rootCategory">Chọn danh mục gốc </label>
            <p-select [appendTo]="'body'" [options]="rootCategories" [(ngModel)]="selectedRoot" optionLabel="name" placeholder="Select root category" class="w-full" />
        </div>
            <div class="flex flex-col gap-2 mb-4">
                <label for="rootCategory">Nhập tên danh mục con </label>
                <input pInputText id="rootCategory" type="text" [(ngModel)]="newSubCategoryName"/>
            </div>

            <div class="flex justify-end gap-2">
                <p-button label="Cancel" severity="secondary" (click)="cancelAddSub()" />
                <p-button label="Save" (click)="saveAddSub()" />
            </div>
        </p-dialog>
        <!--  -->
        <p-dialog header="Tạo chủ đề" [modal]="true" [(visible)]="visibleAddTopic" [style]="{ width: '25rem' }">
        <div class="flex flex-col gap-2 mb-4">
            <label for="rootCategory">Chọn danh mục gốc </label>
            <p-select [appendTo]="'body'" [options]="rootCategoriesTopic" [(ngModel)]="selectedRootTopic" (ngModelChange)="onRootChange()" optionLabel="name" placeholder="Select root category" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 mb-4">
            <label for="rootCategory">Chọn danh mục con </label>
            <p-select [appendTo]="'body'" [options]="subCategories" [(ngModel)]="selectedSub" optionLabel="name" placeholder="Select sub category" class="w-full" />
        </div>
        
            <div class="flex flex-col gap-2 mb-4">
                <label for="rootCategory">Nhập tên chủ đề </label>
                <input pInputText id="rootCategory" type="text" [(ngModel)]="newTopicCategoryName"/>
            </div>

            <div class="flex justify-end gap-2">
                <p-button label="Cancel" severity="secondary" (click)="cancelAddTopic()" />
                <p-button label="Save" (click)="saveAddTopic()" />
            </div>
        </p-dialog>
        <!-- edit category -->
        <p-dialog header="Cập nhật danh mục" [modal]="true" [(visible)]="visibleEditCategory" [style]="{ width: '25rem' }">
            <div class="flex flex-col gap-2 mb-4">
                <label for="rootCategory">Tên danh mục</label>
                <input pInputText id="rootCategory" type="text" [(ngModel)]="newCategoryName"/>
            </div>

            <div class="flex justify-end gap-2">
                <p-button label="Cancel" severity="secondary" (click)="cancelEditCategory()" />
                <p-button label="Save" (click)="saveEditCategory()" />
            </div>
        </p-dialog>
         <!-- edit category -->

        <p-toast></p-toast>
    `,
  styles: `
        .container {
            padding: 20px;
        }

        .main-layout {
            display: flex;
            gap: 20px;
        }

        .tree-table-container {
            width: 70%;
        }

        .card {
            border: 1px solid #ddd;
            padding: 10px;
            background: #fff;
        }

        .other-elements {
            width: 50%;
            padding: 20px;
        }

        .btn-action {
            background-color: #e5e7eb;
            color: #374151;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .btn-action:hover {
            background-color: #d1d5db;
        }

        .icon {
            width: 20px;
            height: 20px;
        }

        .summary-card {
            border-left-width: 4px;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .summary-text {
            font-weight: 700;
            font-size: 18px;
            display: flex;
            align-items: center;
        }

        .summary-icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }
    `,
  providers: [ConfirmationService, NodeService, MessageService]
})
export class CategoryComponent implements OnInit {
  // addroot
  newRootCategoryName: string | undefined;
  visibleAddRoot = false;
  cancelAddRoot() {
    this.visibleAddRoot = false;
  }
  saveAddRoot() {
    const request = {
      name: this.newRootCategoryName,
      parentId: null
    };
    this.http.post<any>(`http://localhost:8080/categories/add-category`, request).subscribe((res) => {
      this.visibleAddRoot = false;
      this.getCategories();
      this.loadRootCategories();
      this.toastService.addToast("success","Thêm danh mục gốc thành công")
    });
  }
  openDialogRoot() {
    this.visibleAddRoot = true;
  }
  // addroot
  // addsub
  selectedRoot: any = null;
  rootCategories:any[]=[];
  visibleAddSub = false;
  newSubCategoryName:string | undefined;
  openDialogSub() {
    this.visibleAddSub = true;
  }
  cancelAddSub() {
    this.visibleAddSub = false;
    this.newSubCategoryName =undefined;
    this.selectedRoot =null;
  }
  saveAddSub(){
    const request = {
      name: this.newSubCategoryName,
      parentId: this.selectedRoot.id
    };
    this.http.post<any>(`http://localhost:8080/categories/add-category`, request).subscribe((res) => {
      this.visibleAddSub = false;
      this.newSubCategoryName =undefined;
      this.selectedRoot =null;
      this.getCategories();
      this.toastService.addToast("success","Thêm danh mục con thành công")
    });
  }

  // addsub
  // add topic
  selectedRootTopic: any = null;
  rootCategoriesTopic:any[]=[];
  selectedSub: any = null;
  subCategories:any[]=[];
  visibleAddTopic = false;
  newTopicCategoryName:string | undefined;
  
  openDialogTopic() {
    this.visibleAddTopic = true;
  }
  cancelAddTopic(){
    this.visibleAddTopic = false;
    this.newTopicCategoryName =undefined;
    this.selectedRootTopic =null;
    this.selectedSub =null;
  }
  saveAddTopic(){
    const request = {
      name: this.newTopicCategoryName,
      parentId: this.selectedSub.id
    };
    this.http.post<any>(`http://localhost:8080/categories/add-category`, request).subscribe((res) => {
      this.visibleAddTopic = false;
      this.newTopicCategoryName =undefined;
      this.selectedRootTopic =null;
      this.selectedSub=null;
      this.getCategories();
      this.toastService.addToast("success","Thêm chủ đề thành công")
    });
  }
  onRootChange(){
    
    if(this.selectedRootTopic.id){
      console.log('hello')
      this.loadSubcategories(this.selectedRootTopic.id)
    }
  }
  loadSubcategories(rootId: number, preSelectedSub?: number) {
    this.http.get<any>(`http://localhost:8080/categories/subcategories?parentId=${rootId}`).subscribe((res) => {
        this.subCategories = res.data;
    });
}
  // add topic
  // edit category
  visibleEditCategory = false;
  newCategoryName : string | undefined ;
  editCategorySelected:any;
  openDialogEdit(name:any,id:any){
    this.visibleEditCategory = true;
    this.newCategoryName = name;
    this.editCategorySelected = id;
  }
  cancelEditCategory(){
    this.visibleEditCategory = false;
    this.newCategoryName = undefined;
  }
  saveEditCategory(){
    const request = {
      name: this.newCategoryName,
    }
    this.http.put<any>(`http://localhost:8080/categories/${this.editCategorySelected}`, request).subscribe(
      (res) => {
        this.visibleEditCategory = false;
        this.newCategoryName = undefined;
        this.editCategorySelected = null;
        this.toastService.addToast("success","Sửa danh mục thành công")
      },
      (error) => {
        console.error('Error updating category:', error);
        this.toastService.addToast("error","Sửa danh mục thất bại")
      }
    );
  }
  // edit category
// delete ca
   deleteCategory(id:number){
    this.http.delete<any>(`http://localhost:8080/categories/${id}`).subscribe(
      (res) =>{
        this.getCategories();
        this.toastService.addToast("success","Xóa danh mục thành công")
      },
      (error) =>{
        console.error('Error deleting category:', error);
        this.toastService.addToast("error","Không thể xóa danh mục")
      }
    )
   }
// delete ca

  showAccept() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thêm danh mục thành công!' });
  }
  showEditsuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sửa danh mục thành công!' });
  }
  showEditfailed() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sửa danh mục thất bại!' });
  }
  showDeletedsuccess(){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa danh mục thành công!' });
  }
  showDeletedFailed(){
    this.messageService.add({ severity: 'warn', summary: 'Failed', detail: 'Xóa danh mục thất bại!' });
  }

  files: TreeNode[] = [];
  cols: any[] = [];
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private toastService:ToastService
  ) { }

  refresh() {
    this.getCategories()
  }
  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Tên danh mục' },
      { field: '', header: 'Thao tác' }
    ];

    this.getCategories();
    this.loadRootCategories()
  }
  loadRootCategories() {
    this.http.get<any>('http://localhost:8080/categories/root').subscribe((res) => {
        this.rootCategories = res.data;
        this.rootCategoriesTopic = res.data;
    });
}

  getCategories(): void {
    this.loading = true;
    this.http.get<any>('http://localhost:8080/categories').subscribe({
      next: (response) => {
        if (response.success) {
          this.files = this.convertToTreeNodes(response.data);
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  convertToTreeNodes(categories: any[]): TreeNode[] {
    return categories.map((category) => ({
      key: category.id.toString(),
      data: {
        id: category.id,
        name: category.name
      },
      children: category.subCategories ? this.convertToTreeNodes(category.subCategories) : []
    }));
  }
}


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
import { Select } from 'primeng/select';
import { Router, RouterModule } from '@angular/router';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseData } from '../service/data.service';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumpComponent } from './breadcrump';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TreeTableModule } from 'primeng/treetable';
import { NodeService } from '../service/node.service';

  interface Column {
    field: string;
    header: string;
}
@Component({
    selector: 'app-category',
    standalone: true,
    imports: [TreeTableModule, ContextMenuModule, TreeModule, BreadcrumpComponent, RouterModule, DialogModule, ConfirmDialogModule, InputTextModule,
    InputIconModule, IconFieldModule, ButtonModule, TableModule, CommonModule, BadgeModule, RatingModule, FormsModule, TagModule],
    template: `
    <app-breadcrump [apr]="'List category'" [manager]="'Manage course'"></app-breadcrump>

<div class="font-semibold text-xl mb-4">List category</div>
<div class="container">
<div class="flex space-x-3 mb-4">
    <!-- Nút Add Root Category -->
<button class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow flex items-center">
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    Add Root Category
</button>

<!-- Nút Add Sub Category -->
<button class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow flex items-center">
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    Add Sub Category
</button>

<!-- Nút Add Topic -->
<button class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow flex items-center">
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    Add Topic
</button>

</div>


  <!-- Layout chính -->
  <div class="main-layout">
    <!-- TreeTable -->
    <div class="tree-table-container">
      <div class="card">
        <p-treetable #ok [value]="files" [columns]="cols" [scrollable]="true" [filterMode]="filterMode">
        <ng-template #caption>
            <div class="flex justify-end items-center">
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input type="text" pInputText placeholder="Global Search" />
                </p-iconfield>  
            </div>
        </ng-template>
          <ng-template pTemplate="header" let-columns>
            <tr>
              <th *ngFor="let col of columns">
                {{ col.header }}
              </th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode">
              <td *ngFor="let col of columns; let i = index; let last = last">
                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
                <ng-container *ngIf="last">
                  <p-button icon="pi pi-pencil" rounded="true" [style]="{ 'margin-right': '.5em' }" />
                  <p-button icon="pi pi-trash" rounded="true" severity="danger" />
                </ng-container>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="summary">
            <div style="text-align:left">
              <p-button icon="pi pi-refresh" label="Reload" severity="warn" />
            </div>
          </ng-template>
        </p-treetable>
      </div>
    </div>

    <!-- Không gian cho các yếu tố khác -->
    <div class="other-elements">
    <div class="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg shadow-md mb-4">
    <p class="font-bold text-xl flex items-center">
        <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
        Có 100 danh mục gốc
    </p>
</div>
<div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-md mb-4">
    <p class="font-bold text-xl flex items-center">
        <svg class="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 100-20 10 10 0 000 20z"/>
        </svg>
        Có 200 danh mục con
    </p>
</div>
<div class="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 rounded-lg shadow-md mb-4">
    <p class="font-bold text-xl flex items-center">
        <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16l4-4 4 4M16 12l-4-4-4 4M4 12a8 8 0 1016 0 8 8 0 00-16 0z"/>
        </svg>
        Có 300 topic chính
    </p>
</div>
    </div>
  </div>
</div>
    `,
    styles:`
    .container {
  padding: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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
  // border: 1px solid #ddd;
  // background: #f9f9f9;
}
    `,
    providers:[ConfirmationService,NodeService]
})
export class CategoryComponent implements OnInit{
  filterMode = 'strict';
  searchValue: string = '';
  files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: '', header: '' }
        ];
    }
}




// import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { ConfirmationService, MenuItem, MessageService, TreeNode } from 'primeng/api';
// import { Table } from 'primeng/table';
// import { Product, ProductService } from '../service/product.service';
// import { Customer, CustomerService } from '../service/customer.service';
// import { TableModule } from 'primeng/table';
// import { CommonModule } from '@angular/common';
// import { BadgeModule } from 'primeng/badge';
// import { CourseService } from '../service/course.service';
// import { RatingModule } from 'primeng/rating';
// import { FormsModule } from '@angular/forms';
// import { TagModule } from 'primeng/tag';
// import { SpeedDial } from 'primeng/speeddial';
// import { ButtonModule } from 'primeng/button';
// import { Toolbar, ToolbarModule } from 'primeng/toolbar';
// import { InputGroup } from 'primeng/inputgroup';
// import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
// import { IconField, IconFieldModule } from 'primeng/iconfield';
// import { InputIcon, InputIconModule } from 'primeng/inputicon';
// import { Select } from 'primeng/select';
// import { Router, RouterModule } from '@angular/router';
// import { Dialog, DialogModule } from 'primeng/dialog';
// import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
// import { CourseData } from '../service/data.service';
// import { InputTextModule } from 'primeng/inputtext';
// import { BreadcrumpComponent } from './breadcrump';
// import { TreeModule } from 'primeng/tree';
// import { ContextMenuModule } from 'primeng/contextmenu';
// interface Category {
//     id: number;
//     name: string;
//     description?: string;
//     isActive: boolean;
//     createdAt: Date;
//     createdBy?: string;
//     updatedAt?: Date;
//     updatedBy?: string;
//     parentId?: number;
//   }
// @Component({
//     selector: 'app-category',
//     standalone: true,
//     imports: [ContextMenuModule,TreeModule,BreadcrumpComponent,Select, RouterModule, Dialog,DialogModule,ConfirmDialogModule,InputTextModule,
//       InputIconModule, IconFieldModule, Toolbar, ButtonModule, TableModule, CommonModule, BadgeModule, RatingModule, FormsModule, TagModule, SpeedDial],
//     template: `
//     <app-breadcrump [apr]="'List category'" [manager]="'Manage course'"></app-breadcrump>

// <div class="font-semibold text-xl mb-4">List category</div>
//     <div class="container">
//   <!-- Thanh tìm kiếm -->
//   <div class="search-bar">
//     <input pInputText type="text" placeholder="Tìm kiếm danh mục" />
//     <button pButton label="Thêm Danh Mục Gốc" icon="pi pi-plus" (click)="openDialog()"></button>
//   </div>

//   <!-- Layout chính -->
//   <div class="main-layout">
//     <!-- Cây danh mục -->
//     <div class="tree-container">
//       <p-tree [value]="categories" [filter]="true" (onNodeSelect)="selectedCategory = $event.node"
//               (onNodeContextMenuSelect)="onNodeContextMenuSelect($event)" [contextMenu]="cm">
//       </p-tree>
//       <p-contextMenu #cm [model]="contextMenuItems"></p-contextMenu>
//     </div>

//     <!-- Bảng điều khiển chi tiết -->
//     <div class="detail-panel" *ngIf="selectedCategory">
//       <h3>Chi Tiết Danh Mục</h3>
//       <p><strong>Tên:</strong> {{ selectedCategory.data.name }}</p>
//       <p><strong>Mô tả:</strong> {{ selectedCategory.data.description || 'Không có' }}</p>
//       <p><strong>Trạng thái:</strong> {{ selectedCategory.data.isActive ? 'Có' : 'Không' }}</p>
//       <p><strong>Ngày tạo:</strong> {{ selectedCategory.data.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
//       <p><strong>Người tạo:</strong> {{ selectedCategory.data.createdBy || 'Không rõ' }}</p>
//       <p><strong>Ngày cập nhật:</strong> {{ selectedCategory.data.updatedAt ? (selectedCategory.data.updatedAt | date:'dd/MM/yyyy HH:mm') : 'Chưa cập nhật' }}</p>
//       <p><strong>Người cập nhật:</strong> {{ selectedCategory.data.updatedBy || 'Không rõ' }}</p>
//       <button pButton label="Chỉnh Sửa" icon="pi pi-pencil"></button>
//       <button pButton label="Xóa" icon="pi pi-trash" class="p-button-danger"></button>
//     </div>
//   </div>

//   <!-- Hộp thoại thêm/chỉnh sửa -->
//   <p-dialog header="{{ isEditMode ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục' }}" [(visible)]="displayDialog" [modal]="true" [style]="{width: '30vw'}">
//     <div class="form-group">
//       <label for="name">Tên</label>
//       <input pInputText id="name" [(ngModel)]="newCategory.name" required />
//     </div>
//     <div class="form-group">
//       <label for="description">Mô tả</label>
//       <input pInputText id="description" [(ngModel)]="newCategory.description" />
//     </div>
//     <div class="form-group">
//       <label>Trạng thái hoạt động</label>
//       <p-toggleButton [(ngModel)]="newCategory.isActive" onLabel="Có" offLabel="Không"></p-toggleButton>
//     </div>
//     <ng-template pTemplate="footer">
//       <button pButton label="Hủy" icon="pi pi-times" class="p-button-secondary" (click)="displayDialog = false"></button>
//       <button pButton label="Lưu" icon="pi pi-check" [disabled]="!newCategory.name"></button>
//     </ng-template>
//   </p-dialog>
// </div>
//     `,
//     styles:`
//     .container {
//   padding: 20px;
// }

// .search-bar {
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
// }

// .main-layout {
//   display: flex;
//   gap: 20px;
// }

// .tree-container {
//   width: 50%;
//   border: 1px solid #ddd;
//   padding: 10px;
//   background: #f9f9f9;
// }

// .detail-panel {
//   width: 50%;
//   padding: 20px;
//   border: 1px solid #ddd;
//   background: #fff;
// }

// .detail-panel button {
//   margin-right: 10px;
// }

// .form-group {
//   margin-bottom: 15px;
// }

// .form-group label {
//   display: block;
//   margin-bottom: 5px;
// }
//     `,
//     providers:[ConfirmationService]
// })
// export class CategoryComponent{
//   categories: TreeNode[] = [
//     {
//       label: 'Danh Mục Gốc 1',
//       icon: 'pi pi-folder',
//       data: {
//         id: 1,
//         name: 'Danh Mục Gốc 1',
//         description: 'Danh mục gốc đầu tiên',
//         isActive: true,
//         createdAt: new Date(),
//         createdBy: 'Admin'
//       },
//       children: [
//         {
//           label: 'Danh Mục Con 1',
//           icon: 'pi pi-folder-open',
//           data: {
//             id: 2,
//             name: 'Danh Mục Con 1',
//             description: 'Danh mục con của DMG 1',
//             isActive: true,
//             createdAt: new Date(),
//             createdBy: 'Admin'
//           },
//           children: [
//             {
//               label: 'Chủ Đề 1',
//               icon: 'pi pi-file',
//               data: {
//                 id: 3,
//                 name: 'Chủ Đề 1',
//                 description: 'Chủ đề thuộc DMC 1',
//                 isActive: true,
//                 createdAt: new Date(),
//                 createdBy: 'Admin'
//               }
//             }
//           ]
//         }
//       ]
//     },
//     {
//       label: 'Danh Mục Gốc 2',
//       icon: 'pi pi-folder',
//       data: {
//         id: 4,
//         name: 'Danh Mục Gốc 2',
//         description: 'Danh mục gốc thứ hai',
//         isActive: true,
//         createdAt: new Date(),
//         createdBy: 'Admin'
//       }
//     }
//   ];

//   selectedCategory: TreeNode | null = null;
//   contextMenuItems: MenuItem[] = [];
//   displayDialog: boolean = false;
//   isEditMode: boolean = false;
//   newCategory = { name: '', description: '', isActive: true };
//   onNodeContextMenuSelect(event: any) {
//   }
//   openDialog(){
//     this.displayDialog = true;
//   }
// }
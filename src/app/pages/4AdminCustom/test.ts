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

interface Category {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
    parentId?: number;
  }
@Component({
    selector: 'app-test',
    standalone:true,
    imports:[ContextMenuModule,TreeModule, RouterModule,DialogModule,ConfirmDialogModule,InputTextModule,
          InputIconModule, IconFieldModule, ButtonModule, TableModule, CommonModule, BadgeModule, RatingModule, FormsModule, TagModule],
    template: `<p>test</p>`,
    providers:[ConfirmationService]
})
export class TestComponent{
    categories: TreeNode[] = [];
      selectedCategory: TreeNode | null = null;
      contextMenuItems: MenuItem[] = [];
      displayDialog: boolean = false;
      isEditMode: boolean = false;
      newCategory: Category = { id: 0, name: '', isActive: true, createdAt: new Date() };
    
      constructor(private confirmationService: ConfirmationService) {}
    
      ngOnInit() {
        // Dữ liệu mẫu, thay bằng API thực tế
        const sampleData: Category[] = [
          { id: 1, name: 'Danh Mục Gốc 1', isActive: true, createdAt: new Date() },
          { id: 2, name: 'Danh Mục Con 1', parentId: 1, isActive: true, createdAt: new Date() },
          { id: 3, name: 'Chủ Đề 1', parentId: 2, isActive: true, createdAt: new Date() },
          { id: 4, name: 'Danh Mục Gốc 2', isActive: true, createdAt: new Date() }
        ];
        this.loadCategories(sampleData);
      }
    
      loadCategories(data: Category[]) {
        const nodeMap: { [key: number]: TreeNode } = {};
        data.forEach(cat => {
          nodeMap[cat.id] = {
            data: cat,
            children: [],
            label: cat.name,
            icon: this.getIcon(cat)
          };
        });
        this.categories = [];
        data.forEach(cat => {
          if (cat.parentId && nodeMap[cat.parentId]) {
            nodeMap[cat.parentId].children!.push(nodeMap[cat.id]);
          } else {
            this.categories.push(nodeMap[cat.id]);
          }
        });
      }
    
      getIcon(category: Category): string {
        if (!category.parentId) return 'pi pi-folder';
        const parent = this.findCategoryById(category.parentId);
        return parent && !parent.parentId ? 'pi pi-folder-open' : 'pi pi-file';
      }
    
      findCategoryById(id: number): Category | undefined {
        const flatList = this.flattenCategories(this.categories);
        return flatList.find(cat => cat.id === id);
      }
    
      flattenCategories(nodes: TreeNode[]): Category[] {
        let result: Category[] = [];
        nodes.forEach(node => {
          result.push(node.data);
          if (node.children) result = result.concat(this.flattenCategories(node.children));
        });
        return result;
      }
    
      onNodeSelect(event: any) {
        this.selectedCategory = event.node || null; // Đảm bảo không gán undefined
      }
    
      onNodeContextMenuSelect(event: any) {
        this.selectedCategory = event.node;
        if (!this.selectedCategory) {
          this.contextMenuItems = [];
          return;
        }
    
        const category: Category = this.selectedCategory.data;
        this.contextMenuItems = [
          ...(category.parentId && this.findCategoryById(category.parentId)?.parentId ? [] : [{
            label: category.parentId ? 'Thêm Chủ Đề' : 'Thêm Danh Mục Con',
            icon: 'pi pi-plus',
            command: () => this.addChildCategory()
          }]),
          { label: 'Chỉnh Sửa', icon: 'pi pi-pencil', command: () => this.editCategory() },
          { label: 'Xóa', icon: 'pi pi-trash', command: () => this.deleteCategory() }
        ];
      }
    
      addRootCategory() {
        this.isEditMode = false;
        this.newCategory = { id: 0, name: '', isActive: true, createdAt: new Date() };
        this.displayDialog = true;
      }
    
      addChildCategory() {
        if (!this.selectedCategory) return;
        this.isEditMode = false;
        this.newCategory = { id: 0, name: '', isActive: true, createdAt: new Date(), parentId: this.selectedCategory.data.id };
        this.displayDialog = true;
      }
    
      editCategory() {
        if (!this.selectedCategory) return;
        this.isEditMode = true;
        this.newCategory = { ...this.selectedCategory.data };
        this.displayDialog = true;
      }
    
      saveCategory() {
        const category = { ...this.newCategory, id: this.isEditMode ? this.newCategory.id : Math.max(...this.flattenCategories(this.categories).map(c => c.id)) + 1 };
        const flatList = this.flattenCategories(this.categories);
        if (this.isEditMode) {
          const index = flatList.findIndex(c => c.id === category.id);
          flatList[index] = category;
        } else {
          flatList.push(category);
        }
        this.loadCategories(flatList);
        this.displayDialog = false;
      }
    
      deleteCategory() {
        if (!this.selectedCategory) return;
        this.confirmationService.confirm({
          message: 'Bạn có chắc muốn xóa danh mục này? Nếu có danh mục con, chúng cũng sẽ bị xóa.',
          accept: () => {
            const flatList = this.flattenCategories(this.categories).filter(c => c.id !== this.selectedCategory!.data.id && !this.isDescendant(c, this.selectedCategory!.data.id));
            this.loadCategories(flatList);
            this.selectedCategory = null;
          }
        });
      }
    
      isDescendant(category: Category, parentId: number): boolean {
        if (!category.parentId) return false;
        if (category.parentId === parentId) return true;
        const parent = this.findCategoryById(category.parentId);
        return parent ? this.isDescendant(parent, parentId) : false;
      }
    
      filterCategories(event: any) {
        const filtered: TreeNode[] = [];
        const query = event.target.value.toLowerCase();
        this.categories.forEach(node => {
          if (this.filterNode(node, query)) filtered.push({ ...node });
        });
        this.categories = filtered;
      }
    
      filterNode(node: TreeNode, query: string): boolean {
        let matches = node.label!.toLowerCase().includes(query);
        if (node.children) {
          node.children = node.children.filter(child => this.filterNode(child, query));
          matches = matches || node.children.length > 0;
        }
        return matches;
      }
}
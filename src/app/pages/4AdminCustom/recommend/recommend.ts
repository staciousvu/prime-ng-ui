import { Component, OnInit } from '@angular/core';
import { BreadcrumpComponent } from '../breadcrump';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageModule } from 'primeng/image';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'app-recommend',
    standalone: true,
    imports: [BreadcrumpComponent, CommonModule, CKEditorModule, ImageModule, FormsModule, ToggleSwitchModule],
    template: `
        <app-breadcrump [apr]="'List recommends'" [manager]="'Manage recommeds'"></app-breadcrump>

        <div class="font-semibold text-xl mb-4">List recommends</div>
        <div class="flex justify-between items-center mb-4">
            <span class="text-gray-700 text-sm ml-2">Có tổng cộng {{totalTopic}} topic trong danh sách</span>

            <div class="relative">
                <input type="text" placeholder="Tìm kiếm bài viết..." class="border border-gray-400 rounded-md px-3 py-2 text-base w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                <button class="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>
        <div *ngFor="let item of categories" class="gap-2 bg-white w-full mb-5">
            <h2 class="font-semibold text-xl">{{item.name}}</h2>
            <div class="flex gap-5 bg-white w-full flex-wrap">
            <label *ngFor="let topic of item.leafCategories" class="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                <input type="checkbox" name="option2" value="2" class="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out" />
                <span class="text-gray-700 text-base">{{topic.name}} <span class="text-blue-600 font-semibold">({{topic.totalCourses}} khóa học)</span></span>
            </label>
</div>
        </div>
    `,
    styles: ``
})
export class RecommendComponent implements OnInit {
    categories: any[] = [];
    ngOnInit(): void {
        this.loadCatories();
    }
    loadCatories() {
        this.http.get<any>(`http://localhost:8080/categories/all-leafs`).subscribe((res) => {
            this.categories = res.data.rootCategoriesDTOS;
        });
        this.countTopic();
    }
    totalTopic=0;
    countTopic(){
        this.categories.forEach(item=>{
            this.totalTopic+= item.leafCategories.length();
        });
    }
    constructor(private http: HttpClient) {}
}

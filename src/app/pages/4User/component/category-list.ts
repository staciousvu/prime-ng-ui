import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [CommonModule],
    template: `
        <!-- <div class="categories-wrapper">
            <ul class="categories">
                <li *ngFor="let item of categories" class="category">
                    {{ item.name }}
                    <div class="subcategories-wrapper">
                        <ul class="subcategories">
                            <li *ngFor="let subitem of item.subcategories">{{ subitem }}</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div> -->
        <div class="categories-wrapper">
            <ul class="categories">
                <li *ngFor="let item of categoryObject | slice:0:10" class="category click">
                    {{ item.name }}
                    <div class="subcategories-wrapper">
                        <ul class="subcategories">
                            <li class="subcategory-item click" *ngFor="let subitem of castToArray(item.subCategories) | slice:0:7">{{ subitem.name }}</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    `,
    styles: `
    .click:active{
        background-color:rgba(224, 23, 23, 0.48);
    }
        .categories-wrapper {
            width: 100vw;
            margin: 0 auto;
            position: relative;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .categories {
            width:80%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;
        }

        .categories li {
            padding: 10px 15px; /* Tạo khoảng cách */
            color: rgba(0, 0, 0, 0.734);
            border-radius: 5px; /* Bo góc mềm mại */
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            cursor: pointer;
            white-space: nowrap; /* Không xuống dòng */
        }

        .categories li:hover {
            background-color: #e1e5e98e;
        }

        .category:hover .subcategories-wrapper {
            display: block;
        }
        .subcategories {
            display: flex;
            justify-content:center;
            gap:10px;
        }
        .subcategories li{
            color:white;
        }
        .subcategories-wrapper{
            top: 100%;
            right: 0;
            left: 0;
            background-color: black;
            width: 100%;
            position: absolute;
            display: none;
        }
    `
})
export class CategoryNavComponent implements OnInit{
    categoryObject:any[]=[];
    constructor(private http:HttpClient){}
    ngOnInit(): void {
        this.http.get<any>(`http://localhost:8080/categories`).subscribe(
            (response) => {
                this.categoryObject=response.data;
            }
        )
    }
    castToArray(subs: unknown): any[] {
        return subs as any[];
      }
    
}

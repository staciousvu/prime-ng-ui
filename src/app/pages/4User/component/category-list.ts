import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="categories-wrapper">
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
        </div>
    `,
    styles: `
        .categories-wrapper {
            width: 100vw;
            margin: 0 auto;
            position: relative;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .categories {
            margin: 0;
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
export class CategoryNavComponent {
    categories: any[] = [
        {
            name: 'Development',
            subcategories: ['Programming', 'Web Development', 'Mobile Development','Desktop Development']
        },
        {
            name: 'Business',
            subcategories: ['Finance', 'Entrepreneurship', 'Management']
        },
        {
            name: 'Design',
            subcategories: ['Graphic Design', 'UX/UI', '3D Design']
        },
        {
            name: 'Marketing',
            subcategories: ['Digital Marketing', 'SEO', 'Content Marketing']
        },
        {
            name: 'Personal Development',
            subcategories: ['Productivity', 'Leadership', 'Career Development']
        },
        {
            name: 'Photography',
            subcategories: ['Portrait', 'Landscape', 'Photo Editing']
        },
        {
            name: 'Music',
            subcategories: ['Instruments', 'Music Production', 'Music Theory']
        },
        {
            name: 'IT & Software',
            subcategories: ['Network & Security', 'Hardware', 'Operating Systems']
        },
        {
            name: 'Health & Fitness',
            subcategories: ['Yoga', 'Nutrition', 'Mental Health']
        },
        {
            name: 'Teaching & Academics',
            subcategories: ['Science', 'Mathematics', 'Language Learning']
        }
    ];
}

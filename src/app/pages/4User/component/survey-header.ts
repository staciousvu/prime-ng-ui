import { Component, ViewEncapsulation } from '@angular/core';
import { NavBarComponent } from '../component/navbar';
import { HomeComponent } from '../home';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-survey-header',
    standalone: true,
    // encapsulation:ViewEncapsulation.None,
    imports: [],
    template: `
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <a href="#">Edu<span>Flow</span></a>
            </div>
            <div class="actions">
                <a href="#">Save & exit</a>
                <div class="language">🌐 English</div>
            </div>
        </div>
    `,
    styles: `
        .logo a {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-decoration: none;
        }
        .logo span {
            color: #007bff;
            font-size: 24px;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f9f9fc;
            padding-top: 60px;
            padding-bottom: 80px;
        }

        /* Header */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: white;
            border-bottom: 1px solid #ddd;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
        }

        .header .logo {
            font-weight: bold;
            font-size: 20px;
            color: #6a1b9a;
        }

        .header .actions {
            display: flex;
            gap: 20px;
            align-items: center;
        }

        .header .actions a {
            color: #6a1b9a;
            font-weight: bold;
            text-decoration: none;
        }

        .header .language {
            border: 1px solid #6a1b9a;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
        }
    `
})
export class SurveyHeaderComponent {}

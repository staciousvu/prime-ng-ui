import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastService } from '../../service/toast.service';

@Component({
    selector: 'app-advertisement-layout',
    standalone: true,
    imports: [RouterModule, CommonModule, FormsModule],
    template: `
        <div class="container" x-data="adsService">
            <div class="header">
                <h1>Dịch vụ Quảng Cáo</h1>
                <p>Nâng cao hiệu quả kinh doanh với các gói quảng cáo hấp dẫn</p>
            </div>

            <div class="tab-nav">
                <button class="tab-button" [class.active]="activeTab === 'unused'" (click)="setActiveTab('unused')"><i class="fas fa-layer-group mr-2"></i> Chưa sử dụng</button>
                <button class="tab-button" [class.active]="activeTab === 'active'" (click)="setActiveTab('active')"><i class="fas fa-broadcast-tower mr-2"></i> Đang áp dụng</button>
                <button class="tab-button" [class.active]="activeTab === 'buy'" (click)="setActiveTab('buy')"><i class="fas fa-shopping-cart mr-2"></i> Mua thêm</button>
            </div>

            <!-- Tab: Chưa sử dụng -->
            <div class="tab-panel" *ngIf="activeTab === 'unused'">
                <div class="card">
                    <div style="padding: 1.5rem;">
                        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #2d3748;">
                            <i class="fas fa-pause-circle mr-2" style="color: #3182ce;"></i>
                            Gói đã mua nhưng chưa sử dụng
                        </h2>

                        <!-- Nếu có gói chưa sử dụng -->
                        <table class="table" *ngIf="unusedPackages.length > 0">
                            <thead>
                                <tr>
                                    <th>Tên gói</th>
                                    <th>Ngày mua</th>
                                    <th>Thời hạn</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let pkg of unusedPackages">
                                    <td>{{ pkg.packageName }}</td>
                                    <td>{{ pkg.createdAt }}</td>
                                    <td>{{ pkg.durationDays }} ngày</td>
                                    <td>
                                        <span class="status-badge status-pending">Chưa áp dụng</span>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary" (click)="openModal(pkg.advertisementId)"><i class="fas fa-play mr-1"></i> Áp dụng</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Nếu không có gói chưa sử dụng -->
                        <div class="empty-state" *ngIf="unusedPackages.length === 0">
                            <div class="empty-icon">
                                <i class="far fa-folder-open"></i>
                            </div>
                            <p class="empty-text">Bạn chưa có gói quảng cáo nào chưa sử dụng</p>
                            <button class="btn btn-primary" (click)="goToBuyPackage()"><i class="fas fa-shopping-cart mr-1"></i> Mua gói ngay</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab: Đang áp dụng -->
            <div class="tab-panel" *ngIf="activeTab === 'active'">
                <div class="card">
                    <div style="padding: 1.5rem;">
                        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #2d3748;">
                            <i class="fas fa-broadcast-tower mr-2" style="color: #3182ce;"></i>
                            Gói đã áp dụng
                        </h2>

                        <!-- Nếu có gói đang hoạt động -->
                        <table class="table" *ngIf="activePackages.length > 0">
                            <thead>
                                <tr>
                                    <th>Tên gói</th>
                                    <th>Khóa học</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Trạng thái</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let pkg of activePackages">
                                    <td>{{ pkg.packageName }}</td>
                                    <td>{{ pkg.courseTitle }}</td>
                                    <td>{{ pkg.startDate }}</td>
                                    <td>{{ pkg.endDate }}</td>
                                    <td>
                                        <span class="status-badge status-active">Đang hoạt động</span>
                                    </td>
                                    <td>
                                        <button class="btn btn-outline" (click)="viewPerformance(pkg)"><i class="fas fa-chart-line mr-1"></i> Hiệu suất</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Nếu không có gói nào đang hoạt động -->
                        <div class="empty-state" *ngIf="activePackages.length === 0">
                            <div class="empty-icon">
                                <i class="far fa-chart-bar"></i>
                            </div>
                            <p class="empty-text">Bạn chưa có gói quảng cáo nào đang hoạt động</p>
                            <button class="btn btn-primary" (click)="activatePackage()"><i class="fas fa-play mr-1"></i> Kích hoạt gói</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab: Mua thêm -->
            <div class="tab-panel" *ngIf="activeTab === 'buy'">
                <div style="margin-bottom: 1rem;text-align:center">
                    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #2d3748;">
                        <i class="fas fa-shopping-cart mr-2" style="color: #3182ce;"></i>
                        Mua gói quảng cáo
                    </h2>
                    <p style="color: #718096;">Chọn gói quảng cáo phù hợp với nhu cầu của bạn</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
                    <div class="card package-card" *ngFor="let pkg of packages">
                        <div class="package-header">
                            <div class="package-name">{{ pkg.name }}</div>
                            <div class="package-description">{{ pkg.description }}</div>
                            <div class="package-price">
                                {{ pkg.price }}đ
                                <span style="font-size: 0.875rem; color: #718096; font-weight: normal;">/ {{ pkg.duration }}</span>
                            </div>
                        </div>

                        <div class="package-body">
                            <ul class="feature-list">
                                <li class="feature-item" *ngFor="let feature of pkg.features">
                                    <span class="feature-icon"><i class="fas fa-check-circle"></i></span>
                                    {{ feature }}
                                </li>
                            </ul>
                        </div>

                        <div class="package-footer">
                            <button (click)="buyPackage(pkg)" class="btn btn-primary" style="width: 100%;"><i class="fas fa-shopping-cart mr-1"></i> Mua ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div *ngIf="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
                <!-- Header -->
                <div class="flex justify-between items-center border-b px-4 py-3">
                    <h3 class="text-lg font-semibold">Chọn Khóa Học Áp Dụng Dịch Vụ</h3>
                    <button (click)="closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>

                <!-- Body -->
                <div class="p-4">
                    <label for="courseSelect" class="block mb-2 font-medium text-gray-700">Khóa học:</label>
                    <select
                        id="courseSelect"
                        [(ngModel)]="selectedCourse"
                        class="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="" class="text-gray-500">-- Chọn khóa học --</option>
                        <option *ngFor="let course of coursesAccepted" [value]="course.id" class="py-1">
                            {{ course.title }}
                        </option>
                    </select>
                </div>

                <!-- Footer -->
                <div class="flex justify-end space-x-3 px-4 py-3 border-t">
                    <button (click)="closeModal()" class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Hủy</button>
                    <button (click)="applyCourse()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Áp dụng</button>
                </div>
            </div>
        </div>
    `,
    styles: `
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }

        .header {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 0.5rem;
        }

        .header p {
            color: #718096;
            font-size: 1.1rem;
        }

        .card {
            background-color: white;
            border-radius: 10px;
            box-shadow:
                0 4px 6px rgba(0, 0, 0, 0.05),
                0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .tab-nav {
            display: flex;
            background-color: white;
            border-radius: 10px;
            //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            margin-bottom: 2rem;
            overflow: hidden;
        }

        .tab-button {
            flex: 1;
            padding: 1rem;
            text-align: center;
            font-weight: 600;
            border: none;
            background: none;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #4a5568;
            position: relative;
        }

        .tab-button:hover {
            color: #3182ce;
        }

        .tab-button.active {
            color: #3182ce;
        }

        .tab-button.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: #3182ce;
        }

        .tab-panel {
            margin-top: 1rem;
        }

        .status-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .status-pending {
            background-color: #fef6e7;
            color: #d97706;
        }

        .status-active {
            background-color: #e6f6ee;
            color: #047857;
        }

        .btn {
            display: inline-block;
            padding: 0.5rem 1.25rem;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }

        .btn-primary {
            background-color: #3182ce;
            color: white;
        }

        .btn-primary:hover {
            background-color: #2c5282;
        }

        .btn-outline {
            border: 1px solid #3182ce;
            color: #3182ce;
            background-color: transparent;
        }

        .btn-outline:hover {
            background-color: #ebf5ff;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        .table th {
            text-align: left;
            padding: 1rem;
            background-color: #f8fafc;
            color: #4a5568;
            font-weight: 600;
        }

        .table td {
            padding: 1rem;
            border-top: 1px solid #edf2f7;
        }

        .package-card {
            height: 100%;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
        }

        .package-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .package-header {
            padding: 1.5rem;
            border-bottom: 1px solid #edf2f7;
        }

        .package-body {
            padding: 1.5rem;
            flex-grow: 1;
        }

        .package-footer {
            padding: 1.5rem;
            background-color: #f8fafc;
            border-top: 1px solid #edf2f7;
        }

        .package-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 0.5rem;
        }

        .package-description {
            color: #718096;
            margin-bottom: 0.5rem;
        }

        .package-price {
            font-size: 1.25rem;
            font-weight: 700;
            color: #3182ce;
        }

        .feature-list {
            list-style: none;
            padding: 0;
            margin: 1rem 0;
        }

        .feature-item {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
        }

        .feature-icon {
            color: #3182ce;
            margin-right: 0.5rem;
        }

        .empty-state {
            text-align: center;
            padding: 3rem 0;
        }

        .empty-icon {
            font-size: 3rem;
            color: #cbd5e0;
            margin-bottom: 1rem;
        }

        .empty-text {
            color: #718096;
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
            .tab-nav {
                flex-direction: column;
            }

            .tab-button {
                border-bottom: 1px solid #edf2f7;
            }

            .tab-button:last-child {
                border-bottom: none;
            }

            .tab-button.active::after {
                width: 3px;
                height: 100%;
                left: 0;
                top: 0;
            }
        }
    `
})
export class AdvertisementLayoutComponent implements OnInit {
    isModalOpen = false;
    coursesAccepted: any[] = [];
    selectedCourse: string='';
    selectedAdsId: string='';

    openModal(id:any) {
        this.selectedAdsId=id;
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.selectedCourse = '';
    }

    applyCourse() {
        Swal.fire({
            title: 'Xác nhận?',
            text: 'Bạn sẽ không thể thay đổi sau khi áp dụng quảng cáo!',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Duyệt',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                const params = new HttpParams().set('advertisementId', this.selectedAdsId).set('courseId', this.selectedCourse);
                this.http.post<any>('http://localhost:8080/advertisements/apply', null, { params }).subscribe({
                    next: (res) => {
                        this.getUnusedPackages();
                        this.getActivePackages();
                        this.closeModal();
                        this.toastService.addToast('success', 'Áp dụng dịch vụ thành công');
                    },
                    error: (err) => {
                        console.error('Error fetching unused advertisements:', err);
                        this.toastService.addToast('error', 'Hệ thống lỗi, thử lại sau!');
                    }
                });
            }
        });
    }
    getCoursesAcceptedAuthor() {
        this.http.get<any>(`http://localhost:8080/course/accepted-author`).subscribe(
            (res) => {
                this.coursesAccepted = res.data;
            },
            (err) => {
                console.error('Lỗi thanh toán:', err);
            }
        );
    }
    buyPackage(pkg: any) {
        const request = {
            email: this.authService.getEmail(),
            payment_method: 'VNPAY',
            total_amount: pkg.price,
            orderType: 'AD',
            adPackageId: pkg.id,
            order_info: `Thanh toán dịch vụ quảng cáo cho ${this.authService.getEmail()}`
        };
        console.log('request:', request);
        this.http.post<any>('http://localhost:8080/payment/vn-pay', request).subscribe(
            (res) => {
                window.location.href = res.data;
            },
            (err) => {
                console.error('Lỗi thanh toán:', err);
            }
        );
    }
    unusedPackages: any[] = [];
    activePackages: any[] = [];
    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private toastService: ToastService
    ) {}
    ngOnInit(): void {
        this.getUnusedPackages();
        this.getActivePackages();
        this.getCoursesAcceptedAuthor();
    }

    getUnusedPackages(): void {
        this.http.get<any>('http://localhost:8080/advertisements/unused').subscribe({
            next: (res) => {
                this.unusedPackages = res.data;
                console.log('unsusedpackageeeeeeeee:', this.unusedPackages);
            },
            error: (err) => {
                console.error('Error fetching unused advertisements:', err);
            }
        });
    }

    getActivePackages(): void {
        this.http.get<any>('http://localhost:8080/advertisements/active').subscribe({
            next: (res) => {
                this.activePackages = res.data;
            },
            error: (err) => {
                console.error('Error fetching active advertisements:', err);
            }
        });
    }

    activeTab: 'unused' | 'active' | 'buy' = 'unused';

    setActiveTab(tab: 'unused' | 'active' | 'buy') {
        this.activeTab = tab;
    }

    packages = [
        {
            id: 1,
            name: 'VIP 1',
            description: 'Hiển thị tại trang chủ',
            duration: '7 ngày',
            price: '200000',
            features: ['Xuất hiện tại trang chủ', 'Vị trí ưu tiên trong danh sách', 'Hỗ trợ 24/7']
        },
        {
            id: 2,
            name: 'VIP 2',
            description: 'Trang chủ + tìm kiếm',
            duration: '10 ngày',
            price: '350000',
            features: ['Tất cả tính năng VIP 1', 'Xuất hiện trong kết quả tìm kiếm', 'Đánh dấu "Được đề xuất"']
        },
        {
            id: 3,
            name: 'VIP 3',
            description: 'Trang chủ + tìm kiếm + popup',
            duration: '14 ngày',
            price: '500000',
            features: ['Tất cả tính năng VIP 2', 'Hiển thị popup khi người dùng đăng nhập', 'Báo cáo hiệu suất hàng tuần']
        },
        {
            id: 4,
            name: 'VIP 4',
            description: 'Tất cả vị trí hiển thị',
            duration: '21 ngày',
            price: '700000',
            features: ['Tất cả tính năng VIP 3', 'Xuất hiện trên tất cả các trang', 'Phân tích đối tượng người dùng', 'Tư vấn tối ưu hóa quảng cáo']
        }
    ];

    //   unusedPackages = [
    //     {
    //       name: 'VIP 2',
    //       purchaseDate: '01/05/2025',
    //       duration: '10 ngày',
    //       status: 'Chưa áp dụng'
    //     }
    //   ];

    //   activePackages = [
    //     {
    //       name: 'VIP 3',
    //       course: 'Java Cơ bản',
    //       startDate: '03/05/2025',
    //       endDate: '17/05/2025',
    //       status: 'Đang hoạt động'
    //     }
    //   ];
    viewPerformance(_t71: { name: string; course: string; startDate: string; endDate: string; status: string }) {
        throw new Error('Method not implemented.');
    }
    activatePackage() {
        throw new Error('Method not implemented.');
    }
    goToBuyPackage() {
        throw new Error('Method not implemented.');
    }
    applyPackage(_t32: { name: string; purchaseDate: string; duration: string; status: string }) {
        throw new Error('Method not implemented.');
    }
}

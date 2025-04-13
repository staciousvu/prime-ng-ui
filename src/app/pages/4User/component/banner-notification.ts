import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-banner-notification',
    standalone: true,
    imports:[CommonModule],
    template: `
        <div *ngIf="showBanner" class="banner-notification">
            <div class="description">🎉 {{ description }}</div>
            <div class="countdown">{{ countdown }}</div>
            <span class="close-icon" (click)="hideBanner()">&times;</span>
        </div>
    `,
    styles: `
        .banner-notification {
            width: 100%;
            background: linear-gradient(to right, rgba(108, 40, 210, 0.908), rgba(99, 20, 217, 0.7));
            color: white;
            padding: 15px;
            z-index: 9999;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .banner-notification .description {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .banner-notification .countdown {
            font-size: 18px;
            font-weight: 600;
            color: #ffd700; /* Màu vàng nổi bật */
        }

        .close-icon {
            position: absolute;
            top: 12px;
            right: 20px;
            font-size: 28px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .close-icon:hover {
            transform: scale(1.2);
        }
    `
})
export class BannerNotificationComponent implements OnInit, OnDestroy {
    showBanner = false;
    description = '';
    countdown = '';
    private countdownInterval: any;
    private routerSubscription!: Subscription;
  
    constructor(
      private http: HttpClient,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      // Lắng nghe sự kiện route thay đổi
      this.routerSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const isHome = event.urlAfterRedirects === '/home';
          this.showBanner = false;
          if (this.countdownInterval) clearInterval(this.countdownInterval);
  
          if (isHome) {
            this.loadVoucher();
          }
        }
      });
  
      // Kiểm tra lần đầu khi component khởi tạo
      if (this.router.url === '/home') {
        this.loadVoucher();
      }
    }
  
    ngOnDestroy(): void {
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
    }
  
    hideBanner() {
      this.showBanner = false;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
    }
  
    private loadVoucher() {
      this.http.get<any>('http://localhost:8080/voucher/getActiveVoucherNonExpired').subscribe({
        next: (res) => {
          const voucher = res?.data?.[0];
          if (voucher) {
            this.description = '🎉 ' + voucher.description;
            this.showBanner = true;
            this.startCountdown(voucher.endDate);
          }
        },
        error: (err) => {
          console.error('Error loading voucher:', err);
        }
      });
    }
  
    private startCountdown(endDateStr: string) {
      const endDate = new Date(endDateStr).getTime();
  
      this.countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = endDate - now;
  
        if (diff <= 0) {
          this.countdown = '⏳ Voucher đã hết hạn';
          clearInterval(this.countdownInterval);
          return;
        }
  
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
  
        this.countdown = `⏳ Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
      }, 1000);
    }
  }
// export class BannerNotificationComponent implements OnInit {
//     showBanner = false;
//     description = '';
//     countdown = '';
//     private countdownInterval: any;
//     constructor(
//         private http: HttpClient,
//         private router: Router
//     ) {}
//     ngOnInit(): void {
//         if (this.router.url !== '/home') return;
//         if (this.router.url === '/home') {
//             this.http.get<any>('http://localhost:8080/voucher/getActiveVoucherNonExpired').subscribe({
//                 next: (res) => {
//                     const voucher = res?.data?.[0];
//                     if (voucher) {
//                         this.description = voucher.description;
//                         this.showBanner = true;
//                         this.startCountdown(voucher.endDate);
//                     }
//                 },
//                 error: (err) => {
//                     console.error('Error loading voucher:', err);
//                 }
//             });
//         }
//     }
//     hideBanner() {
//         this.showBanner = false;
//         if (this.countdownInterval) {
//             clearInterval(this.countdownInterval);
//         }
//     }

//     private startCountdown(endDateStr: string) {
//         const endDate = new Date(endDateStr).getTime();

//         this.countdownInterval = setInterval(() => {
//             const now = new Date().getTime();
//             const diff = endDate - now;

//             if (diff <= 0) {
//                 this.countdown = '⏳ Voucher đã hết hạn';
//                 clearInterval(this.countdownInterval);
//                 return;
//             }

//             const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//             const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//             const minutes = Math.floor((diff / (1000 * 60)) % 60);
//             const seconds = Math.floor((diff / 1000) % 60);

//             this.countdown = `⏳ Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
//         }, 1000);
//     }
// }

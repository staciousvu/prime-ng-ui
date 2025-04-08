import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import videojs from 'video.js';
// import type { Player } from 'video.js';
import Player from 'video.js';
@Component({
    selector: 'app-video-player',
    encapsulation: ViewEncapsulation.None,
    imports:[ProgressSpinnerModule,CommonModule],
    template: `
        <!-- <video #videoElement class="video-js vjs-default-skin" width="640" height="360">
            <p class="vjs-no-js">Để xem video này, vui lòng bật JavaScript và sử dụng trình duyệt hỗ trợ HTML5.</p>
        </video> -->
        <video #videoElement class="video-js vjs-default-skin" width="640" height="360">
    <p class="vjs-no-js">Để xem video này, vui lòng bật JavaScript và sử dụng trình duyệt hỗ trợ HTML5.</p>
</video>

<!-- Hiển thị spinner khi video đang tải -->
<!-- <p-progress-spinner *ngIf="loading" strokeWidth="8" fill="transparent" animationDuration=".5s" [style]="{ width: '100%', height: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }">
</p-progress-spinner> -->


    `,
    styles: [
        `
            .vjs-rewind-button,
            .vjs-forward-button {
                font-size: 16px;
                color: white;
                background-color: #7c2ae8;
                padding: 5px 10px;
                border-radius: 5px;
                margin-left: 5px;
                cursor: pointer;
            }

            .video-js {
                width: 100% !important;
                height: 100% !important;
            }
            video {
                width: 100% !important;
                height: 100% !important;
            }
            .custom-rewind,
            .custom-forward {
                font-size: 16px;
                color: white;
                background-color: #6a5acd;
                border-radius: 5px;
                padding: 4px 8px;
                margin: 0 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .custom-rewind:hover,
            .custom-forward:hover {
                background-color: #483d8b;
            }
        `
    ]
})
export class VideoPlayerComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('videoElement', { static: true }) videoElement!: ElementRef;
    @Input() videoUrl: any;
    player!: any;
    loading: boolean = true;

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.videoUrl && this.videoElement) {
            this.loading = true;

            if (this.player) {
                this.player.src({ type: 'video/mp4', src: this.videoUrl });
            } else {
                this.player = videojs(this.videoElement.nativeElement, {
                    controls: true,
                    autoplay: false,
                    preload: 'auto',
                    responsive: true,
                    fluid: false,
                    playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
                    sources: [{ src: this.videoUrl, type: 'video/mp4' }]
                });

                this.player.on('ended', () => {
                    console.log('🎉 Video đã kết thúc, gửi API...');
                });

                this.player.ready(() => {
                    const forwardButton = videojs.dom.createEl('button', {
                        className: 'vjs-control vjs-button custom-forward',
                        innerHTML: '<i class="fa-solid fa-forward"></i>'
                    });
                    (forwardButton as HTMLElement).onclick = () => {
                        this.player.currentTime(this.player.currentTime() + 10);
                    };
                    this.player.controlBar.el().insertBefore(forwardButton, this.player.controlBar.fullscreenToggle.el());
                });
            }

            // Khi video bắt đầu tải
            this.player.on('loadeddata', () => {
                this.loading = false; // Ẩn spinner khi video đã tải xong
            });
        }
    }

    ngOnDestroy(): void {
        if (this.player) {
            this.player.dispose();
        }
    }
}

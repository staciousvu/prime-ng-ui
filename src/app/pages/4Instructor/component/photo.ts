import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../service/toast.service';

@Component({
    selector: 'app-profile-photo',
    standalone: true,
    imports: [CommonModule, FormsModule, ImageCropperComponent,ToastModule],
    template: `
        <div class="max-w-xl mx-auto p-8 rounded-2xl">
  <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Upload & Crop Avatar</h2>
  <p class="text-center text-gray-500 mb-5 text-sm">Minimum 200x200 - Maximum 6000x6000 pixels</p>

  <div class="mb-6 flex justify-center">
    <div class="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-200 bg-gray-100 flex items-center justify-center">
      <img *ngIf="croppedImage" [src]="croppedImage" alt="Avatar preview" class="w-full h-full object-cover" />
      <span *ngIf="!croppedImage" class="text-gray-400 text-sm text-center">No image</span>
    </div>
  </div>

  <form class="flex flex-col gap-4 items-center w-full" (submit)="onSubmit()">
    <input
      type="file"
      accept="image/*"
      (change)="fileChangeEvent($event)"
      class="w-full border border-gray-300 rounded-md px-4 py-3 text-base text-gray-700 file:mr-4 file:py-3 file:px-5 file:rounded-md file:border-0 file:text-base file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
    />

    <image-cropper
  *ngIf="imageChangedEvent"
  [imageChangedEvent]="imageChangedEvent"
  [maintainAspectRatio]="true"
  [aspectRatio]="1 / 1"
  [resizeToWidth]="400"
  [cropperMinWidth]="200"
  [cropperMinHeight]="200"
  (imageCropped)="tempCropped($event)"
  (imageLoaded)="onImageLoaded()"
  class="w-full max-w-md"
></image-cropper>


    <button type="submit" [disabled]="!croppedImage" class="bg-purple-700 text-white font-semibold rounded-md px-6 py-3 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors w-full sm:w-1/2 text-center">Save</button>
  </form>
</div>

<p-toast></p-toast>
    `,
    styles: ``,
    providers:[MessageService]
})
export class ProfilePhotoComponent implements OnInit {
  user: any;
  currentAvatarUrl: string = '';        // Ảnh avatar ban đầu từ server
  croppedImage: string = '';            // Ảnh sau khi crop hoặc ban đầu
  imageChangedEvent: any = '';          // Sự kiện thay đổi ảnh

  constructor(private http: HttpClient,
    private messageService:MessageService,
    private toastService:ToastService
  ) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/profile').subscribe((response) => {
      this.user = response.data;

      // Nếu có avatar từ API, hiển thị luôn
      if (this.user.avatar) {
        this.currentAvatarUrl = this.user.avatar;
        this.croppedImage = this.user.avatar;
      }
    });
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Vui lòng chọn một tệp hình ảnh hợp lệ.');
      return;
    }

    this.imageChangedEvent = event;
    this.croppedImage = '';  // Reset ảnh preview để chờ ảnh crop mới
  }

  tempCropped(event: ImageCroppedEvent): void {
    if (event.blob) {
      const objectUrl = URL.createObjectURL(event.blob);
      this.croppedImage = objectUrl;
      console.log('Cropped image updated:', this.croppedImage);
    } else {
      console.log('No cropped image in event.blob');
    }
  }

  onImageLoaded(): void {
    console.log('📷 Image loaded in cropper');
  }

  onSubmit(): void {
    if (!this.croppedImage) {
      alert('Không có ảnh để gửi');
      return;
    }

    // Kiểm tra nếu ảnh đã crop là giống ảnh cũ thì không cần gửi
    if (this.croppedImage === this.currentAvatarUrl) {
      alert('Ảnh vẫn giữ nguyên như cũ');
      return;
    }

    // Gửi ảnh mới
    fetch(this.croppedImage)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          this.uploadImage(base64Image);
        };
        reader.readAsDataURL(blob);
      });
  }

  uploadImage(base64Image: string): void {
    const formData = new FormData();
    const file = this.base64ToFile(base64Image, 'avatar.png'); // chuyển base64 -> file
    formData.append('file', file);
    // formData.append('file', base64Image);

    // Gửi ảnh lên server (viết theo backend của bạn)
    // Ví dụ:
    this.http.post('http://localhost:8080/user/upload-avatar', formData).subscribe(response => {
      this.toastService.addToast("success","Cập nhật ảnh đại diện thành công");
    }, error => {
      this.toastService.addToast("error","Hệ thống đang bị lỗi vui lòng thử lại");
    });
  }
  base64ToFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/);
    if (!match) {
      throw new Error("Không thể lấy MIME type từ base64 string.");
    }
    const mime = match[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }
  
}
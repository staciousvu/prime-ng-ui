import { Component } from "@angular/core";
import { ToastService } from "../../service/toast.service";
import { ToastContainerComponent } from "../../SharedComponent/toast-container-components";



@Component({
    selector: 'app-test',
    standalone:true,
    imports:[],
    template: `
    <div>
      <h2>Feature Component</h2>
      <button (click)="showSuccess()">Show Success Toast</button>
      <button (click)="showError()">Show Error Toast</button>
      <button (click)="showWarning()">Show Warning Toast</button>
      <button (click)="showInfo()">Show Info Toast</button>
    </div>
    `,
    styles: ``
})
export class TestToastComponent{
    constructor(private toastService: ToastService) {}

  showSuccess() {
    this.toastService.addToast('success', 'Thành công! Dữ liệu đã được lưu.');
  }

  showError() {
    this.toastService.addToast('error', 'Lỗi! Không thể kết nối đến server.');
  }

  showWarning() {
    this.toastService.addToast('warning', 'Cảnh báo! Dữ liệu có thể không đầy đủ.');
  }

  showInfo() {
    this.toastService.addToast('info', 'Thông tin: Hệ thống đang bảo trì.');
  }
}
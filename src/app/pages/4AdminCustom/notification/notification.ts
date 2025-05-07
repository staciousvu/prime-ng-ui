import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker"; // Import DatePickerModule
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { ToastService } from "../../service/toast.service";
import { ChatService } from "../../service/chat.service";
import { BreadcrumpComponent } from "../breadcrump";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    DatePickerModule,
    BreadcrumpComponent
  ],
  template: `
  <app-breadcrump [apr]="'List notifications'" [manager]="'Manage notifications'"></app-breadcrump>

<div class="font-semibold text-xl mb-4">List comments</div>
    <div class="container mx-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Quản lý thông báo</h2>
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" (click)="openNew()">Tạo thông báo</button>
      </div>

      <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
  <thead class="bg-gray-100 text-gray-800">
    <tr>
      <th class="py-3 px-6 text-left font-semibold border-b">Tiêu đề</th>
      <th class="py-3 px-6 text-left font-semibold border-b">Nội dung</th>
      <th class="py-3 px-6 text-left font-semibold border-b">Bắt đầu</th>
      <th class="py-3 px-6 text-left font-semibold border-b">Kết thúc</th>
      <th class="py-3 px-6 text-left font-semibold border-b">Hành động</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let noti of notifications" class="hover:bg-gray-50 transition-all ease-in-out duration-300">
      <td class="py-3 px-6 border-b text-sm text-gray-700">{{ noti.title }}</td>
      <td class="py-3 px-6 border-b text-sm text-gray-700">{{ noti.message }}</td>
      <td class="py-3 px-6 border-b text-sm text-gray-700">{{ noti.startTime | date:'dd/MM/yyyy HH:mm' }}</td>
      <td class="py-3 px-6 border-b text-sm text-gray-700">{{ noti.endTime | date:'dd/MM/yyyy HH:mm' }}</td>
      <td class="py-3 px-6 border-b text-sm text-gray-700 space-x-2">
      <button class="bg-red-600 text-white hover:bg-red-700 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all ease-in-out duration-300" (click)="deleteNotification(noti)">
  Xóa
</button>

      </td>
    </tr>
  </tbody>
</table>

      </div>
    </div>
    <p-dialog [(visible)]="notificationDialog" [modal]="true" header="Tạo thông báo" [style]="{ width: '450px' }">
  <div class="p-fluid space-y-4">
    <!-- Tiêu đề -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
      <input type="text" placeholder="Nhập tiêu đề thông báo" [(ngModel)]="title" name="title" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required />
    </div>
    
    <!-- Nội dung -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
      <textarea placeholder="Nhập nội dung thông báo" rows="4" [(ngModel)]="message" name="message" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required></textarea>
    </div>
    
    <!-- Thời gian bắt đầu -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Thời gian bắt đầu</label>
      <p-datepicker
        [(ngModel)]="startTime"
        name="startTime"
        dateFormat="dd/mm/yy"
        [showIcon]="true"
        appendTo="body"
        (onSelect)="logChange('startTime', $event)"
        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        required
      ></p-datepicker>
    </div>
    
    <!-- Thời gian kết thúc -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Thời gian kết thúc</label>
      <p-datepicker
        [(ngModel)]="endTime"
        name="endTime"
        dateFormat="dd/mm/yy"
        appendTo="body"
        [showIcon]="true"
        (onSelect)="logChange('endTime', $event)"
        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        required
      ></p-datepicker>
    </div>
  </div>

  <!-- Footer -->
  <ng-template pTemplate="footer">
    <div class="flex justify-end space-x-4 w-full">
      <button class="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold transition duration-200" (click)="hideDialog()">Hủy</button>
      <button class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition duration-200" (click)="saveNotification()">Lưu</button>
    </div>
  </ng-template>
</p-dialog>

  `,
  providers: [MessageService]
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  notificationDialog = false;
  title: string = '';
  message: string = '';
  startTime: Date | null = null; // Sử dụng Date thay vì string
  endTime: Date | null = null; // Sử dụng Date thay vì string
  currentId: number | null = null;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private chatService: ChatService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.resetForm();
    this.loadData();
  }
  loadData(){
    this.http.get<any>(`http://localhost:8080/notification/all`).subscribe(
      (res) => {
        this.notifications = res.data.map((noti: any) => ({
          ...noti,
          startTime: noti.startTime ? new Date(noti.startTime) : null,
          endTime: noti.endTime ? new Date(noti.endTime) : null
        }));
      }
    );
  }

  resetForm() {
    this.title = '';
    this.message = '';
    this.startTime = null;
    this.endTime = null;
    this.currentId = null;
  }

  openNew() {
    this.resetForm();
    this.notificationDialog = true;
    console.log('Modal opened, form:', { title: this.title, message: this.message, startTime: this.startTime, endTime: this.endTime });
  }

  editNotification(noti: any) {
    this.title = noti.title || '';
    this.message = noti.message || '';
    this.startTime = noti.startTime ? new Date(noti.startTime) : null;
    this.endTime = noti.endTime ? new Date(noti.endTime) : null;
    this.currentId = noti.id;
    this.notificationDialog = true;
  }

  hideDialog() {
    this.notificationDialog = false;
    this.resetForm();
  }

  logChange(field: string, value: any) {
    console.log(`${field} changed to:`, value);
    if (field === 'startTime') {
      this.startTime = value || null;
      console.log('Updated startTime:', this.startTime);
    } else if (field === 'endTime') {
      this.endTime = value || null;
      console.log('Updated endTime:', this.endTime);
    }
  }

  saveNotification() {
    if (!this.title || !this.message || !this.startTime || !this.endTime) {
      this.toastService.addToast('error', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    let startTime: string;
    let endTime: string;
    try {
      startTime = this.startTime.toISOString().substring(0, 19);
      endTime = this.endTime.toISOString().substring(0, 19);
    } catch (error) {
      this.toastService.addToast('error', 'Định dạng thời gian không hợp lệ');
      return;
    }

    const payload = {
      id: this.currentId,
      title: this.title,
      message: this.message,
      startTime: startTime,
      endTime: endTime
    };

    console.log('Payload:', payload);

    if (this.currentId) {
      this.http.put<any>(`http://localhost:8080/notification/${this.currentId}`, payload).subscribe({
        next: () => {
          const index = this.notifications.findIndex(n => n.id === this.currentId);
          if (index >= 0) {
            this.notifications[index] = { ...payload };
          }
          this.toastService.addToast('success', 'Cập nhật thông báo thành công');
          this.hideDialog();
          console.log('notidialog:',this.notificationDialog)
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.toastService.addToast('error', 'Cập nhật thông báo thất bại: ' + err.message);
        }
      });
    } else {
      this.http.post<any>('http://localhost:8080/notification', payload).subscribe({
        next: (res) => {
          this.toastService.addToast('success', 'Tạo thông báo thành công');
          this.chatService.onConnected().subscribe((isConnected) => {
            if (isConnected) {
              this.chatService.sendNotification(this.title, this.message);
            }
          });
          // this.chatService.sendNotification(this.title, this.message);
          this.loadData()
          this.hideDialog();
          console.log('notidialog:',this.notificationDialog)
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.toastService.addToast('error', 'Tạo thông báo thất bại: ' + err.message);
        }
      });
    }
  }

  deleteNotification(noti: any) {
    this.http.delete<any>(`http://localhost:8080/notification/${noti.id}`).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== noti.id);
        this.toastService.addToast('success', 'Xóa thông báo thành công');
      },
      error: (err) => {
        this.toastService.addToast('error', 'Xóa thông báo thất bại: ' + err.message);
      }
    });
  }
}
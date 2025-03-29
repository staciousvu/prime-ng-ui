import { CommonModule, DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { ColorPickerModule } from "primeng/colorpicker";
import { DatePickerModule } from "primeng/datepicker";
import { DialogModule } from "primeng/dialog";
import { FloatLabelModule } from "primeng/floatlabel";
import { FluidModule } from "primeng/fluid";
import { IconFieldModule } from "primeng/iconfield";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputIconModule } from "primeng/inputicon";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { KnobModule } from "primeng/knob";
import { ListboxModule } from "primeng/listbox";
import { MultiSelectModule } from "primeng/multiselect";
import { RatingModule } from "primeng/rating";
import { SelectModule } from "primeng/select";
import { SliderModule } from "primeng/slider";
import { TableModule } from "primeng/table";
import { TextareaModule } from "primeng/textarea";
import { Toast, ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { TreeSelectModule } from "primeng/treeselect";

interface Notification {
    id: number;
    title: string;
    message: string;
    date: Date;
  }
@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        InputGroupModule,
        FluidModule,
        IconFieldModule,
        InputIconModule,
        FloatLabelModule,
        AutoCompleteModule,
        InputNumberModule,
        SliderModule,
        RatingModule,
        ColorPickerModule,
        KnobModule,
        SelectModule,
        DatePickerModule,
        ToggleButtonModule,
        ToggleSwitchModule,
        TreeSelectModule,
        MultiSelectModule,
        ListboxModule,
        ToastModule,
        TableModule,
        DialogModule,
        InputGroupAddonModule,
        TextareaModule],
    // imports: [DialogModule,TableModule,ToastModule,FormsModule,DatePipe,ButtonModule,InputTextModule ,InputTextModule],
    template: `
    <div class="card">
  <p-toast></p-toast>
  
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold">Quản lý thông báo</h2>
    <button pButton label="Thêm thông báo" icon="pi pi-plus" (click)="openNew()"></button>
  </div>

  <p-table #dt [value]="notifications" [paginator]="true" [rows]="5">
    <ng-template pTemplate="header">
      <tr>
        <th>Tiêu đề</th>
        <th>Nội dung</th>
        <th>Thời gian</th>
        <th>Hành động</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-noti>
      <tr>
        <td>{{ noti.title }}</td>
        <td>{{ noti.message }}</td>
        <td>{{ noti.date | date:'dd/MM/yyyy HH:mm' }}</td>
        <td>
          <button pButton icon="pi pi-pencil" class="p-button-text" (click)="editNotification(noti)"></button>
          <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" (click)="deleteNotification(noti)"></button>
        </td>
      </tr>
    </ng-template>
  </p-table>
</div>

<p-dialog [(visible)]="notificationDialog" [modal]="true" header="📢 Thông báo" [style]="{width: '450px'}">
  <div class="p-fluid">
    <!-- Tiêu đề -->
    <div class="field">
      <label for="title" class="form-label">Tiêu đề</label>
      <input pInputText id="title" [(ngModel)]="notification.title" required autofocus class="form-input" />
    </div>

    <!-- Nội dung -->
    <div class="field">
      <label for="message" class="form-label">Nội dung</label>
      <textarea pTextarea id="message" rows="3" [(ngModel)]="notification.message" class="form-textarea"></textarea>
    </div>
  </div>

  <!-- Footer buttons -->
  <ng-template pTemplate="footer">
    <button pButton label="Hủy" class="p-button-text" (click)="hideDialog()"></button>
    <button pButton label="Lưu" class="p-button-success" (click)="saveNotification()"></button>
  </ng-template>
</p-dialog>






    `,
    styles:`
    
    `,
    providers:[MessageService]
})
export class NotificationComponent{
    notifications: Notification[] = [];
  notificationDialog: boolean = false;
  notification: Notification = { id: 0, title: '', message: '', date: new Date() };
  isEdit: boolean = false;

  constructor(private messageService: MessageService) {
    // Dữ liệu mẫu
    this.notifications = [
      { id: 1, title: 'Khuyến mãi 50%', message: 'Nhận ngay ưu đãi giảm giá', date: new Date() },
      { id: 2, title: 'Cập nhật hệ thống', message: 'Hệ thống sẽ bảo trì lúc 12h đêm', date: new Date() }
    ];
  }

  openNew() {
    this.notification = { id: 0, title: '', message: '', date: new Date() };
    this.isEdit = false;
    this.notificationDialog = true;
  }

  editNotification(noti: Notification) {
    this.notification = { ...noti };
    this.isEdit = true;
    this.notificationDialog = true;
  }

  saveNotification() {
    if (this.isEdit) {
      // Cập nhật thông báo
      const index = this.notifications.findIndex(n => n.id === this.notification.id);
      this.notifications[index] = this.notification;
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thông báo đã cập nhật' });
    } else {
      // Thêm mới thông báo
      this.notification.id = this.notifications.length + 1;
      this.notifications.push(this.notification);
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thông báo đã thêm' });
    }
    this.notificationDialog = false;
  }

  deleteNotification(noti: Notification) {
    this.notifications = this.notifications.filter(n => n.id !== noti.id);
    this.messageService.add({ severity: 'warn', summary: 'Xóa thành công', detail: 'Thông báo đã bị xóa' });
  }

  hideDialog() {
    this.notificationDialog = false;
  }
}
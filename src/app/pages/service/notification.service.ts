import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Notification } from "../models/toast";



@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private nextId = 0;

  addNotification(url_image:string,title:string, message: string, duration: number = 1500) {
    const id = this.nextId++;
    const notification: Notification = {id,url_image,title , message, duration };
    this.notifications.push(notification);
    this.notificationsSubject.next([...this.notifications]);
  }
  

  removeNotification(id: number) {
    this.notifications = this.notifications.filter(t => t.id !== id);
    this.notificationsSubject.next([...this.notifications]);
  }
}
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Toast } from "../models/toast";



@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private nextId = 0;

  addToast(type: 'success' | 'error' | 'warning' | 'info', message: string, duration: number = 1500) {
    const id = this.nextId++;
    const toast: Toast = { id, type, message, duration };
    this.toasts.push(toast);
    this.toastsSubject.next([...this.toasts]);
  }
  

  removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.toastsSubject.next([...this.toasts]);
  }
}
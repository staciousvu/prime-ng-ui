

export interface Toast {
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration: number;
  }
export interface Notification {
  id: number;
  url_image:string;
  title:string;
  message:string;
  duration: number;
}
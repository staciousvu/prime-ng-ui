import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CourseReloadService {
    private reloadEvent = new BehaviorSubject<string | null>(null);

    sendReload(tabName: string) {
        this.reloadEvent.next(tabName);
    }

    onReload(): Observable<string | null> {
        return this.reloadEvent.asObservable();
    }
}

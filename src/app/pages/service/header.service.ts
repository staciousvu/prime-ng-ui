import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HeaderControl } from "../models/header-control";

@Injectable({ providedIn: 'root' })
export class HeaderControlService {
  private controlsSubject = new BehaviorSubject<HeaderControl[]>([]);
  controls$ = this.controlsSubject.asObservable();

  private saveHandler: (() => void) | null = null;

  setControls(controls: HeaderControl[]) {
    this.controlsSubject.next(controls);
  }

  setSaveHandler(handler: () => void) {
    this.saveHandler = handler;
  }

  triggerSave() {
    this.saveHandler?.();
  }
  clearControls() {
    this.controlsSubject.next([]);
  }
}

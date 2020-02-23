import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  // Observables source
  private messageSource = new Subject<string>();

  // Observables stream
  message$ = this.messageSource.asObservable();

  constructor() {}

  notify(msg: string): void {
    this.messageSource.next(msg);
  }
}

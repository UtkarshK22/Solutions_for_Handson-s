import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new BehaviorSubject<string>('Welcome to the Student Portal!');
  message$ = this.messageSubject.asObservable();

  show(message: string): void {
    this.messageSubject.next(message);
  }
}
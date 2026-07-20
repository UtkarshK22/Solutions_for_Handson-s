import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  message = 'Welcome to the Student Portal!';

  getMessage(): string {
    return this.message;
  }

}
import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css',

  // Component-level provider creates a NEW instance of
  // NotificationService for this component and its children.
  providers: [NotificationService]
})
export class Notification {

  constructor(public notificationService: NotificationService) {}

}
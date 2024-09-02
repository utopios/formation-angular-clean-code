import { Injectable } from '@angular/core';
import { NotifierInterface } from './notifier.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements NotifierInterface {

  constructor() { }
  sendNotification(message: string): void {
    console.log(`Sending notification: ${message}`);
  }
}

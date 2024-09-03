import { Component, Input } from '@angular/core';
import { Order } from '../models/order.model';


@Component({
  selector: 'app-order-list',
  template: `
    <div *ngFor="let order of orders">
      <p>{{ order.product }} - {{ order.quantity }} - {{ order.total }} - {{ order.status }}</p>
    </div>
  `,
})
export class OrderListComponent {
  @Input() orders: Order[] = [];
}
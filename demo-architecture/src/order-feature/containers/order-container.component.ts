import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-container',
  template: `
    <app-loader *ngIf="loading"></app-loader>
    <app-order-list [orders]="orders$ | async"></app-order-list>
  `,
})
export class OrderContainerComponent implements OnInit {
  orders$: Observable<Order[]>| undefined  = undefined;
  loading = true;

  constructor(
    private orderService: OrderService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.orders$ = this.sharedDataService.orders$;
    this.orderService.getOrders().subscribe(() => {
      this.loading = false;
    });
  }
}
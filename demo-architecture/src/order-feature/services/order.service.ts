// order.service.ts
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = '/api/orders';

  constructor(
    private httpService: HttpService,
    private sharedDataService: SharedDataService
  ) {}

  getOrders(): Observable<Order[]> {
    return this.httpService.get<Order[]>(this.orderUrl).pipe(
      tap(orders => this.sharedDataService.setOrders(orders))
    );
  }
}
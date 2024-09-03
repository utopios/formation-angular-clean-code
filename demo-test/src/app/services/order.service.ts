import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    calculateOrderTotal(order:Order): number {
        return 0
    }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../../features/order-feature/models/order.model';
import { Product } from '../../product-feature/models/product.model';
import { Customer } from '../../customer-feature/models/customer.model';


type state = "default" | "etat1" | "etat2"

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private customersSubject = new BehaviorSubject<Customer[]>([]);

  private stateSubject = new BehaviorSubject<state> ("default")

  // Orders
  get orders$(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  setOrders(orders: Order[]): void {
    this.ordersSubject.next(orders);
  }

  get state$(): Observable<state> {
    return this.stateSubject.asObservable();
  }

  // Products
  get products$(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  setProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  // Customers
  get customers$(): Observable<Customer[]> {
    return this.customersSubject.asObservable();
  }

  setCustomers(customers: Customer[]): void {
    this.customersSubject.next(customers);
  }
}
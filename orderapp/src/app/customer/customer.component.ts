import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = { id: 0, name: '', email: '' };
  errorMessage: string = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      data => this.customers = data,
      // error => this.errorMessage = error
      error => this.handleCustomerErrorResponse(error)
    );
  }

  addCustomer(): void {
    this.customerService.addCustomer(this.newCustomer).subscribe(
      data => {
        this.customers.push(data);
        this.resetForm();
      },
      error => this.handleCustomerErrorResponse(error)
    );
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(
      () => this.customers = this.customers.filter(c => c.id !== id),
      error => this.handleCustomerErrorResponse(error)
    );
  }

  private resetForm(): void {
    this.newCustomer = { id: 0, name: '', email: '' };
    //this.errorMessage = '';
    this.handleCustomerErrorResponse('')
  }

  private handleCustomerErrorResponse(error:any): void {
    this.errorMessage = error
  }
}
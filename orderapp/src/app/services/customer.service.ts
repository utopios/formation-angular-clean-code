import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { CustomerValidator } from '../validators/customer.validator';

@Injectable({
    providedIn: 'root'
  })
  export class CustomerService {
    private apiUrl = '/api/customers';
  
    constructor(
      private http: HttpClient,
      private customerValidator: CustomerValidator
    ) { }
  
    getCustomers(): Observable<Customer[]> {
      return this.http.get<Customer[]>(this.apiUrl)
        .pipe(
          catchError(error => throwError('Failed to load customers'))
        );
    }
  
    addCustomer(customer: Customer): Observable<Customer> {
      const validationErrors = this.customerValidator.validate(customer);
      if (validationErrors.length > 0) {
        return throwError(validationErrors.join(', '));
      }
      return this.http.post<Customer>(this.apiUrl, customer)
        .pipe(
          catchError(error => throwError('Failed to add customer'))
        );
    }
  
    deleteCustomer(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`)
        .pipe(
          catchError(error => throwError('Failed to delete customer'))
        );
    }
  }
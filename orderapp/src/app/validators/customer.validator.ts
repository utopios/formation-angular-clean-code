import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerValidator {
  validate(customer: Customer): string[] {
    const errors: string[] = [];
    if (customer.name.length < 3) {
      errors.push('Customer name must be at least 3 characters long.');
    }
    if (!this.isValidEmail(customer.email)) {
      errors.push('Invalid email format.');
    }
    return errors;
  }

  private isValidEmail(email: string): boolean {
    return /^\S+@\S+\.\S+$/.test(email);
  }
}
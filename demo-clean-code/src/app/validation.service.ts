import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  validateEmail(email: string): boolean {
    if (email.includes('@')) {
      return true;
    }
    return false;
  }

  validatePassword(password: string): boolean {
    if (password.length > 8) {
      return true;
    }
    return false;
  }
}

//
@Injectable({ providedIn: 'root' })
export class EmailValidator {
  validate(email: string): boolean {
    return email.includes('@');
  }
}

@Injectable({ providedIn: 'root' })
export class PasswordValidator {
  validate(email: string): boolean {
    return email.includes('@');
  }
}
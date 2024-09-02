import { Injectable } from '@angular/core';
import { UserInterface } from './user-interface';

@Injectable({
  providedIn: 'root'
})
export class GuestUserService implements UserInterface {

  constructor() { }
  createUser(user: User): void {
    //Implémentation
  }
  deleteUser(userId: number): void {
    throw new Error('Method not implemented.');
  }
  updateUser(user: User): void {
    throw new Error('Method not implemented.');
  }
  getUser(userId: number): User {
    throw new Error('Method not implemented.');
  }
}

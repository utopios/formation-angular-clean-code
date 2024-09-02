import { Injectable } from '@angular/core';
import { UserInterface } from './user-interface';
import { NotifierInterface } from './notifier.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService implements UserInterface {

  constructor(private notifier: NotifierInterface) { }
  createUser(user: User): void {
    //Implémentation ...
  }
  deleteUser(userId: number): void {
    //Implémentation ...
  }
  updateUser(user: User): void {
    //Implémentation ...
  }
  getUser(userId: number): User | undefined {
    //Implémentation ...
    return undefined
  }
}

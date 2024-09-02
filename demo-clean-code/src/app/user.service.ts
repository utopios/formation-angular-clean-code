import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`/api/user/${userId}`);
  }

  saveUser(user: User|undefined): Observable<void> {
    return this.http.post<void>('/api/user', user);
  }
}

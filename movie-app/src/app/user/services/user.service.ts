import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/register`, user)
      .pipe(
        map(data => new User(data))
      );
  }

  login(credentials: any): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(data => new User(data))
      );
  }

  getProfile(): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/profile`)
      .pipe(
        map(data => new User(data))
      );
  }
}

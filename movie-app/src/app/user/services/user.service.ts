import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../core/decorators/error.decorator';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Méthode pour l'inscription
  register(userData: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post('/api/register', userData).pipe(
      catchError(this.handleError)  // Ajout de la gestion des erreurs
    );
  }

  // Méthode pour la connexion
  login(userData: { email: string, password: string }): Observable<any> {
    return this.http.post('/api/login', userData).pipe(
      catchError(this.handleError)  // Ajout de la gestion des erreurs
    );
  }

  // Méthode pour la mise à jour du profil
  @HandleError
  updateProfile(userData: { name: string, email: string }): Observable<any> {
    // return this.http.put('/api/profile', userData).pipe(
    //   catchError(this.handleError)  // Ajout de la gestion des erreurs
    // );
    return this.http.put('/api/profile', userData)
    
  }

  // Méthode pour gérer les erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client ou réseau
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erreur côté backend
      if (error.status === 400) {
        errorMessage = 'Bad request. Please check the input data.';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized. Invalid email or password.';
      } else if (error.status === 409) {
        errorMessage = 'Conflict. Email already exists.';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = 'dadb019730c0075868955d1ec94040bb';

  // Méthode pour récupérer les films par type (popular, top_rated, etc.)
  getMoviesByType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/movie/${type}`, {
      params: { api_key: this.apiKey }
    }).pipe(
      map((response: any) => response.results)
    );
  }

  // Méthode pour récupérer les détails d'un film par son ID
  getMovieDetailsById(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}`, {
      params: { api_key: this.apiKey }
    });
  }

  // Méthode pour récupérer les crédits d'un film (casting et équipe)
  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/credits`, {
      params: { api_key: this.apiKey }
    });
  }

  // Méthode pour récupérer les détails d'un film et optionnellement les crédits
  fetchMovieDetails(movie: any, includeCredits: boolean): Observable<any> {
    return this.getMovieDetailsById(movie.id).pipe(
      switchMap((details: any) => {
        const movieDetails = this.transformMovieDetails(movie, details);

        if (includeCredits) {
          return this.getMovieCredits(movie.id).pipe(
            map((credits: any) => this.addCreditsToMovieDetails(movieDetails, credits))
          );
        } else {
          return [movieDetails];
        }
      })
    );
  }

  // Méthode principale pour récupérer les détails complets de plusieurs types de films
  fetchAllMovieDetails(types: string[], includeCredits: boolean): Observable<any[]> {
    return this.fetchMoviesByTypes(types).pipe(
      switchMap((movies: any[]) => {
        const movieDetailRequests = movies.map(movie => this.fetchMovieDetails(movie, includeCredits));
        return forkJoin(movieDetailRequests);
      })
    );
  }

  // Récupère les films pour plusieurs types
  private fetchMoviesByTypes(types: string[]): Observable<any[]> {
    return forkJoin(types.map(type => this.getMoviesByType(type))).pipe(
      map((moviesByType: any[]) => moviesByType.flat())  // Aplatir les résultats de plusieurs types
    );
  }

  // Transforme les détails d'un film pour avoir un objet plus structuré
  private transformMovieDetails(movie: any, details: any): any {
    return {
      id: movie.id,
      title: movie.title,
      overview: details.overview,
      releaseDate: details.release_date,
      runtime: details.runtime,
      genres: details.genres.map((g: any) => g.name).join(', '),
      director: null,
      cast: [],
    };
  }

  // Ajoute les crédits (réalisateur et casting) aux détails d'un film
  private addCreditsToMovieDetails(movieDetails: any, credits: any): any {
    movieDetails.director = credits.crew.find((crewMember: any) => crewMember.job === 'Director')?.name || 'Unknown';
    movieDetails.cast = credits.cast.map((castMember: any) => ({
      name: castMember.name,
      character: castMember.character
    }));
    return movieDetails;
  }
}
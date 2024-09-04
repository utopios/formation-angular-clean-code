import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { CommonModule, NgFor } from '@angular/common';
import { MovieItemComponent } from '../../components/movie-item/movie-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [NgFor, MovieItemComponent, RouterModule, CommonModule]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  errorMessage: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMoviesByType('popular').subscribe({
      next: (movies: Movie[]) => {
        this.movies = movies;
      },
      error: (error) => {
        this.errorMessage = 'Error loading movies.';
      }
    });
  }
}
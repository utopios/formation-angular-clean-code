import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  imports: [CommonModule]
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadMovieDetails();
  }

  loadMovieDetails(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetailsById(+movieId).subscribe({
        next: (movie) => {
          this.movie = movie;
        },
        error: (error) => {
          this.errorMessage = 'Error loading movie details.';
        }
      });
    }
  }
}
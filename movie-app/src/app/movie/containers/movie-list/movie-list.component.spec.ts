import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';
import { of, throwError } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { RouterModule } from '@angular/router';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    mockMovieService = jasmine.createSpyObj('MovieService', ['getMoviesByType']);

    await TestBed.configureTestingModule({
      //declarations: [MovieListComponent, MovieItemComponent],
      imports: [RouterModule],
      providers: [{ provide: MovieService, useValue: mockMovieService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should load movies on init', () => {
    const mockMovies: Movie[] = [
      {
        id: 1, title: 'Test Movie', overview: 'Test Overview', releaseDate: '', genres: '', director: '', cast: [],
        setDirector: function (director: string): void {
          throw new Error('Function not implemented.');
        },
        setCast: function (cast: { name: string; character: string; }[]): void {
          throw new Error('Function not implemented.');
        }
      },
    ];
    mockMovieService.getMoviesByType.and.returnValue(of(mockMovies));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.movies.length).toBe(1);
    expect(component.movies[0].title).toBe('Test Movie');
  });

  it('should display an error message when the movie service fails', () => {
    mockMovieService.getMoviesByType.and.returnValue(throwError(() => new Error('API error')));

    fixture.detectChanges(); // Trigger ngOnInit

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Error loading movies.');
  });
});
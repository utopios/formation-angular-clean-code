import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockMovieService = jasmine.createSpyObj('MovieService', ['getMovieDetailsById']);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => '1' } } };

    await TestBed.configureTestingModule({
     //declarations: [MovieDetailComponent],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
  });

  it('should load movie details on init', () => {
    const mockMovie = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      releaseDate: '',
      genres: '',
      runtime: 120,
      director: 'Test Director',
      cast: []
    };

    mockMovieService.getMovieDetailsById.and.returnValue(of(mockMovie));
    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.movie?.title).toBe('Test Movie');
    expect(component.movie?.director).toBe('Test Director');
  });

  it('should display an error message when the movie details cannot be loaded', () => {
    mockMovieService.getMovieDetailsById.and.returnValue(throwError(() => new Error('API error')));
    fixture.detectChanges(); // Trigger ngOnInit

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Error loading movie details.');
  });
});
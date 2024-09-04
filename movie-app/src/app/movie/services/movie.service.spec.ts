import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { of } from 'rxjs';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Spécification : Récupérer des films par type (popular, top_rated, etc.)
  it('should fetch movies by type', () => {
    const mockMovies = [
      { id: 1, title: 'Test Movie', overview: 'Test Overview' },
      { id: 2, title: 'Another Movie', overview: 'Another Overview' }
    ];

    service.getMoviesByType('popular').subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies[0].title).toBe('Test Movie');
      expect(movies[1].title).toBe('Another Movie');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/movie/popular?api_key=dadb019730c0075868955d1ec94040bb`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockMovies });
  });

  // Spécification : Récupérer les détails d'un film par ID
  it('should fetch movie details by ID', () => {
    const mockMovieDetails = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      release_date: '2022-01-01',
      runtime: 120,
      genres: [{ name: 'Action' }]
    };

    service.getMovieDetailsById(1).subscribe(details => {
      expect(details.title).toBe('Test Movie');
      expect(details.genres[0].name).toBe('Action');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/movie/1?api_key=dadb019730c0075868955d1ec94040bb`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovieDetails);
  });

  // Spécification : Récupérer les crédits d'un film par ID
  it('should fetch movie credits by ID', () => {
    const mockCredits = {
      id: 1,
      cast: [
        { name: 'Actor 1', character: 'Hero' },
        { name: 'Actor 2', character: 'Villain' }
      ],
      crew: [
        { name: 'Director 1', job: 'Director' }
      ]
    };

    service.getMovieCredits(1).subscribe(credits => {
      expect(credits.cast.length).toBe(2);
      expect(credits.crew[0].name).toBe('Director 1');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/movie/1/credits?api_key=dadb019730c0075868955d1ec94040bb`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCredits);
  });

  // Spécification : Récupérer les détails complets de plusieurs types de films avec crédits inclus
  it('should fetch all movie details for multiple types including credits', () => {
    const mockMoviesByType = [
      { id: 1, title: 'Test Movie' },
      { id: 2, title: 'Another Movie' }
    ];

    const mockMovieDetails1 = {
      id: 1,
      overview: 'Overview 1',
      release_date: '2022-01-01',
      runtime: 120,
      genres: [{ name: 'Action' }]
    };

    const mockMovieDetails2 = {
      id: 2,
      overview: 'Overview 2',
      release_date: '2022-02-01',
      runtime: 100,
      genres: [{ name: 'Drama' }]
    };

    const mockCredits1 = {
      cast: [{ name: 'Actor 1', character: 'Hero' }],
      crew: [{ name: 'Director 1', job: 'Director' }]
    };

    const mockCredits2 = {
      cast: [{ name: 'Actor 2', character: 'Villain' }],
      crew: [{ name: 'Director 2', job: 'Director' }]
    };

    spyOn(service, 'getMoviesByType').and.returnValue(of(mockMoviesByType));
    spyOn(service, 'getMovieDetailsById').and.callFake((id: number) => {
      if (id === 1) return of(mockMovieDetails1);
      else if (id === 2) return of(mockMovieDetails2);
      return of(null);
    });
    spyOn(service, 'getMovieCredits').and.callFake((id: number) => {
      if (id === 1) return of(mockCredits1);
      else if (id === 2) return of(mockCredits2);
      return of(null);
    });

    service.fetchAllMovieDetails(['popular'], true).subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies[0].title).toBe('Test Movie');
      expect(movies[0].director).toBe('Director 1');
      expect(movies[1].title).toBe('Another Movie');
      expect(movies[1].director).toBe('Director 2');
    });
  });

  // Règle de gestion : Ne pas inclure les crédits si 'includeCredits' est false
  it('should fetch all movie details without credits if includeCredits is false', () => {
    const mockMoviesByType = [
      { id: 1, title: 'Test Movie' },
      { id: 2, title: 'Another Movie' }
    ];

    const mockMovieDetails1 = {
      id: 1,
      overview: 'Overview 1',
      release_date: '2022-01-01',
      runtime: 120,
      genres: [{ name: 'Action' }]
    };

    const mockMovieDetails2 = {
      id: 2,
      overview: 'Overview 2',
      release_date: '2022-02-01',
      runtime: 100,
      genres: [{ name: 'Drama' }]
    };

    spyOn(service, 'getMoviesByType').and.returnValue(of(mockMoviesByType));
    spyOn(service, 'getMovieDetailsById').and.callFake((id: number) => {
      if (id === 1) 
        return of(mockMovieDetails1);
      else if (id === 2) 
        return of(mockMovieDetails2);
      return of(null);
    });

    service.fetchAllMovieDetails(['popular'], false).subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies[0].title).toBe('Test Movie');
      expect(movies[0].director).toBeNull();
      expect(movies[1].title).toBe('Another Movie');
      expect(movies[1].director).toBeNull();
    });
  });
});
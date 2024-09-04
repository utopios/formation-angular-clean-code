import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieItemComponent } from './movie-item.component';
import { Movie } from '../../models/movie.model';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //declarations: [MovieItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;

    const mockMovie: Movie = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      releaseDate: '',
      genres: '',
      director: '',
      cast: [],
      setDirector: function (director: string): void {
        throw new Error('Function not implemented.');
      },
      setCast: function (cast: { name: string; character: string; }[]): void {
        throw new Error('Function not implemented.');
      }
    };

    component.movie = mockMovie;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should display movie title and overview', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Test Movie');
    expect(compiled.querySelector('p')?.textContent).toContain('Test Overview');
  });
});
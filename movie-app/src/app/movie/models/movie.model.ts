export class Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  genres: string;
  director: string|null;
  cast: { name: string, character: string }[];

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.releaseDate = data.release_date;
    this.genres = data.genres.map((g: any) => g.name).join(', ');
    this.director = null;
    this.cast = [];
  }

  setDirector(director: string) {
    this.director = director;
  }

  setCast(cast: { name: string, character: string }[]) {
    this.cast = cast;
  }
}

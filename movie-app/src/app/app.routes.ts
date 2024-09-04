

import { Routes } from '@angular/router';
import { MovieListComponent } from './movie/containers/movie-list/movie-list.component';
import { MovieDetailComponent } from './movie/containers/movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent }, 
  { path: 'movie/:id', component: MovieDetailComponent }, 
];
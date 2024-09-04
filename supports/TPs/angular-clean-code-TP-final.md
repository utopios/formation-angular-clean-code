
### Sujet de TP : Amélioration de l'Architecture d'une Application Angular

#### Contexte :

Vous avez hérité d'une application Angular existante qui gère une liste de films, mais cette application a été développée sans respecter les principes de clean code, avec une architecture monolithique et un code difficile à maintenir. Votre mission est de refactorer cette application pour améliorer son architecture, la rendre plus modulaire, et intégrer des fonctionnalités supplémentaires en utilisant des pratiques modernes de développement.

#### Objectifs du TP :

1. **Refactorer le Code Existant :**
   - **Améliorer l'architecture** en séparant les responsabilités : extraire les fonctionnalités en modules indépendants, découper les services, et organiser le code de manière modulaire.
   - **Appliquer les principes de clean code** : renommer les variables et fonctions pour qu'elles soient explicites, réduire la longueur des fonctions en les décomposant, et éliminer les répétitions de code.
   - **Ajouter des tests unitaires** pour les services et composants existants afin de garantir que les refactorings n'introduisent pas de régressions.

2. **Ajouter une Nouvelle Fonctionnalité :**
   - Développer une nouvelle fonctionnalité permettant de gérer les utilisateurs (inscription, connexion, profil), les utilisateurs peuvent également ajouter et retirer des films de leur liste de favoris en suivant la méthodologie **TDD (Test-Driven Development)**.
   - Créer un module  pour encapsuler toute la gestion des utilisateurs.
   - Ajouter des **tests unitaires et tests d'intégration** pour cette nouvelle fonctionnalité.

3. **Utiliser l'AOP (Aspect-Oriented Programming) :**
   - Intégrer un aspect de logging qui capture et journalise toutes les actions des utilisateurs et les appels API importants.
   - Utiliser les intercepteurs (Interceptors) pour ajouter un aspect transversal de gestion des erreurs et de l'authentification.

4. **Améliorer la Qualité du Code :**
   - Mettre en place des **outils d'analyse statique** pour vérifier la qualité du code (ex. : ESLint, SonarQube).
   - Configurer des **tests de couverture** pour s'assurer que toutes les parties critiques de l'application sont bien testées.



#### Étapes du TP :

##### Partie 1 : Refactoring de l'Application

1. **Améliorer l'Architecture :**
   - Créer des modules indépendants pour chaque fonctionnalité principale (`MovieModule`, `SharedModule`, etc.).
   - Refactorer les services pour qu'ils soient responsables d'une seule chose (ex. : séparer les appels API des transformations de données).
   - Découper les composants existants en composants plus petits et réutilisables.

2. **Appliquer les Principes de Clean Code :**
   - Renommer les variables et méthodes pour qu'elles soient explicites.
   - Décomposer les fonctions longues en plusieurs fonctions plus petites et cohérentes.
   - Éliminer les répétitions de code en créant des fonctions utilitaires et des services partagés.

3. **Ajouter des Tests Unitaires :**
   - Écrire des tests unitaires pour les services et composants existants refactorisés.
   - Utiliser des mocks et des spies pour tester les services en isolation.

##### Partie 2 : Développement de la Fonctionnalité Utilisateur en TDD

1. **Créer le `UserModule` :**
   - Développer des composants pour l'inscription, la connexion, et la gestion du profil des utilisateurs.
   - Créer des services pour gérer l'authentification et la gestion des utilisateurs.

2. **Développer en TDD :**
   - Écrire les tests avant de développer la fonctionnalité.
   - Implémenter les fonctionnalités en s'assurant que tous les tests passent à chaque étape du développement.

3. **Ajouter des Tests d'Intégration :**
   - Tester l'intégration du `UserModule` avec le reste de l'application, notamment la gestion des utilisateurs connectés et les protections de routes.

##### Partie 3 : Intégration de l'AOP

1. **Logging Aspect :**
   - Créer un intercepteur Angular qui journalise chaque appel API ainsi que chaque action utilisateur importante.
   - Configurer le niveau de détail des logs en fonction de l'environnement (ex. : développement vs production).

2. **Gestion Transversale des Erreurs et Authentification :**
   - Utiliser un intercepteur pour gérer globalement les erreurs HTTP, en redirigeant vers une page d'erreur ou en affichant des messages d'alerte.
   - Ajouter un intercepteur pour ajouter un token d'authentification dans les en-têtes des requêtes HTTP.

##### Partie 4 : Amélioration de la Qualité du Code

1. **Analyse Statique :**
   - Configurer ESLint pour analyser le code et signaler les violations de bonnes pratiques.
   - Utiliser SonarQube pour analyser la couverture de code et détecter les problèmes potentiels.

2. **Tests de Couverture :**
   - Mettre en place des tests de couverture avec des outils comme Jest ou Karma pour s'assurer que toutes les parties critiques de l'application sont testées.





### Structure de l'Application

```
src/
├── app/
│   ├── app.component.ts
│   ├── movie.service.ts
│   ├── movie.model.ts
│   ├── movie-list.component.ts
│   ├── movie-detail.component.ts
├── main.ts
```

### Code de l'Application

#### `main.ts`

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch(err => console.error(err));
```

#### `app.component.ts`

```typescript
import { Component } from '@angular/core';
import { MovieListComponent } from './movie-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent],
  template: `
    <h1>Movie Application</h1>
    <app-movie-list></app-movie-list>
  `,
  styles: []
})
export class AppComponent {
  constructor() {
    console.log('App Initialized');
  }
}
```

#### `movie.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MvSvc {
  h = inject(HttpClient);
  aU = 'https://api.themoviedb.org/3';
  aK = 'YOUR_API_KEY';

  getM(t) {
    return this.h.get(this.aU + '/movie/' + t + '?api_key=' + this.aK);
  }

  getMD(i) {
    return this.h.get(this.aU + '/movie/' + i + '?api_key=' + this.aK);
  }

  fetchAllMovieDetails(types: string[], includeCredits: boolean) {
    let results = [];
    for (let type of types) {
      this.getM(type).subscribe((data: any) => {
        for (let movie of data.results) {
          this.getMD(movie.id).subscribe((details: any) => {
            let movieDetails = {
              id: movie.id,
              title: movie.title,
              overview: details.overview,
              releaseDate: details.release_date,
              runtime: details.runtime,
              genres: details.genres.map((g: any) => g.name).join(', '),
              director: null,
              cast: [],
            };
            if (includeCredits) {
              this.h.get(this.aU + '/movie/' + movie.id + '/credits?api_key=' + this.aK).subscribe((credits: any) => {
                for (let crewMember of credits.crew) {
                  if (crewMember.job === 'Director') {
                    movieDetails.director = crewMember.name;
                    break;
                  }
                }
                movieDetails.cast = credits.cast.map((castMember: any) => {
                  return { name: castMember.name, character: castMember.character };
                });
                results.push(movieDetails);
              });
            } else {
              results.push(movieDetails);
            }
          });
        }
      });
    }
    return results;
  }
}
```

#### `movie.model.ts`

```typescript
export class M {
  i: number;
  t: string;
  o: string;
  r: string;

  constructor(d: any) {
    this.i = d.id;
    this.t = d.title;
    this.o = d.overview;
    this.r = d.release_date;
  }
}
```

#### `movie-list.component.ts`

```typescript
import { Component } from '@angular/core';
import { MvSvc } from './movie.service';
import { MovieDetailComponent } from './movie-detail.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieDetailComponent],
  template: `
    <div>
      <h2>Movies List</h2>
      <ul>
        <li *ngFor="let m of ms" (click)="selM(m)">
          {{ m.t }}
        </li>
      </ul>
      <app-movie-detail *ngIf="selM" [movie]="selM"></app-movie-detail>
    </div>
  `,
  styles: []
})
export class MovieListComponent {
  ms = [];
  selM = null;
  msSvc = inject(MvSvc);

  constructor() {
    this.loadMovies();
  }

  loadMovies() {
    this.msSvc.getM('popular').subscribe((d: any) => {
      this.ms = d.results.map(m => new M(m));
    });
  }

  selM(m) {
    this.selM = m;
    this.msSvc.getMD(m.i).subscribe((details: any) => {
      this.selM.o = details.overview;
      this.selM.r = details.release_date;
      this.selM.runtime = details.runtime;
      this.selM.genres = details.genres.map((g: any) => g.name).join(', ');
      this.msSvc.h.get(this.msSvc.aU + '/movie/' + m.i + '/credits?api_key=' + this.msSvc.aK).subscribe((credits: any) => {
        this.selM.director = credits.crew.find((crewMember: any) => crewMember.job === 'Director').name;
        this.selM.cast = credits.cast.map((castMember: any) => {
          return { name: castMember.name, character: castMember.character };
        });
      });
    });
  }
}
```

#### `movie-detail.component.ts`

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  template: `
    <div *ngIf="movie">
      <h3>{{ movie.t }}</h3>
      <p>{{ movie.o }}</p>
      <p><strong>Release Date:</strong> {{ movie.r }}</p>
      <p *ngIf="movie.runtime"><strong>Runtime:</strong> {{ movie.runtime }} minutes</p>
      <p *ngIf="movie.genres"><strong>Genres:</strong> {{ movie.genres }}</p>
      <p *ngIf="movie.director"><strong>Director:</strong> {{ movie.director }}</p>
      <ul *ngIf="movie.cast">
        <li *ngFor="let actor of movie.cast">
          {{ actor.name }} as {{ actor.character }}
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class MovieDetailComponent {
  @Input() movie: any;
}
```

### Début de fichiers de tests


#### `user.service.spec.ts` 

```typescript
describe('UserService', () => {

  // Spécification : Un utilisateur doit pouvoir s'inscrire avec un nom, un email et un mot de passe.
  it('should allow a user to register with a name, email, and password', () => {
    // TODO: Implémenter la méthode register
    
  });

  // Règle de gestion : L'email doit être unique. L'inscription échoue si l'email est déjà utilisé.
  it('should not allow registration with an already used email', () => {
    // TODO: Implémenter une vérification d'unicité pour l'email
    
  });

  // Spécification : Un utilisateur doit pouvoir se connecter avec son email et son mot de passe.
  it('should allow a user to login with correct email and password', () => {
    // TODO: Implémenter la méthode login
    
  });

  // Règle de gestion : La connexion échoue si l'email ou le mot de passe est incorrect.
  it('should not allow login with incorrect email or password', () => {
    // TODO: Vérifier les erreurs lors de la connexion
    
  });

  // Spécification : Un utilisateur connecté doit pouvoir modifier son profil (nom, email, mot de passe).
  it('should allow a logged-in user to update profile information', () => {
    // TODO: Implémenter la méthode updateProfile
    
  });

  // Règle de gestion : Un utilisateur ne peut pas modifier son email pour utiliser un email déjà utilisé par un autre compte.
  it('should not allow updating email to one that is already in use', () => {
    // TODO: Implémenter une vérification d'unicité lors de la mise à jour de l'email
    
  });
});
```

#### `user.component.spec.ts` 

```typescript

describe('UserComponent', () => {
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Spécification : L'utilisateur doit pouvoir entrer son email et son mot de passe pour se connecter.
  it('should allow user to enter email and password for login', () => {
    // TODO: Implémenter la logique de connexion
    
  });

  // Règle de gestion : L'interface doit afficher un message d'erreur si la connexion échoue.
  it('should display an error message if login fails', () => {
    // TODO: Gérer l'affichage d'un message d'erreur
    
  });

  // Spécification : L'utilisateur connecté doit voir une page de profil avec ses informations actuelles.
  it('should display user profile for logged-in user', () => {
    // TODO: Implémenter l'affichage du profil utilisateur
    
  });
});
```

#### `favoris.service.spec.ts` 

```typescript


describe('FavoritesService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Spécification : Un utilisateur doit pouvoir ajouter un film à sa liste de favoris.
  it('should allow a user to add a movie to favorites', () => {
    // TODO: Implémenter la méthode addFavorite
    
  });

  // Règle de gestion : Un utilisateur ne doit pas pouvoir ajouter un même film deux fois à sa liste de favoris.
  it('should not add the same movie twice to favorites', () => {
    // TODO: Empêcher l'ajout en double
    
  });

  // Spécification : Un utilisateur doit pouvoir retirer un film de sa liste de favoris.
  it('should allow a user to remove a movie from favorites', () => {
    // TODO: Implémenter la méthode removeFavorite
    
  });

  // Règle de gestion : Les favoris doivent être persistés en localStorage (ou autre).
  it('should persist favorites in localStorage', () => {
    // TODO: Sauvegarder les favoris
    
  });
});
```


### Structure du projet

```
src/
├── app/
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── core/
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   ├── movie/
│   │   ├── movie.module.ts
│   │   ├── services/
│   │   │   ├── movie.service.ts
│   │   ├── components/
│   │   │   ├── movie-list.component.ts
│   │   │   ├── movie-detail.component.ts
│   │   ├── models/
│   │   │   ├── movie.model.ts
│   ├── user/
│   │   ├── user.module.ts
│   │   ├── services/
│   │   │   ├── user.service.ts
│   │   ├── components/
│   │   │   ├── register.component.ts
│   │   │   ├── login.component.ts
│   │   │   ├── profile.component.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   ├── shared/
│   │   ├── shared.module.ts
│   │   ├── components/
│   │   ├── services/
│   └── assets/
├── environments/
├── tests/
│   ├── movie.service.spec.ts
│   ├── user.service.spec.ts
│   ├── auth.service.spec.ts
│   ├── register.component.spec.ts
│   ├── login.component.spec.ts
│   ├── movie-list.component.spec.ts
│   ├── profile.component.spec.ts
├── main.ts
```

```
src/
├── app/
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── core/
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   ├── movie/
│   │   ├── movie.module.ts
│   │   ├── containers/
│   │   │   ├── movie-list/
│   │   │   │   ├── movie-list.component.ts
│   │   │   │   ├── movie-list.component.html
│   │   │   │   ├── movie-list.component.css
│   │   │   │   ├── movie-list.component.spec.ts
│   │   │   ├── movie-detail/
│   │   │   │   ├── movie-detail.component.ts
│   │   │   │   ├── movie-detail.component.html
│   │   │   │   ├── movie-detail.component.css
│   │   │   │   ├── movie-detail.component.spec.ts
│   │   ├── components/
│   │   │   ├── movie-item/
│   │   │   │   ├── movie-item.component.ts
│   │   │   │   ├── movie-item.component.html
│   │   │   │   ├── movie-item.component.css
│   │   │   │   ├── movie-item.component.spec.ts
│   ├── user/
│   │   ├── user.module.ts
│   │   ├── containers/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.css
│   │   │   │   ├── login.component.spec.ts
│   │   │   ├── register/
│   │   │   │   ├── register.component.ts
│   │   │   │   ├── register.component.html
│   │   │   │   ├── register.component.css
│   │   │   │   ├── register.component.spec.ts
│   │   ├── components/
│   │   │   ├── user-profile/
│   │   │   │   ├── user-profile.component.ts
│   │   │   │   ├── user-profile.component.html
│   │   │   │   ├── user-profile.component.css
│   │   │   │   ├── user-profile.component.spec.ts
├── assets/
├── environments/
```
import { TestBed, fakeAsync } from '@angular/core/testing';  // Importation de TestBed pour configurer l'environnement de test Angular
import { HTTP_INTERCEPTORS, HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';  // Importation des modules nécessaires pour tester les requêtes HTTP
import { AuthInterceptor } from './auth.interceptor';  // Importation de l'interceptor à tester
import { HttpClient } from '@angular/common/http';  // Importation de HttpClient pour effectuer des requêtes HTTP
import { delay, of } from 'rxjs';

describe('AuthInterceptor', () => {  // Début du bloc de tests pour AuthInterceptor
  let httpMock: HttpTestingController;  // Déclaration de la variable pour contrôler les requêtes HTTP
  let httpClient: HttpClient;  // Déclaration de la variable pour effectuer des requêtes HTTP

  beforeEach(() => {  // Avant chaque test, configuration du module de test
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Importation de HttpClientTestingModule pour tester les requêtes HTTP
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  // Fourniture de l'interceptor dans l'environnement de test
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);  // Injection de HttpTestingController pour contrôler les requêtes HTTP
    httpClient = TestBed.inject(HttpClient);  // Injection de HttpClient pour effectuer des requêtes HTTP
  });

  it('should add an Authorization header', () => {  // Test : vérifier que l'interceptor ajoute un en-tête d'autorisation
    httpClient.get('/api/test').subscribe();  // Effectuer une requête GET via HttpClient

    const httpRequest = httpMock.expectOne('/api/test');  // Attendre une requête à l'URL /api/test
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();  // Vérifier que l'en-tête 'Authorization' est présent
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer fake-token');  // Vérifier que l'en-tête 'Authorization' contient le token attendu
  });

  //Test observable
  it('should test observable', fakeAsync (() => {
    let result;
    const observable = of('expected value').pipe(delay(1000))
    observable.subscribe(value => result = value )
    //Assert
  }))

  afterEach(() => {  // Après chaque test, vérifier qu'il n'y a pas de requêtes en attente
    httpMock.verify();
  });
});


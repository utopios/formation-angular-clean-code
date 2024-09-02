import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  template: `
    <div>
      <h2>Produits</h2>
      <ul>
        <li *ngFor="let p of prods">
          {{ p.n }} - {{ p.pr }} $ (Stock: {{ p.s }})
          <button (click)="remove(p.i)">Supprimer</button>
          <button (click)="addToCart(p)">Ajouter au Panier</button>
        </li>
      </ul>
      <form (ngSubmit)="add()" #form="ngForm">
        <input type="text" name="n" [(ngModel)]="n" placeholder="Nom du Produit">
        <input type="number" name="pr" [(ngModel)]="pr" placeholder="Prix">
        <input type="number" name="s" [(ngModel)]="s" placeholder="Stock">
        <button type="submit">Ajouter Produit</button>
      </form>
      <div *ngIf="error" style="color: red;">
        {{ error }}
      </div>
    </div>
  `
})
export class ProductComponent {
  prods = [];
  n = '';
  pr = 0;
  s = 0;
  error = '';

  constructor(private http: HttpClient) {
    this.http.get('/api/products').subscribe(data => this.prods = data as any[]);
  }

  add() {
    if (this.n.length < 3 || this.pr <= 0 || this.s < 0) {
      console.log('Erreur : Données du produit invalides');
      this.error = 'Erreur : Données du produit invalides';
    } else {
      let product = { n: this.n, pr: this.pr, s: this.s };
      this.http.post('/api/products', product).subscribe(() => {
        this.prods.push(product);
        this.n = '';
        this.pr = 0;
        this.s = 0;
        this.error = '';
      });
    }
  }

  remove(i) {
    this.http.delete(`/api/products/${i}`).subscribe(() => {
      this.prods = this.prods.filter(p => p.i !== i);
    });
  }

  addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let existingProduct = cart.find(item => item.i === product.i);
    if (existingProduct) {
      existingProduct.qty += 1;
    } else {
      product.qty = 1;
      cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Produit ajouté au panier:', product);
  }
}
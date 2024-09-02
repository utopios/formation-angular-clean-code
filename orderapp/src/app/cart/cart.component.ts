import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: `
    <div>
      <h2>Panier</h2>
      <ul>
        <li *ngFor="let item of cartItems">
          {{ item.n }} - {{ item.pr }} $ (Quantité: {{ item.qty }})
          <button (click)="removeFromCart(item.i)">Retirer</button>
        </li>
      </ul>
      <p>Total : {{ getTotal() }} $</p>
      <button (click)="checkout()">Passer à la caisse</button>
    </div>
  `
})
export class CartComponent {
  cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.pr * item.qty), 0);
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.i !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  checkout() {
    console.log('Passer à la caisse avec les produits :', this.cartItems);
    // Rediriger vers la page de paiement ou autre logique
  }
}
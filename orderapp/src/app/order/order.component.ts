import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  template: `
    <div>
      <h2>Commandes</h2>
      <ul>
        <li *ngFor="let o of ords">
          {{ o.cName }} - {{ o.total }} $ ({{ o.status }})
          <button (click)="cancel(o.i)" [disabled]="o.status === 'Annulée'">Annuler Commande</button>
        </li>
      </ul>
      <form (ngSubmit)="create()" #form="ngForm">
        <input type="text" name="cName" [(ngModel)]="cName" placeholder="Nom du Client">
        <input type="text" name="pName" [(ngModel)]="pName" placeholder="Nom du Produit">
        <input type="number" name="qty" [(ngModel)]="qty" placeholder="Quantité">
        <button type="submit">Créer Commande</button>
      </form>
      <div *ngIf="error" style="color: red;">
        {{ error }}
      </div>
    </div>
  `
})
export class OrderComponent {
  ords = [];
  cName = '';
  pName = '';
  qty = 1;
  error = '';

  constructor(private http: HttpClient) {
    this.http.get('/api/orders').subscribe(data => this.ords = data as any[]);
  }

  create() {
    this.http.get(`/api/products?name=${this.pName}`).subscribe((product: any) => {
      if (product && this.qty > 0 && this.qty <= product.s) {
        let total = product.pr * this.qty;
        if (this.qty > 10) {
          total *= 0.9; // Réduction pour les commandes en gros
        }
        let order = {
          cName: this.cName,
          pName: this.pName,
          qty: this.qty,
          total: total,
          status: 'Confirmée'
        };

        this.http.post('/api/orders', order).subscribe(() => {
          this.ords.push(order);
          product.s -= this.qty;
          this.updateProductStock(product.i, product.s);
          this.cName = '';
          this.pName = '';
          this.qty = 1;
          this.error = '';
        });
      } else {
        console.log('Erreur : Produit invalide ou quantité excédant le stock');
        this.error = 'Erreur : Produit invalide ou quantité excédant le stock';
      }
    });
  }

  cancel(i) {
    this.http.get(`/api/orders/${i}`).subscribe((order: any) => {
      if (order && order.status !== 'Annulée') {
        this.http.put(`/api/orders/${i}/cancel`, {}).subscribe(() => {
          this.ords = this.ords.map(o => o.i === i ? { ...o, status: 'Annulée' } : o);
          this.updateProductStock(order.productId, order.qty + order.productStock);
        });
      }
    });
  }

  update(id, stock) {
    this.http.put(`/api/products/${id}/stock`, { stock }).subscribe(() => {
      console.log('Stock mis à jour');
    });
  }
}
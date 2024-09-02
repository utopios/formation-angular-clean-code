import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  template: `
    <div>
      <h2>Paiement</h2>
      <form (ngSubmit)="pay()" #paymentForm="ngForm">
        <input type="text" name="cardNumber" [(ngModel)]="cardNumber" placeholder="Numéro de Carte">
        <input type="text" name="cardHolder" [(ngModel)]="cardHolder" placeholder="Titulaire de la Carte">
        <input type="text" name="expiryDate" [(ngModel)]="expiryDate" placeholder="Date d'Expiration">
        <input type="text" name="cvv" [(ngModel)]="cvv" placeholder="CVV">
        <button type="submit">Payer</button>
      </form>
      <div *ngIf="error" style="color: red;">
        {{ error }}
      </div>
    </div>
  `
})
export class PaymentComponent {
  cardNumber = '';
  cardHolder = '';
  expiryDate = '';
  cvv = '';
  error = '';

  pay() {
    if (this.cardNumber.length !== 16 || this.cvv.length !== 3 || !this.expiryDate.includes('/')) {
      console.log('Erreur : Informations de paiement invalides');
      this.error = 'Erreur : Informations de paiement invalides';
    } else {
      console.log('Paiement réussi');
      // Logique pour traiter le paiement
    }
  }
}
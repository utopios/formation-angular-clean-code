import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  template: `
    <div>
      <h2>Clients</h2>
      <ul>
        <li *ngFor="let c of list">
          {{ c.n }} ({{ c.e }})
          <button (click)="del(c.i)">Supprimer</button>
        </li>
      </ul>
      <form (ngSubmit)="save()" #form="ngForm">
        <input type="text" name="n" [(ngModel)]="n" placeholder="Nom">
        <input type="email" name="e" [(ngModel)]="e" placeholder="Email">
        <button type="submit">Ajouter Client</button>
      </form>
      <div *ngIf="error" style="color: red;">
        {{ error }}
      </div>
    </div>
  `
})
export class CustomerComponent {
  list = [];
  n = '';
  e = '';
  error = '';

  constructor(private http: HttpClient) {
    this.http.get('/api/customers').subscribe(data => this.list = data as any[]);
  }

  save() {
    if (this.n.length < 3 || !this.e.includes('@')) {
      console.log('Erreur : Nom ou email invalide');
      this.error = 'Erreur : Nom ou email invalide';
    } else {
      let customer = { n: this.n, e: this.e };
      this.http.post('/api/customers', customer).subscribe(() => {
        this.list.push(customer);
        this.n = '';
        this.e = '';
        this.error = '';
      });
    }
  }

  del(i) {
    this.http.delete(`/api/customers/${i}`).subscribe(() => {
      this.list = this.list.filter(c => c.i !== i);
    });
  }
}
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-product-form',
  imports:[FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone:true
})
export class ProductFormComponent {
  @Input() product: Product = { id: 0, name: '', price: 0, stock: 0 };
  @Output() submitProduct = new EventEmitter<Product>();

  onSubmit() {
    this.submitProduct.emit(this.product);
  }
}
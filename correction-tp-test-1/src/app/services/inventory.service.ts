import { Injectable } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push({...product});
  }

  removeProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  getProducts(): Product[] {
    return this.products;
  }
}
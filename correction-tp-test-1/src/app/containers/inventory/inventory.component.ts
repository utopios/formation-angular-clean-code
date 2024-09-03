import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-inventory',
  standalone:true,
  imports:[ProductFormComponent, ProductListComponent],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.products = this.inventoryService.getProducts();
  }

  onAddOrUpdateProduct(product: Product): void {
    if (this.selectedProduct) {
      this.inventoryService.updateProduct(product);
    } else {
      this.inventoryService.addProduct(product);
    }
    this.resetForm();
  }

  onEditProduct(product: Product): void {
    this.selectedProduct = { ...product };
  }

  onDeleteProduct(productId: number): void {
    this.inventoryService.removeProduct(productId);
    this.resetForm();
  }

  private resetForm(): void {
    this.selectedProduct = null;
    this.products = this.inventoryService.getProducts();
  }
}
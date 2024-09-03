import { TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the inventory is empty', () => {
    const product = { id: 1, name: 'Product 1', price: 100, stock: 10 };
    service.addProduct(product);
    expect(service.getProducts().length).toBe(1);
    expect(service.getProducts()[0]).toEqual(product);
  });

  //Ajout d'un deuxième test

  it('should remove a product from the inventory', () => {
    const product1 = { id: 1, name: 'Product 1', price: 100, stock: 10 };
    const product2 = { id: 2, name: 'Product 2', price: 200, stock: 5 };
    service.addProduct(product1);
    service.addProduct(product2);

    service.removeProduct(1);
    expect(service.getProducts().length).toBe(1);
    expect(service.getProducts()[0]).toEqual(product2);
  });

  it('should update a product in the inventory', () => {
    const product = { id: 1, name: 'Product 1', price: 100, stock: 10 };
    service.addProduct(product);

    const updatedProduct = { id: 1, name: 'Updated Product 1', price: 150, stock: 5 };
    service.updateProduct(updatedProduct);

    expect(service.getProducts()[0].name).toBe('Updated Product 1');
    expect(service.getProducts()[0].price).toBe(150);
  });

  it('should return the list of products', () => {
    const product1 = { id: 1, name: 'Product 1', price: 100, stock: 10 };
    const product2 = { id: 2, name: 'Product 2', price: 200, stock: 5 };
    service.addProduct(product1);
    service.addProduct(product2);

    const products = service.getProducts();
    expect(products.length).toBe(2);
    expect(products).toEqual([product1, product2]);
  });
});
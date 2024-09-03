import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryComponent } from './inventory.component';
import { InventoryService } from '../../services/inventory.service';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        ProductFormComponent,  // Importez les composants standalone ici
        ProductListComponent,
        InventoryComponent
      ],
      providers: [ InventoryService ],
      schemas: [NO_ERRORS_SCHEMA]  // Utilisation de NO_ERRORS_SCHEMA pour ignorer les composants enfants
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new product to the inventory', () => {
    const product = { id: 1, name: 'Product 1', price: 100, stock: 10 };
    component.onAddOrUpdateProduct(product);

    expect(inventoryService.getProducts().length).toBe(1);
    expect(inventoryService.getProducts()[0]).toEqual(product);
  });

  it('should update an existing product in the inventory', () => {
    const product = { id: 1, name: 'Product 1', price: 100, stock: 10 };
    inventoryService.addProduct(product);

    const updatedProduct = { id: 1, name: 'Updated Product 1', price: 150, stock: 5 };
    component.onAddOrUpdateProduct(updatedProduct);

    expect(inventoryService.getProducts()[0].name).toBe('Updated Product 1');
  });

  it('should remove a product from the inventory', () => {
    const product = { id: 1, name: 'Product 1', price: 100, stock: 10 };
    inventoryService.addProduct(product);

    component.onDeleteProduct(1);

    expect(inventoryService.getProducts().length).toBe(0);
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //declarations: [ ProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.products = [
      { id: 1, name: 'Product 1', price: 100, stock: 10 },
      { id: 2, name: 'Product 2', price: 200, stock: 5 }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editProduct event when onEdit is called', () => {
    spyOn(component.editProduct, 'emit');

    const product = component.products[0];
    component.onEdit(product);

    expect(component.editProduct.emit).toHaveBeenCalledWith(product);
  });

  it('should emit deleteProduct event when onDelete is called', () => {
    spyOn(component.deleteProduct, 'emit');

    const productId = component.products[0].id;
    component.onDelete(productId);

    expect(component.deleteProduct.emit).toHaveBeenCalledWith(productId);
  });
});
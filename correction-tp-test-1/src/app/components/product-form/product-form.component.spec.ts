import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { FormsModule } from '@angular/forms';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //declarations: [ ProductFormComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitProduct event with product data', () => {
    const product = { id: 1, name: 'Test Product', price: 100, stock: 10 };
    component.product = product;

    spyOn(component.submitProduct, 'emit');

    component.onSubmit();

    expect(component.submitProduct.emit).toHaveBeenCalledWith(product);
  });
});
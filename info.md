## Tools
- git (avec repos github)
- vscode
- docker
- nodejs
- cli angular


## Command pour démarrer un conteneur docker
docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest

## Structure de base pour la correction orderapp

src/
├── app/
│   ├── components/
│   │   ├── customer/
│   │   │   ├── customer.component.ts
│   │   │   ├── customer.component.html
│   │   │   ├── customer.component.css
│   │   ├── product/
│   │   │   ├── product.component.ts
│   │   │   ├── product.component.html
│   │   │   ├── product.component.css
│   │   ├── order/
│   │   │   ├── order.component.ts
│   │   │   ├── order.component.html
│   │   │   ├── order.component.css
│   │   ├── cart/
│   │   │   ├── cart.component.ts
│   │   │   ├── cart.component.html
│   │   │   ├── cart.component.css
│   │   ├── payment/
│   │   │   ├── payment.component.ts
│   │   │   ├── payment.component.html
│   │   │   ├── payment.component.css
│   ├── services/
│   │   ├── customer.service.ts
│   │   ├── product.service.ts
│   │   ├── order.service.ts
│   │   ├── cart.service.ts
│   │   ├── payment.service.ts
│   ├── models/
│   │   ├── customer.model.ts
│   │   ├── product.model.ts
│   │   ├── order.model.ts
│   │   ├── cart.model.ts
│   │   ├── payment.model.ts
│   ├── validators/
│   │   ├── customer.validator.ts
│   │   ├── product.validator.ts
│   ├── app.module.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
└──

### Code smells 

1. Fonctions trop longues

```typescript
function calculateInvoice(order) {
let total = 0;
for (let i = 0; i < order.items.length; i++) {
    total += order.items[i].price * order.items[i].quantity;
}
if (order.customer.isLoyal) {
    total *= 0.9;
}
if (order.customer.isVip) {
    total *= 0.85;
}
let tax = total * 0.2;
total += tax;
console.log(`Total: ${total}`);
return total;
}
```

2. Complexité cyclomatique 
```typescript
if (customer.isLoyal) {
if (order.amount > 100) {
    if (order.date.isWeekend()) {
    applyDiscount(order);
    }
}
}
```

3. Fonctions trop paramétrées
```typescript
function createOrder(customerId, productId, quantity, shippingAddress, paymentMethod, discountCode) {
       // ...
     }

function createOrder(order: OrderDTO) {
// ...
}
```

4. Code dupliqué
5. Dead Code
6. Accès a des variables globales
7. Classes Trop Grandes

```
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users = [];
  newUser = { name: '', email: '', role: '' };
  products = [];
  newProduct = { name: '', price: 0, stock: 0 };
  orders = [];
  errorMessage = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProducts();
    this.loadOrders();
  }

  loadUsers(): void {
    this.http.get('/api/users').subscribe(
      (data: any) => this.users = data,
      error => this.errorMessage = 'Failed to load users'
    );
  }

  addUser(): void {
    if (this.newUser.name === '' || this.newUser.email === '') {
      this.errorMessage = 'User name and email are required';
      return;
    }
    this.http.post('/api/users', this.newUser).subscribe(
      () => {
        this.users.push(this.newUser);
        this.newUser = { name: '', email: '', role: '' };
      },
      error => this.errorMessage = 'Failed to add user'
    );
  }

  deleteUser(id: number): void {
    this.http.delete(`/api/users/${id}`).subscribe(
      () => this.users = this.users.filter(u => u.id !== id),
      error => this.errorMessage = 'Failed to delete user'
    );
  }

  loadProducts(): void {
    this.http.get('/api/products').subscribe(
      (data: any) => this.products = data,
      error => this.errorMessage = 'Failed to load products'
    );
  }

  addProduct(): void {
    if (this.newProduct.name === '' || this.newProduct.price <= 0) {
      this.errorMessage = 'Product name and price are required';
      return;
    }
    this.http.post('/api/products', this.newProduct).subscribe(
      () => {
        this.products.push(this.newProduct);
        this.newProduct = { name: '', price: 0, stock: 0 };
      },
      error => this.errorMessage = 'Failed to add product'
    );
  }

  deleteProduct(id: number): void {
    this.http.delete(`/api/products/${id}`).subscribe(
      () => this.products = this.products.filter(p => p.id !== id),
      error => this.errorMessage = 'Failed to delete product'
    );
  }

  loadOrders(): void {
    this.http.get('/api/orders').subscribe(
      (data: any) => this.orders = data,
      error => this.errorMessage = 'Failed to load orders'
    );
  }

  addOrder(userId: number, productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.errorMessage = 'Quantity must be greater than zero';
      return;
    }
    const order = {
      userId: userId,
      productId: productId,
      quantity: quantity
    };
    this.http.post('/api/orders', order).subscribe(
      () => this.orders.push(order),
      error => this.errorMessage = 'Failed to add order'
    );
  }

  deleteOrder(id: number): void {
    this.http.delete(`/api/orders/${id}`).subscribe(
      () => this.orders = this.orders.filter(o => o.id !== id),
      error => this.errorMessage = 'Failed to delete order'
    );
  }
}
```
Exemple Architectures

src/
├── app/
|  ├── core
|  |  ├── interceptor
|  |  ├── guards        
|  |  └── core.module.ts
|  ├── shared
|  |  ├── modules (bootstrap, material,...)        
|  |  ├── uicomponents
|  |  ├── directives
|  |  ├── pipes
|  |  └── shared.module.ts
|  ├── FirstFeature
|  |  ├── components
|  |  ├── containers
|  |  ├── pages
|  |  ├── first-feature-routing.module.ts
|  |  └── first-feature.module.ts
|  ├── SecondFeature    
        ├── components
        ├── containers
        ├── pages
        ├── second-feature-routing.module.ts
        └── second-feature.module.ts



src/
├── app/
|  ├── core
|  |  ├── interceptors
|  |  |  └── auth.interceptor.ts
|  |  ├── guards
|  |  |  └── auth.guard.ts
|  |  ├── services
|  |  |  ├── http.service.ts
|  |  |  └── shared-data.service.ts
|  |  └── core.module.ts
|  ├── shared
|  |  ├── components
|  |  |  └── loader.component.ts
|  |  ├── directives
|  |  |  └── autofocus.directive.ts
|  |  ├── pipes
|  |  |  └── capitalize.pipe.ts
|  |  ├── modules
|  |  |  └── material.module.ts
|  |  └── shared.module.ts
|  ├── features
|  |  ├── order-feature
|  |  |  ├── components
|  |  |  |  └── order-list.component.ts
|  |  |  ├── containers
|  |  |  |  └── order-container.component.ts
|  |  |  ├── pages
|  |  |  |  └── order-page.component.ts
|  |  |  ├── models
|  |  |  |  └── order.model.ts
|  |  |  ├── services
|  |  |  |  └── order.service.ts
|  |  |  └── order-feature.module.ts
|  |  ├── product-feature
|  |  |  ├── components
|  |  |  |  └── product-list.component.ts
|  |  |  ├── containers
|  |  |  |  └── product-container.component.ts
|  |  |  ├── pages
|  |  |  |  └── product-page.component.ts
|  |  |  ├── models
|  |  |  |  └── product.model.ts
|  |  |  ├── services
|  |  |  |  └── product.service.ts
|  |  |  └── product-feature.module.ts
|  |  ├── customer-feature
|  |  |  ├── components
|  |  |  |  └── customer-list.component.ts
|  |  |  ├── containers
|  |  |  |  └── customer-container.component.ts
|  |  |  ├── pages
|  |  |  |  └── customer-page.component.ts
|  |  |  ├── models
|  |  |  |  └── customer.model.ts
|  |  |  ├── services
|  |  |  |  └── customer.service.ts
|  |  |  └── customer-feature.module.ts
|  ├── app-routing.module.ts
|  └── app.module.ts  
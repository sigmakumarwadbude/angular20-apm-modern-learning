# Milestone 03: Product List

## Overview

This milestone introduces the first business feature of the application: Products.

The goal is to establish the Product feature architecture while implementing a Product List page. The architecture follows modern Angular 20 practices using:

* Standalone Components
* Signals
* Feature-based organization
* Route-level lazy loading
* Tailwind CSS
* Smart vs Dumb component architecture

At the end of this milestone, users can navigate to `/products` and view a list of products with images loaded from a Product Service.

---

## Objectives

* Create Product feature structure
* Create Product domain model
* Create mock product data
* Create Product Service
* Create Product List page
* Display product images
* Configure lazy-loaded routes
* Add Products navigation link
* Establish Smart vs Dumb architecture

---

## Git Information

### Branch

```bash
feature/03-product-list
```

### Tag

```bash
03-product-list
```

---

## Project Structure

```text
src/app/
├── features/
│   └── products/
│       ├── components/
│       │   ├── product-card/
│       │   └── product-search/
│       │
│       ├── models/
│       │   └── product.model.ts
│       │
│       ├── data/
│       │   └── products.ts
│       │
│       ├── pages/
│       │   ├── product-list/
│       │   │   ├── product-list.component.ts
│       │   │   ├── product-list.component.html
│       │   │   └── product-list.component.css
│       │   │
│       │   ├── product-detail/
│       │   └── product-edit/
│       │
│       ├── services/
│       │   └── product.service.ts
│       │
│       └── routes.ts
│
├── app.routes.ts
└── app.component.ts

assets/
└── images/
    └── products/
```

---

## Product Feature Architecture

```text
ProductService
       │
       ▼
ProductListPage (Smart)
       │
       ├── ProductCardComponent (Future)
       │
       └── ProductSearchComponent (Future)
```

This milestone focuses on the Product List page.

Reusable child components will be introduced in later milestones.

---

## Step 1: Create Product Model

### models/product.model.ts

```ts
export interface Product {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}
```

---

## Step 2: Create Mock Product Data

### data/products.ts

```ts
import { Product } from '../models/product.model';

export const PRODUCTS: Product[] = [
  {
    productId: 1,
    productName: 'Leaf Rake',
    productCode: 'GDN-0011',
    releaseDate: 'March 19, 2024',
    price: 19.95,
    description: 'Leaf rake with wooden handle.',
    starRating: 3.5,
    imageUrl: 'assets/images/products/leaf_rake.png'
  },
  {
    productId: 2,
    productName: 'Garden Cart',
    productCode: 'GDN-0023',
    releaseDate: 'March 18, 2024',
    price: 32.99,
    description: 'Heavy-duty garden cart.',
    starRating: 4.2,
    imageUrl: 'assets/images/products/garden_cart.png'
  }
];
```

---

## Step 3: Create Product Service

### services/product.service.ts

```ts
import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';
import { PRODUCTS } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(): Product[] {
    return PRODUCTS;
  }

}
```

---

## Step 4: Create Product List Page

### pages/product-list/product-list.component.ts

```ts
import { Component, inject, signal } from '@angular/core';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

  private productService =
    inject(ProductService);

  products = signal(
    this.productService.getProducts()
  );

}
```

---

## Step 5: Create Product List Template

### product-list.component.html

```html
<div class="overflow-x-auto">

  <table class="table w-full">

    <thead>
      <tr>
        <th>Image</th>
        <th>Product</th>
        <th>Code</th>
        <th>Price</th>
      </tr>
    </thead>

    <tbody>

      @for (
        product of products();
        track product.productId
      ) {

        <tr>

          <td>
            <img
              [src]="product.imageUrl"
              [alt]="product.productName"
              [title]="product.productName"
              class="w-16 rounded-md object-contain" />
          </td>

          <td>
            {{ product.productName }}
          </td>

          <td>
            {{ product.productCode }}
          </td>

          <td>
            {{ product.price | currency }}
          </td>

        </tr>

      }

    </tbody>

  </table>

</div>
```

---

## Step 6: Create Product Routes

### routes.ts

```ts
import { Routes } from '@angular/router';

import { ProductListComponent }
from './pages/product-list/product-list.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];
```

---

## Step 7: Configure Lazy Loading

### app.routes.ts

```ts
{
  path: 'products',
  loadChildren: () =>
    import('./features/products/routes')
      .then(m => m.PRODUCT_ROUTES)
}
```

---

## Step 8: Update Navigation

Add a Products navigation link.

```html
<a
  routerLink="/products"
  routerLinkActive="font-bold">
  Products
</a>
```

---

## Angular Concepts Learned

### Feature-Based Architecture

```text
features/
└── products/
```

Groups code around business domains.

Benefits:

* Better scalability
* Easier maintenance
* Clear ownership

---

### Standalone Components

```ts
@Component({
  standalone: true
})
```

Benefits:

* No NgModules required
* Simpler architecture
* Better lazy loading support

---

### Signals

```ts
products = signal(...)
```

Benefits:

* Reactive state
* Simple API
* Better performance

---

### Route-Level Lazy Loading

```ts
loadChildren(...)
```

Benefits:

* Smaller initial bundle
* Faster startup
* Better scalability

---

### Tailwind CSS

Used for:

```text
Responsive Layouts
Tables
Cards
Spacing
Typography
```

Example:

```html
class="w-16 rounded-md object-contain"
```

---

## Architecture Evolution

### Before

```text
Home Feature
```

### After

```text
Home Feature
       │
       ▼
Product Feature
       │
       ▼
Product List
```

---

## Validation Checklist

* [ ] Product model created
* [ ] Mock data created
* [ ] Product service created
* [ ] Product images added
* [ ] Product list page created
* [ ] Products route configured
* [ ] Lazy loading configured
* [ ] Navigation updated
* [ ] Product list displays correctly
* [ ] Application builds successfully

---

## Commit History

### Commit 1

```bash
git commit -m "feat(products): add product domain model and create product service"
```

Includes:

* Product interface
* Product mock data
* Product service

---

### Commit 2

```bash
git commit -m "feat(products): create product list page and configure lazy-loaded routes"
```

Includes:

* Product list page
* Product routes
* Lazy loading
* Products navigation link
* Product images
* imageUrl mapping
* Tailwind image styling

---

### Commit 3

```bash
git commit -m "feat(products): add mock product data and update ProductService to use it"
```

---

## Pull Request

### Title

```text
feat(products): implement product list feature
```

### Description

* Added Product feature architecture
* Added Product domain model
* Added Product service
* Added Product list page
* Added Product images
* Configured lazy-loaded routes
* Added Products navigation
* Established foundation for future product features

---

## Milestone Progress

```text
✅ 00-tailwind-complete
✅ 01-home-feature
✅ 02-navigation
✅ 03-product-list
⬜ 04-product-filter
⬜ 05-product-detail
⬜ 06-star-component
⬜ 07-http-client
⬜ 08-loading-states
⬜ 09-resource-api
⬜ 10-signal-store
```

---

## Next Milestone

### Milestone 04: Product Filter

Upcoming topics:

* signal()
* computed()
* Search input
* Reactive filtering
* ProductSearchComponent
* Smart vs Dumb components
* Derived state
* Angular Signals architecture

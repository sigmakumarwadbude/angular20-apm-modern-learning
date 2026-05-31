import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data/products';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  products = PRODUCTS;

  getProducts() {
    return of(this.products)
  }
}

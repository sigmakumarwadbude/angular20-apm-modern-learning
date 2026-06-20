import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { PRODUCTS } from '../data/products';

@Injectable({ providedIn: 'root' })
export class ProductService {

  getProducts(): IProduct[] {
    return PRODUCTS;
  }
}

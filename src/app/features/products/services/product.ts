import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data/products';
import { map, Observable, of } from 'rxjs';
import { Product as IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = PRODUCTS;

  getProducts(): Observable<IProduct[]>  {
    return of(this.products)
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts().pipe(
      map(products =>
        products.find(product => product.id === id)
      )
    );
  }
}

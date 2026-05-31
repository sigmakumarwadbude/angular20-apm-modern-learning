import { Component } from '@angular/core';
import { PRODUCTS } from '../../data/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
})
export class ProductList {
  products = PRODUCTS;
  showImage = true;

  toggleImage() {
    this.showImage = !this.showImage;
  }
}

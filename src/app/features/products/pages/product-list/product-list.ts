import { Component, computed, signal } from '@angular/core';
import { PRODUCTS } from '../../data/products';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.html',
})
export class ProductList {
  protected readonly pageTitle = 'Products';
  products = PRODUCTS;
  showImage = true;

  listFilter = signal('');

  filteredProducts = computed(() =>
  this.products.filter(product =>
    product.productName
      .toLowerCase()
      .includes(this.listFilter().toLowerCase())
  )
);

  toggleImage() {
    this.showImage = !this.showImage;
  }
}

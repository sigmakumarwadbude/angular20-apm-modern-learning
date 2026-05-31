import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { Product as ProductService } from '../../services/product';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.html',
})
export class ProductList {
  protected readonly pageTitle = 'Products';

  protected readonly productService = inject(ProductService);
  
  products = toSignal(
    this.productService.getProducts(),
    { initialValue: []}
  );

  showImage = true;

  listFilter = signal('');

  filteredProducts = computed(() =>
  this.products().filter(product =>
    product.productName
      .toLowerCase()
      .includes(this.listFilter().toLowerCase())
  )
);

  toggleImage() {
    this.showImage = !this.showImage;
  }
}

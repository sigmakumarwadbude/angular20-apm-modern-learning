import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  pageTitle = 'Product List';
  private productService = inject(ProductService);
  products = signal(this.productService.getProducts());
}

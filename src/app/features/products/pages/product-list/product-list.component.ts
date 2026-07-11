import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { StarComponent } from '../../../../shared/components/star/star.component';
import { ConvertToSpacesPipe } from '../../../../shared/pipes/convert-to-spaces.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule, ProductSearchComponent, StarComponent, ConvertToSpacesPipe],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  pageTitle = 'Product List';
  private productService = inject(ProductService);
  products = signal(this.productService.getProducts());

  searchTerm = signal('');
  filteredProducts = computed(() => {
    const filter = this.searchTerm().toLowerCase();
    return this.products().filter((product) => product.productName.toLowerCase().includes(filter));
  });

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onRatingClicked(message: string): void {
    console.log(message);
  }
}

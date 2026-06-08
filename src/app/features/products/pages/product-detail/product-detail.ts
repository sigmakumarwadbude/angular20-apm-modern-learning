import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { ProductService } from '../../services/product';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, LowerCasePipe],
  templateUrl: './product-detail.html',
})
export class ProductDetailPage {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  readonly productId = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));

  product = toSignal(this.productService.getProduct(this.productId), {
    initialValue: null,
  });
}

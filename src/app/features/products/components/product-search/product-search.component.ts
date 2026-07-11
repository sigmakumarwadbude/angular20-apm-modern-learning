import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="mb-6 max-w-md">
      <label for="product-search" class="mb-2 block text-sm font-medium text-gray-700">
        Search Products
      </label>

      <div class="relative">
        <span
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
        >
          🔍
        </span>

        <input
          id="product-search"
          #searchBox
          type="text"
          placeholder="Search products..."
          class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          [value]="searchTerm()"
          (input)="onSearch(searchBox.value)"
        />
      </div>
    </div>
  `,
})
export class ProductSearchComponent {
  searchTerm = input('');
  searchChange = output<string>();
  onSearch(value: string): void {
    this.searchChange.emit(value);
  }
}

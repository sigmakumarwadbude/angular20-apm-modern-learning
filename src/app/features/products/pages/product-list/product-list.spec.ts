import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ProductList } from './product-list';
import { Product as ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { PRODUCTS } from '../../data/products';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;
  let productsSubject: BehaviorSubject<Product[]>;

  const mockProducts: Product[] = PRODUCTS as Product[];

  beforeEach(async () => {
    productsSubject = new BehaviorSubject<Product[]>(mockProducts);

    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        provideRouter([]),
        {
          provide: ProductService,
          useValue: {
            getProducts: () => productsSubject.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product names', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain(mockProducts[0].productName);
    expect(text).toContain(mockProducts[1].productName);
  });

  it('should render a row for each product', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(mockProducts.length);
  });

  it('should not render table when there are no products', () => {
    productsSubject.next([]);

    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table');

    expect(table).toBeNull();
  });

  it('should show empty state when no products exist', () => {
    productsSubject.next([]);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent)
      .toContain('No products available.');
  });

  it('should filter displayed products', () => {
    component.listFilter.set('leaf');

    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(component.filteredProducts().length).toBe(1);
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Leaf Rake');
  });

  it('should toggle image visibility when button is clicked', () => {
    let images = fixture.nativeElement.querySelectorAll('img');

    expect(images.length).toBeGreaterThan(0);

    const button = fixture.nativeElement.querySelector('button');

    button.click();
    fixture.detectChanges();

    images = fixture.nativeElement.querySelectorAll('img');

    expect(component.showImage).toBeFalse();
    expect(images.length).toBe(0);
  });

  it('should render product detail links', () => {
    const links = fixture.nativeElement.querySelectorAll('tbody a');

    expect(links.length).toBe(mockProducts.length);
    expect(links[0].textContent).toContain('Leaf Rake');
  });
});
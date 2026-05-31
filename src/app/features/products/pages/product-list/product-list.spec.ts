import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList } from './product-list';
import { provideRouter } from '@angular/router';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product names', () => {
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain(component.products[0].productName);
  });

  it('should render a row for each filtered product', () => {
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(component.products.length);
  });

  it('should not render table when there are no products', () => {
    component.products = [];

    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table');

    expect(table).toBeNull();
  });
  it('should show empty state when no products exist', () => {
    component.products = [];

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No products available.');
  });

  it('should filter displayed products', () => {
    component.listFilter.set('leaf');

    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(component.filteredProducts().length);
  });

  it('should toggle image visibility when button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');

    expect(component.showImage).toBeTrue();

    button.click();
    fixture.detectChanges();

    expect(component.showImage).toBeFalse();
  });

  it('should render product detail links', () => {
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('tbody a');

    expect(link).toBeTruthy();
  });
});

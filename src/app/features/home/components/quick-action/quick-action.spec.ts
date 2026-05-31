import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QuickAction } from './quick-action';

describe('QuickAction', () => {
  let component: QuickAction;
  let fixture: ComponentFixture<QuickAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickAction],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickAction);
    component = fixture.componentInstance;
  });

  it('should create and render label and routerLink correctly', () => {
    fixture.componentRef.setInput('label', 'View Products');
    fixture.componentRef.setInput('route', '/products');
    fixture.detectChanges();

    expect(component).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    const anchor = compiled.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor?.textContent?.trim()).toBe('View Products');
    expect(anchor?.getAttribute('href')).toBe('/products');
  });
});

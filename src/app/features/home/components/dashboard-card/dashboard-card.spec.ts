import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCard } from './dashboard-card';

describe('DashboardCard', () => {
  let component: DashboardCard;
  let fixture: ComponentFixture<DashboardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCard);
    component = fixture.componentInstance;
  });

  it('should create and render title and value correctly', () => {
    fixture.componentRef.setInput('title', 'Active Users');
    fixture.componentRef.setInput('value', 42);
    fixture.detectChanges();

    expect(component).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text-sm')?.textContent?.trim()).toBe('Active Users');
    expect(compiled.querySelector('.text-3xl')?.textContent?.trim()).toBe('42');
  });
});

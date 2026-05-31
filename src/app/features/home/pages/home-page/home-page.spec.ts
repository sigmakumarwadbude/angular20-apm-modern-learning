import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

import { HomePage } from './home-page';
import { HomeService } from '../../services/home.service';
import { PAGE_TITLE } from '../../constants/home.constants';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockHomeService: Partial<HomeService>;

  beforeEach(async () => {
    mockHomeService = {
      stats: signal([
        { title: 'Products', value: 100, icon: 'inventory' },
        { title: 'Categories', value: 10, icon: 'category' }
      ])
    };

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideRouter([]),
        { provide: HomeService, useValue: mockHomeService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render correct title, dashboard cards and quick actions', () => {
    expect(component).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check Hero title
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(PAGE_TITLE);
    
    // Check the number of dashboard cards rendered (should be 2 based on mockHomeService)
    const dashboardCards = compiled.querySelectorAll('app-dashboard-card');
    expect(dashboardCards.length).toBe(2);

    // Check quick actions rendered
    const quickActions = compiled.querySelectorAll('app-quick-action');
    expect(quickActions.length).toBe(3);
  });
});

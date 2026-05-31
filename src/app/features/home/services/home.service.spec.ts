import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { DASHBOARD_STATS } from '../constants/home.constants';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize stats signal with 4 dashboard stats', () => {
    const stats = service.stats();

    expect(stats.length).toBe(4);

    expect(stats).toEqual(DASHBOARD_STATS);
  });

  it('should contain the expected dashboard stat values', () => {
    const stats = service.stats();

    expect(stats[0].title).toBe('Products');
    expect(stats[0].value).toBe(125);

    expect(stats[1].title).toBe('Categories');
    expect(stats[1].value).toBe(12);

    expect(stats[2].title).toBe('Users');
    expect(stats[2].value).toBe(58);

    expect(stats[3].title).toBe('Orders');
    expect(stats[3].value).toBe(243);
  });
});
import { Injectable, signal } from '@angular/core';
import { DashboardStat } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  stats = signal<DashboardStat[]>([
    {
      title: 'Products',
      value: 125,
      icon: 'inventory'
    },
    {
      title: 'Categories',
      value: 12,
      icon: 'category'
    },
    {
      title: 'Users',
      value: 58,
      icon: 'group'
    },
    {
      title: 'Orders',
      value: 243
,
      icon: 'shopping_cart'
    }
  ]);
}
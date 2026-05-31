import { DashboardStat } from '../models/dashboard.model';

export const PAGE_TITLE = 'Welcome to APM';

export const PAGE_SUBTITLE =
  'Acme Product Management Dashboard';

export const DASHBOARD_STATS: DashboardStat[] = [
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
    value: 243,
    icon: 'shopping_cart'
  }
];
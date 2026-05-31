import { Injectable, signal } from '@angular/core';
import { DashboardStat } from '../models/dashboard.model';
import { DASHBOARD_STATS } from '../constants/home.constants';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  stats = signal<DashboardStat[]>(DASHBOARD_STATS);
}
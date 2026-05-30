import { Component, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { DashboardCard } from '../../components/dashboard-card/dashboard-card';
import { QuickAction } from '../../components/quick-action/quick-action';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule,
    DashboardCard,
    QuickAction],
  templateUrl: './home-page.html',
})
export class HomePage {
private homeService = inject(HomeService);

  stats = this.homeService.stats;
}

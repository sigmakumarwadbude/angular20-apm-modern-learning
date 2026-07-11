import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { HomeService } from '../../services/home.service';

import { DashboardCard } from '../../components/dashboard-card/dashboard-card';
import { QuickAction } from '../../components/quick-action/quick-action';
import { PAGE_SUBTITLE, PAGE_TITLE } from '../../constants/home.constants';

@Component({
  selector: 'app-home-page',
  imports: [DashboardCard, QuickAction],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly pageTtitle = PAGE_TITLE;
  protected readonly pageSubTitle = PAGE_SUBTITLE;
  private homeService = inject(HomeService);

  stats = this.homeService.stats;
}

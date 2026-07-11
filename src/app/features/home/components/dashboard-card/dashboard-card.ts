import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  imports: [],
  template:`
  <div
    class="
      bg-white
      rounded-xl
      shadow
      p-6
      hover:shadow-lg
      transition
    "
  >
    <div class="text-sm text-gray-500">
      {{ title() }}
    </div>

    <div class="text-3xl font-bold mt-2">
      {{ value() }}
    </div>
  </div>
  `,
})
export class DashboardCard {
  title = input.required<string>();

  value = input.required<number>();
}

import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-action',
  imports: [RouterLink],
  template: `
  <a
    [routerLink]="route()"
    class="
      bg-blue-600
      text-white
      px-4
      py-3
      rounded-lg
      hover:bg-blue-700
      transition
      block
      text-center
    "
  >
    {{ label() }}
  </a>
  `
})
export class QuickAction {
  label = input.required<string>();

  route = input.required<string>();
}

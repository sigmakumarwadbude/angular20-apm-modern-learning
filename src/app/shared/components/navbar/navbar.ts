import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <nav class="bg-white shadow px-6 py-4">
      <ul class="flex gap-6">
        <li>
          <a
            routerLink="/"
            routerLinkActive="font-bold border-b-2 border-blue-600"
            [routerLinkActiveOptions]="{ exact: true }"
            >Home</a
          >
        </li>
        <li>
          <a routerLink="/products" routerLinkActive="font-bold border-b-2 border-blue-600"
            >Products</a
          >
        </li>
      </ul>
    </nav>
  `,
})
export class Navbar {}

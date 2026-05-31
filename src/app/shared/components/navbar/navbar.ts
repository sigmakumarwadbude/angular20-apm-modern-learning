import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white shadow px-6 py-4">
      <ul class="flex gap-6">
        <li>
          <a routerLink="/" routerLinkActive="font-bold" [routerLinkActiveOptions]="{ exact: true }"> Home </a>
        </li>
        <li>
          <a routerLink="/products" routerLinkActive="font-bold"> Products </a>
        </li>
      </ul>
    </nav>
  `,
})
export class Navbar {}

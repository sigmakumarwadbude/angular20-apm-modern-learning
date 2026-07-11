import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  template: `
  <div class="min-h-screen bg-slate-100">
    <app-navbar />

    <main>
      <div class="max-w-7xl mx-auto px-4 py-6 lg:px-8">
        <router-outlet />
      </div>
    </main>
  </div>
  `
})
export class App {}

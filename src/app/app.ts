import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
  <div class="min-h-screen bg-slate-100">

    <main class="container mx-auto p-6">

      <router-outlet />

    </main>

  </div>
  `
})
export class App {}

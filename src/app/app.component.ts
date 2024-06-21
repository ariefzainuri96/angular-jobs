import { Component, isDevMode } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AngularQueryDevtools],
  template: `
    <router-outlet></router-outlet>
    @if (isDevMode) {
      <angular-query-devtools></angular-query-devtools>
    }
  `,
})
export class AppComponent {
  isDevMode = !environment.production;
}

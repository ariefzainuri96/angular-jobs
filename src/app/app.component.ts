import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { environment } from '../environments/environment';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent,
    RouterLink,
    RouterLinkActive,
    AngularQueryDevtools,
  ],
  template: `
    <router-outlet></router-outlet>
    <app-toast></app-toast>
    @if (isDevMode) {
      <angular-query-devtools></angular-query-devtools>
    }
  `,
})
export class AppComponent {
  isDevMode = !environment.production;
}

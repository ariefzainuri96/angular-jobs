import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { twMerge } from 'tailwind-merge';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'base-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  template: `
    <body class="h-screen max-h-screen w-screen overflow-hidden">
      <!-- header -->
      <header class="fixed inset-x-0">
        <nav
          class="flex h-[56px] w-full flex-row items-center justify-center gap-2 bg-indigo-700 px-4"
        >
          <div class="flex flex-1 flex-row">
            <a
              routerLink="/"
              routerLinkActive="active"
              class="text-2xl font-bold text-white"
              >Angular Jobs</a
            >
          </div>
          <a
            routerLink="/jobs"
            routerLinkActive="active"
            [class]="
              merge(
                'rounded-lg p-2 font-semibold text-white hover:bg-black',
                currentRoute === '/jobs' ? 'bg-black' : ''
              )
            "
          >
            Jobs
          </a>
          <a
            routerLink="/add-jobs"
            routerLinkActive="active"
            [class]="
              merge(
                'rounded-lg p-2 font-semibold text-white hover:bg-black',
                currentRoute === '/add-jobs' ? 'bg-black' : ''
              )
            "
          >
            Add Jobs
          </a>
          <button
            (click)="logout()"
            class="rounded-lg p-2 font-semibold text-white hover:bg-black"
          >
            Logout
          </button>
        </nav>
      </header>
      <!-- content -->
      <router-outlet></router-outlet>
    </body>
  `,
})
export class BaseLayout {
  constructor(private route: Router) {}

  routeSubscription: Subscription | null = null;
  currentRoute = '';

  ngOnInit(): void {
    this.routeSubscription = this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  merge(style: string, extendedStyle?: string) {
    return twMerge(style, extendedStyle);
  }

  logout() {
    localStorage.removeItem('user');

    this.route.navigateByUrl('login', { replaceUrl: true });
  }
}

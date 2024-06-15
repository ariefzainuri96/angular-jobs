import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { Subscription } from 'rxjs';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AngularQueryDevtools],
  template: `
    <div class="flex h-screen max-h-screen w-screen flex-col overflow-hidden">
      <!-- header -->
      <div
        class="flex h-[56px] w-full flex-row items-center gap-2 bg-indigo-700 px-4"
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
      </div>
      <!-- content -->
      <div class="w-full flex-1 overflow-y-auto">
        <router-outlet></router-outlet>
      </div>
    </div>
    <angular-query-devtools initialIsOpen />
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private route: Router) {}

  title = 'Home';
  routeSubscription: Subscription | null = null;
  currentRoute = '';

  ngOnInit(): void {
    this.routeSubscription = this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log(this.currentRoute);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  merge(style: string, extendedStyle?: string) {
    return twMerge(style, extendedStyle);
  }
}

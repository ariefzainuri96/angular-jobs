import { Component, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'dashboard-action',
  standalone: true,
  imports: [],
  template: `
    <div [class]="merge('flex flex-col items-start rounded-lg p-4')">
      <span class="text-lg font-semibold">{{ title() }}</span>
      <p class="mt-3 line-clamp-1 text-sm">{{ descrption() }}</p>
      <ng-content select="[action-btn]"></ng-content>
    </div>
  `,
})
export class DashboardAction {
  className = input<string>();
  title = input<string>();
  descrption = input<string>();

  merge(style: string) {
    return twMerge(style, this.className());
  }
}

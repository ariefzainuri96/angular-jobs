import { Component, computed, input, signal } from '@angular/core';
import { JobItem } from '../../../data/model/job-item';

@Component({
  selector: 'jobs-item',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col items-start rounded-lg bg-white p-4">
      <p class="text-sm text-slate-500">{{ job()?.type }}</p>
      <p class="mt-2 text-lg font-bold">{{ job()?.title }}</p>
      <p class="mt-2 text-sm">
        {{ description() }}
        <span
          (click)="showMore.set(!showMore())"
          class="cursor-pointer text-sm text-slate-500"
          >{{ showMore() ? 'Show less' : 'Show more' }}</span
        >
      </p>
    </div>
  `,
})
export class JobsItem {
  job = input<JobItem>();
  showMore = signal(false);

  description = computed(() => {
    return this.showMore()
      ? this.job()?.description ?? ''
      : `${(this.job()?.description ?? '').slice(0, 90)}...`;
  });
}

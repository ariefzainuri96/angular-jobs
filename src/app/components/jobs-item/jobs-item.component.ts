import {
  AfterViewInit,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { JobItem } from '../../../data/model/job-item';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixSewingPinFilled } from '@ng-icons/radix-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'jobs-item',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive],
  providers: [provideIcons({ radixSewingPinFilled })],
  template: `
    <div class="flex flex-col items-start rounded-lg bg-white p-4">
      <p class="text-[16px] text-slate-500">{{ job()?.type }}</p>
      <p class="mt-2 text-lg font-bold">{{ job()?.title }}</p>
      <p class="mt-2 text-[16px]">
        {{ description() }}
        <span
          (click)="showMore.set(!showMore())"
          class="cursor-pointer text-[16px] text-slate-500"
          >{{ showMore() ? 'Show less' : 'Show more' }}</span
        >
      </p>
      <span class="mt-2 text-[16px] text-indigo-600">{{ job()?.salary }}</span>
      <div class="my-2 h-[1px] w-full bg-slate-200"></div>
      <div class="flex flex-row items-center">
        <ng-icon name="radixSewingPinFilled" class="text-red-600"></ng-icon>
        <span class="ml-2 text-sm font-semibold text-red-600">{{
          job()?.location
        }}</span>
      </div>
      <a
        [routerLink]="'/jobs/' + job()?.id"
        class="btn mt-2 w-full bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Read More
      </a>
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

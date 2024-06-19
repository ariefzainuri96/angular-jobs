import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs-detail-skeleton',
  standalone: true,
  imports: [],
  template: `
    <div class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
      <!-- left section -->
      <div class="flex flex-col gap-2 sm:col-span-2">
        <div class="base-card">
          <div class="skeleton h-4 w-[35%]"></div>
          <div class="skeleton mt-4 h-6 w-[75%] rounded-md"></div>
          <div class="skeleton mt-2 h-3 w-[40%]"></div>
        </div>
        <div class="base-card">
          <div class="skeleton h-3 w-[35%]"></div>
          <div class="skeleton mt-2 h-3 w-[85%]"></div>
          <div class="skeleton mt-1 h-3 w-[89%]"></div>
          <div class="skeleton mt-1 h-3 w-[73%]"></div>
          <div class="skeleton mt-2 h-3 w-[35%]"></div>
          <div class="skeleton mt-2 h-3 w-[45%]"></div>
        </div>
      </div>
      <!-- right section -->
      <div class="flex flex-col gap-2 sm:col-span-1">
        <div class="base-card">
          <div class="skeleton h-3 w-[35%]"></div>
          <div class="skeleton mt-2 h-6 w-[65%] rounded-md"></div>
          <div class="skeleton mt-2 h-3 w-[85%]"></div>
          <div class="skeleton mt-1 h-3 w-[89%]"></div>
          <div class="skeleton mt-1 h-3 w-[91%]"></div>
          <div class="skeleton mt-1 h-3 w-[76%]"></div>
          <div class="my-2 h-[1px] w-full bg-slate-200"></div>
          <div class="skeleton h-4 w-[35%]"></div>
          <div class="skeleton mt-2 h-7 w-full rounded-md"></div>
          <div class="skeleton mt-2 h-4 w-[35%]"></div>
          <div class="skeleton mt-2 h-7 w-full rounded-md"></div>
        </div>
      </div>
    </div>
  `,
})
export class JobsDetailSkeletonComponent {}

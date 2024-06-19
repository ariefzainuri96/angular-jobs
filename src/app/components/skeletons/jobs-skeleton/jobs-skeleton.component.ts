import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs-skeleton',
  standalone: true,
  imports: [],
  template: `
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
      @for (item of [1, 2, 3]; track $index) {
        <!-- create skeletons here -->
        <div class="base-card gap-2">
          <div class="skeleton h-4 w-[35%]"></div>
          <div class="skeleton h-5 w-[80%]"></div>
          <div class="skeleton mt-1 h-3 w-[95%]"></div>
          <div class="skeleton h-3 w-[89%]"></div>
          <div class="skeleton h-3 w-[78%]"></div>
          <div class="skeleton h-4 w-[40%]"></div>
          <div class="my-2 h-[1px] w-full bg-slate-200"></div>
          <div class="skeleton h-4 w-[40%]"></div>
        </div>
      }
    </div>
  `,
})
export class JobsSkeletonComponent {}

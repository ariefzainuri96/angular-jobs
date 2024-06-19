import { Component, input } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { sleep } from '../../../utils/utils';
import { axiosInstance } from '../../../data/axios';
import { JobItem } from '../../../data/model/job-item';
import { JobsItem } from '../jobs-item/jobs-item.component';

@Component({
  selector: 'jobs-section',
  standalone: true,
  imports: [JobsItem],
  template: `
    <div class="flex w-full flex-col bg-blue-50 px-4 py-6">
      <p class="mb-6 self-center text-2xl font-bold text-indigo-600">
        {{ isDashboard() ? 'Recent Jobs' : 'Browse Jobs' }}
      </p>

      @if (query.isPending()) {
        Loading...
      }

      @if (query.isError()) {
        <span>There is an Error {{ query.error() }}</span>
      }

      @if (query.data(); as data) {
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          @for (job of data; track job.id; let i = $index) {
            @if (isDashboard()) {
              <!-- -1 for index & -3 for get last 3 jobs -->
              @if (i > data.length - 1 - 3) {
                <jobs-item [job]="job"></jobs-item>
              }
            } @else {
              <jobs-item [job]="job"></jobs-item>
            }
          }
        </div>
      }
    </div>
  `,
})
export class JobsSection {
  isDashboard = input<boolean>();

  query = injectQuery(() => ({
    queryKey: [this.isDashboard() ? '/recent-jobs' : '/jobs'],
    queryFn: async () => {
      await sleep(1000);

      const data = (await axiosInstance.get<JobItem[]>('/jobs')).data;

      return data;
    },
  }));
}

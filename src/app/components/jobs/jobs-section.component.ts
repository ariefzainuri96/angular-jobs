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
    <div class="flex w-full flex-col items-center bg-blue-50 px-4 py-6">
      <p class="mb-4 text-2xl font-bold text-indigo-600">
        {{ isDashboard() ? 'Recent Jobs' : 'Browse Jobs' }}
      </p>

      @if (query.isPending()) {
        Loading...
      }

      @if (query.isError()) {
        There is an Error
      }

      @if (query.data(); as data) {
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          @for (job of isDashboard() ? data.slice(0, 3) : data; track job.id) {
            <jobs-item [job]="job"></jobs-item>
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

      if (this.isDashboard()) {
        return data.reverse();
      }

      return data;
    },
  }));
}

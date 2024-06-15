import { Component } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { axiosInstance } from '../../data/axios';
import { JobItem } from '../../data/model/job-item';
import { sleep } from '../../utils/utils';

@Component({
  selector: 'app-test-fetch',
  standalone: true,
  imports: [],
  template: `
    @if (query.isPending()) {
      Loading...
    }

    @if (query.isError()) {
      Error
    }

    @if (query.data(); as data) {
      <div class="flex flex-col items-start">
        @for (item of query.data(); track item.title; let i = $index) {
          <p
            class="mt-1 text-lg font-semibold text-slate-600 hover:bg-slate-300"
          >
            {{ i + 1 }}. {{ item.title }}
          </p>
        }
      </div>
    }
  `,
})
export class TestFetchComponent {
  query = injectQuery(() => ({
    queryKey: ['jobs'],
    queryFn: async () => {
      await sleep(1000);

      return (await axiosInstance.get<JobItem[]>('/jobs')).data;
    },
  }));
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { sleep } from '../../utils/utils';
import { axiosInstance } from '../../data/axios';
import { JobItem } from '../../data/model/job-item';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixSewingPinFilled } from '@ng-icons/radix-icons';

@Component({
  selector: 'app-jobs-detail',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ radixSewingPinFilled })],
  template: `
    <main class="main bg-blue-50 p-4">
      <div class="main-col">
        @if (query.isPending()) {
          <p>Loading...</p>
        }

        @if (query.isError()) {
          <p>Error...</p>
        }

        <!-- parent grid -->
        @if (query.data(); as data) {
          <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <!-- left section -->
            <div class="flex flex-col gap-2 sm:col-span-2">
              <div class="base-card">
                <span class="text-sm text-slate-500">{{ data.type }}</span>
                <span class="mt-2 text-2xl font-bold">{{ data.title }}</span>
                <p class="mt-2 flex flex-row items-center text-sm text-red-500">
                  <ng-icon size="20" name="radix-sewing-pin-filled"></ng-icon>
                  {{ data.location }}
                </p>
              </div>
              <div class="base-card">
                <span class="text-sm font-bold text-indigo-600"
                  >Job Description</span
                >
                <p class="mt-2 whitespace-pre-line text-sm">
                  {{ data.description }}
                </p>
                <span class="mt-2 text-sm font-bold text-indigo-600"
                  >Salary</span
                >
                <p class="mt-2 whitespace-pre-line text-sm">
                  {{ data.salary }}
                </p>
              </div>
            </div>
            <!-- right section -->
            <div class="flex flex-col gap-2 sm:col-span-1">
              <div class="base-card">
                <span class="text-sm font-bold text-indigo-600"
                  >Company Info</span
                >
                <p class="mt-2 text-2xl font-bold">
                  {{ data.company?.name }}
                </p>
                <p class="mt-2 text-sm">{{ data.company?.description }}</p>
                <div class="my-2 h-[1px] w-full bg-slate-200"></div>
                <label class="text-sm font-semibold text-gray-600"
                  >Contact Email</label
                >
                <input
                  class="mt-2 w-full rounded-md border-none bg-slate-200 p-2"
                  readonly
                  disabled
                  [defaultValue]="data.company?.contactEmail"
                />
                <label class="mt-2 text-sm font-semibold text-gray-600"
                  >Contact Phone</label
                >
                <input
                  class="mt-2 w-full rounded-md border-none bg-slate-200 p-2"
                  readonly
                  disabled
                  [defaultValue]="data.company?.contactPhone"
                />
              </div>
              <div class="base-card">
                <span class="text-2xl font-bold">Manage Job</span>
                <button
                  class="btn mt-4 w-full rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Edit Job
                </button>
                <button
                  class="btn mt-2 w-full rounded-full bg-red-600 text-white hover:bg-red-700"
                >
                  Delete Job
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </main>
  `,
})
export class JobsDetailComponent {
  // route = inject(ActivatedRoute);
  jobsId = '';

  constructor(private route: ActivatedRoute) {
    console.log('ID: ' + this.route.snapshot.paramMap.get('id'));
    this.jobsId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  query = injectQuery(() => ({
    queryKey: ['/jobs', this.jobsId],
    queryFn: async () => {
      // await sleep(1000);

      const data = (await axiosInstance.get<JobItem>(`/jobs/${this.jobsId}`))
        .data;

      return data;
    },
  }));
}

import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { sleep } from '../../utils/utils';
import { axiosInstance } from '../../data/axios';
import { JobItem } from '../../data/model/job-item';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixSewingPinFilled } from '@ng-icons/radix-icons';
import { DeleteDialog } from '../components/delete-dialog/delete-dialog.component';
import { ToastService } from '../services/toast-service';
import { BackButton } from '../components/back-button/back-button.component';

@Component({
  selector: 'app-jobs-detail',
  standalone: true,
  imports: [
    NgIconComponent,
    DeleteDialog,
    BackButton,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [provideIcons({ radixSewingPinFilled })],
  template: `
    <main class="main bg-blue-50 p-4">
      <div class="main-col">
        <back-button></back-button>
        @if (query.isPending()) {
          <p>Loading...</p>
        }

        @if (query.isError()) {
          <p>Error...</p>
        }

        <!-- parent grid -->
        @if (query.data(); as data) {
          <div class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
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
                <a
                  routerLink="/edit-jobs/{{ jobsId }}"
                  routerLinkActive="active"
                  class="btn mt-4 w-full rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Edit Job
                </a>
                <button
                  [disabled]="deleteJob.isPending()"
                  [ariaDisabled]="deleteJob.isPending()"
                  (click)="showDeleteModal()"
                  class="btn mt-2 w-full rounded-full bg-red-600 text-white hover:bg-red-700"
                >
                  Delete Job
                  @if (deleteJob.isPending()) {
                    <span class="loading loading-spinner loading-xs"></span>
                  }
                </button>
              </div>
            </div>
          </div>
        }
      </div>
      <delete-dialog
        (onDeleteClick)="deleteJob.mutate()"
        [modalId]="deleteModalId"
      ></delete-dialog>
    </main>
  `,
})
export class JobsDetailComponent {
  // route = inject(ActivatedRoute);
  router = inject(Router);
  toasts = inject(ToastService);
  jobsId = '';

  deleteModalId = 'delete-modal';

  constructor(private route: ActivatedRoute) {
    console.log('ID: ' + this.route.snapshot.paramMap.get('id'));
    this.jobsId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  showDeleteModal = () => {
    (
      document.getElementById(this.deleteModalId) as HTMLDialogElement
    )?.showModal();
  };

  deleteJob = injectMutation(() => ({
    mutationKey: ['/jobs'],
    mutationFn: async () => {
      (
        document.getElementById(this.deleteModalId) as HTMLDialogElement
      )?.close();
      await sleep(1000);
      const res = await axiosInstance.delete<JobItem>(`/jobs/${this.jobsId}`);
      return res.data;
    },
    onSuccess: (data) => {
      this.toasts.show({
        message: `${data.title} Job deleted successfully`,
        id: 'job-deleted',
      });

      this.router.navigateByUrl('/jobs', { replaceUrl: true });
    },
    onError: (err) => {
      this.toasts.show({
        message: `Failed to delete Job, Error: ${err.message}`,
        id: 'job-deleted',
      });
    },
  }));

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

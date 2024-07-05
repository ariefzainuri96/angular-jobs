import { Component, inject, signal } from '@angular/core';
import { JobsFormComponent } from '../components/jobs-form/jobs-form.component';
import { ValidationMessage } from '../../data/model/validation-message';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { axiosInstance } from '../../data/axios';
import { sleep } from '../../utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast-service';
import { jobSchema } from '../../data/schema/job-schema';
import { Location } from '@angular/common';
import { BackButton } from '../components/back-button/back-button.component';
import { JobsDetailResponse } from '../../data/responses/jobs-detail-response';
import { JobItem } from '../../data/responses/jobs-response';

@Component({
  selector: 'app-edit-jobs',
  standalone: true,
  imports: [JobsFormComponent, BackButton],
  template: `
    <main class="main bg-blue-50 p-4">
      <div class="main-col items-start">
        <back-button></back-button>
        <div class="base-card my-4 w-full self-center md:max-w-[500px]">
          <span (click)="handleToast()" class="mb-2 text-2xl font-semibold"
            >Edit Jobs</span
          >
          @if (_job.isPending()) {
            <span class="loading loading-spinner loading-xs self-center"></span>
          } @else if (_job.isError()) {
            <span class="text-red-500">{{ _job.error().message }}</span>
          } @else {
            <app-jobs-form
              [_job]="_job.data()"
              (onSubmit)="handleOnSubmit($event)"
              [errorMessage]="errorMessage()"
              class="w-full"
              [submitStatus]="submitJob.status()"
            ></app-jobs-form>
          }
        </div>
      </div>
    </main>
  `,
})
export class EditJobsComponent {
  toasts = inject(ToastService);
  router = inject(Router);
  errorMessage = signal<ValidationMessage[] | null>(null);
  jobId = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.jobId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  handleToast = () => {
    this.toasts.show({
      message: 'Job updated successfully',
      id: 'toast-success-1',
    });
  };

  _job = injectQuery(() => ({
    queryKey: ['/jobs', this.jobId],
    queryFn: async () => {
      await sleep(1000);

      const data = (
        await axiosInstance.get<JobsDetailResponse>(`/jobs/${this.jobId}`)
      ).data;

      return data.data;
    },
  }));

  handleOnSubmit = (job: JobItem | null) => {
    this.errorMessage.set(null);

    const validation = jobSchema.safeParse(job ?? {});

    if (!validation.success) {
      const { errors: err } = validation.error;

      console.log(err);

      this.errorMessage.set(
        err.map((element) => {
          return {
            message: element.message,
            name: element.path,
          };
        }),
      );

      return;
    }

    this.submitJob.mutate(job!);
  };

  submitJob = injectMutation(() => ({
    mutationKey: [['/jobs'], ['/jobs', this.jobId]],
    mutationFn: async (job: JobItem) => {
      await sleep(1000);
      const response = (
        await axiosInstance.put<JobsDetailResponse>(
          `/jobs/${job._id}`,
          JSON.stringify(job),
        )
      ).data;
      return response.data;
    },
    onSuccess: (data) => {
      this.location.back();

      this.toasts.show({
        message: `${data.title} Job edited successfully`,
        id: 'toast-success',
      });
    },
    onError: (error) => {
      this.toasts.show({
        message: `Failed to update job, Error: ${error.message}`,
        id: 'toast-failed',
      });
    },
  }));
}

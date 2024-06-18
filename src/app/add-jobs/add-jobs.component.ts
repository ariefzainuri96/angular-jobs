import { Component, EnvironmentInjector, inject, signal } from '@angular/core';
import { JobsFormComponent } from '../components/jobs-form/jobs-form.component';
import { JobItem } from '../../data/model/job-item';
import { ValidationMessage } from '../../data/model/validation-message';
import { jobSchema } from '../../data/schema/job-schema';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { axiosInstance } from '../../data/axios';
import { Router } from '@angular/router';
import { sleep } from '../../utils/utils';
import { ToastService } from '../services/toast-service';

@Component({
  selector: 'app-add-jobs',
  standalone: true,
  imports: [JobsFormComponent],
  template: `
    <main class="main bg-blue-50 px-4">
      <div class="main-col items-center">
        <div class="base-card my-4 w-full md:max-w-[500px]">
          <span (click)="handleToast()" class="mb-2 text-2xl font-semibold"
            >Add Jobs</span
          >
          <app-jobs-form
            (onSubmit)="handleOnSubmit($event)"
            [errorMessage]="errorMessage()"
            class="w-full"
            [submitStatus]="mutation.status()"
          ></app-jobs-form>
        </div>
      </div>
    </main>
  `,
})
export class AddJobsComponent {
  router = inject(Router);
  toast = inject(ToastService);
  errorMessage = signal<ValidationMessage[] | null>(null);

  mutation = injectMutation(() => ({
    mutationKey: ['/jobs'],
    mutationFn: async (job: JobItem) => {
      await sleep(1000);
      const response = await axiosInstance.post<JobItem>(
        '/jobs',
        JSON.stringify(job),
      );
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      this.router.navigateByUrl('/jobs', {
        replaceUrl: true,
      });

      this.toast.show({
        message: `${data.title} Job added successfully`,
        id: 'toast-success',
      });
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  }));

  handleToast = () => {
    this.toast.show({ message: 'New message arrived', id: 'test-toast' });
  };

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

    this.mutation.mutate(job!);
  };
}

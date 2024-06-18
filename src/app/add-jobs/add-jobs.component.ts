import { Component } from '@angular/core';
import { JobsFormComponent } from '../components/jobs-form/jobs-form.component';

@Component({
  selector: 'app-add-jobs',
  standalone: true,
  imports: [JobsFormComponent],
  template: `
    <main class="main bg-blue-50 px-4">
      <div class="main-col items-center">
        <div class="base-card my-4 w-full md:max-w-[500px]">
          <span class="mb-2 text-2xl font-semibold">Add Jobs</span>
          <app-jobs-form class="w-full"></app-jobs-form>
        </div>
      </div>
    </main>
  `,
})
export class AddJobsComponent {}

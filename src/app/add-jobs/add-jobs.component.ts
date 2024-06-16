import { Component } from '@angular/core';

@Component({
  selector: 'app-add-jobs',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col">
      <h1>Add Jobs</h1>
      <div class="size-96 bg-red-200"></div>
      <div class="mt-2 size-96 bg-red-200"></div>
      <div class="mt-2 size-96 bg-red-200"></div>
    </div>
  `,
})
export class AddJobsComponent {}

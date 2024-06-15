import { Component } from '@angular/core';

@Component({
  selector: 'app-add-jobs',
  standalone: true,
  imports: [],
  template: `
    <div class="h-full w-full overflow-y-auto bg-blue-50">
      <div class="flex flex-col">
        <h1>Add Jobs</h1>
      </div>
    </div>
  `,
})
export class AddJobsComponent {}

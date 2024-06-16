import { Component } from '@angular/core';
import { JobsSection } from '../components/jobs/jobs-section.component';

@Component({
  selector: 'jobs',
  standalone: true,
  imports: [JobsSection],
  template: `
    <div class="flex flex-col">
      <jobs-section [isDashboard]="false"></jobs-section>
    </div>
  `,
})
export class JobsComponent {}

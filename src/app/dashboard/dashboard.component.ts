import { Component } from '@angular/core';
import { DashboardAction } from '../dashboard-action/dashboard-action.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JobsSection } from '../components/jobs/jobs-section.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardAction, RouterLink, RouterLinkActive, JobsSection],
  template: `
    <div class="flex flex-col">
      <!-- hero -->
      <div
        class="flex flex-col items-center justify-center bg-indigo-700 p-[108px]"
      >
        <span class="text-center text-6xl font-extrabold text-white"
          >Become an Angular Dev</span
        >
        <p class="mt-4 text-lg text-white">
          Find the Angular job that fits your skills and experience
        </p>
      </div>

      <!-- actions -->
      <div class="mt-4 grid grid-cols-2 gap-4 px-4">
        <dashboard-action
          className="bg-slate-200 flex-1"
          title="Angular Jobs"
          descrption="Find the Angular job that fits your skills and experience"
        >
          <a
            action-btn
            class="btn mt-2 border-none bg-slate-500 text-white hover:bg-slate-600"
            routerLink="/jobs"
            routerLinkActive="active"
          >
            Browse Jobs
          </a>
        </dashboard-action>
        <dashboard-action
          className="bg-indigo-100 flex-1"
          title="For Employerss"
          descrption="List your job to find the perfect Angular job for the right person"
        >
          <a
            action-btn
            class="btn mt-2 border-none bg-indigo-500 text-white hover:bg-indigo-600"
            routerLink="/add-job"
            routerLinkActive="active"
          >
            Add Job
          </a>
        </dashboard-action>
      </div>

      <!-- jobs -->
      <jobs-section [isDashboard]="true"></jobs-section>
    </div>
  `,
})
export class DashboardComponent {}
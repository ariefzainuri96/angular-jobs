import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { TestFetchComponent } from './test-fetch/test-fetch.component';
import { HomeComponent } from './home/home.component';
import { BaseLayout } from './layouts/base-layout/base-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayout,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'add-jobs', component: AddJobsComponent },
      { path: 'fetch', component: TestFetchComponent },
    ],
  },
];

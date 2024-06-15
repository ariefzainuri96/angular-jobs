import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { TestFetchComponent } from './test-fetch/test-fetch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'add-jobs', component: AddJobsComponent },
  { path: 'fetch', component: TestFetchComponent },
];

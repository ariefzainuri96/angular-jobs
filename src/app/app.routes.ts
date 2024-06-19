import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { BaseLayout } from './layouts/base-layout/base-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayout,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'add-jobs', component: AddJobsComponent },
      { path: 'jobs/:id', component: JobsDetailComponent },
      { path: 'edit-jobs/:id', component: EditJobsComponent },
    ],
  },
];

import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { BaseLayout } from './layouts/base-layout/base-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';
import { LoginComponent } from './login/login.component';
import { isAuthorizedGuard, isLoginRegisterGuard } from '../utils/utils';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isLoginRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isLoginRegisterGuard],
  },
  {
    path: '',
    component: BaseLayout,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [isAuthorizedGuard],
      },
      {
        path: 'jobs',
        component: JobsComponent,
        canActivate: [isAuthorizedGuard],
      },
      {
        path: 'add-jobs',
        component: AddJobsComponent,
        canActivate: [isAuthorizedGuard],
      },
      {
        path: 'jobs/:id',
        component: JobsDetailComponent,
        canActivate: [isAuthorizedGuard],
      },
      {
        path: 'edit-jobs/:id',
        component: EditJobsComponent,
        canActivate: [isAuthorizedGuard],
      },
    ],
  },
];

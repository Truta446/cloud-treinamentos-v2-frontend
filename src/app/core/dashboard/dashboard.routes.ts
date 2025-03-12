import { Routes } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { UserComponent } from './user/user.component';
import { UploadComponent } from './upload/upload.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'monitor',
    pathMatch: 'full',
  },
  { path: 'monitor', component: MonitorComponent },
  { path: 'user', component: UserComponent },
  { path: 'upload', component: UploadComponent },
];

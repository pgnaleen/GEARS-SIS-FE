import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {AdminComponent} from '../../admin/admin.component';
import {UserRegistrationComponent} from '../../admin/admin_components/user-registration/user-registration.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/user-registration', component: UserRegistrationComponent}
];



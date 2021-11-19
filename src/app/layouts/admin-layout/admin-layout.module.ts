import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {AdminComponent} from '../../admin/admin.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatStepperModule} from '@angular/material/stepper';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AgGridModule} from 'ag-grid-angular';
import {MatDialogModule} from '@angular/material/dialog';
import {UserRegistrationComponent} from '../../admin/admin_components/user-registration/user-registration.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        DragDropModule,
        MatStepperModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDialogModule,
        AgGridModule.withComponents([])
    ],
  declarations: [
    DashboardComponent,
    AdminComponent,
    UserRegistrationComponent
  ]
})

export class AdminLayoutModule {
}

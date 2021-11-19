import { Component, OnInit } from '@angular/core';
// import {Roles} from '../../../core/shared/model/roles';
import {ReportsDataServiceComponent} from '../../../core/shared/services/reports-data-service-component.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  // roles: Roles;

  constructor(private dataService: ReportsDataServiceComponent) {
  }
  ngOnInit(): void {
    // get all the report columns to show on first report step
    this.dataService.sendGetRequest().subscribe((data: any) => {
      console.log(data);
      // this.roles = data;
    });
  };
}

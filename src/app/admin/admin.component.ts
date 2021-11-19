import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import { Roles } from 'app/core/shared/model/roles';
import {ReportsDataServiceComponent} from '../core/shared/services/reports-data-service-component.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})


export class AdminComponent implements OnInit {
  roles: Roles;

  constructor(private dataService: ReportsDataServiceComponent) {
  }
  ngOnInit(): void {
    // get all the report columns to show on first report step
    this.dataService.sendGetRequest().subscribe((data: Roles) => {
      console.log(data);
      this.roles = data;
    });
  };
}

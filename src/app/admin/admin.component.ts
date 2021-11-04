import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {AllReportColumns} from '../core/shared/model/allreportcolumns';
import {ReportsDataServiceComponent} from '../core/shared/services/reports-data-service-component.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})


export class AdminComponent implements OnInit {
  allReportColumns: AllReportColumns;

  constructor(private dataService: ReportsDataServiceComponent) {
  }
  ngOnInit(): void {
    // get all the report columns to show on first report step
    this.dataService.sendGetRequest().subscribe((data: AllReportColumns) => {
      console.log(data);
      this.allReportColumns = data;
    });
  };
}

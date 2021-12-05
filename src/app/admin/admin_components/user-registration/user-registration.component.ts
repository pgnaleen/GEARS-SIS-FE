import {Component, OnInit, ViewChild} from '@angular/core';
import {RegistrationService} from '../../../core/shared/services/registration.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../core/shared/model/user';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {UserFormComponent} from './user-form/user-form.component';
import {NotificationService} from '../../../core/shared/services/notification.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  matDataSource: MatTableDataSource<any>;
  // can hide and show table columns based on this array and also change order of table based on this array
  displayedColumns: string[] = ['username', 'email', 'firstName', 'lastName', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: any;

  constructor(private dataService: RegistrationService,
              private dialog: MatDialog,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.dataService.getUsersList().subscribe(response => {
      console.log(response);
      if (response.statusCode === 4004) {
        this.notificationService.showNotification('::' + response.message);
      }
      this.matDataSource = new MatTableDataSource<User>(response.payload);
      this.matDataSource.sort = this.sort; // this should be inside, as this is async call matDataSource may be delayed create create.
      this.matDataSource.paginator = this.paginator;
    });
  }

  onUserAdd() {
    this.dataService.form.reset();
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true; // this will close window by outside click or esc click
    dialogConfig.autoFocus = true; // first focusable element will get focus
    dialogConfig.width = '40%';
    this.dialog.open(UserFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.matDataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onUpdate(row) {
    this.dataService.populateForm(row);

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true; // this will close window by outside click or esc click
    dialogConfig.autoFocus = true; // first focusable element will get focus
    dialogConfig.width = '40%';
    this.dialog.open(UserFormComponent, dialogConfig); // same singleton register service with values for the form set up will be loaded
  }

  onDelete(row) {
    if (confirm('Delete user ' + row.username + ' confirmation?')) {
      this.dataService.deleteUserData(row.username).subscribe((response) => {
        console.log(response);

        if (response.statusCode === 200) {
          this.notificationService.showNotification('::' + response.message);
        } else if (response.statusCode === 4600) {
          this.notificationService.showNotification('::' + response.message);
        } else {
          this.notificationService.showNotification('::Error occurred, Try again.');
        }

        this.dataService.reloadComponent(); // reload user registration page only after user creation successful
      });
    }
  }
}

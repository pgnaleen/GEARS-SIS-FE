import { Component, OnInit } from '@angular/core';

import { RegistrationService } from '../../../../core/shared/services/registration.service';
import {NotificationService} from '../../../../core/shared/services/notification.service';
import {Roles} from '../../../../core/shared/model/roles';
import {UserRequest} from '../../../../core/shared/request/user.request';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  roles: Roles;

  constructor(public regService: RegistrationService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<UserFormComponent>,
              private router: Router) { }

  ngOnInit(): void {
    this.regService.getRolesList().subscribe((roles: Roles) => {
      this.roles = roles;
    });
  }

  onClear() {
    this.regService.form.reset();
    // below function not needed
    // this.regService.initializeFormGroup();
  }

  onSubmit() {
    const requestBody: UserRequest = new UserRequest();
    requestBody.username = this.regService.form.controls['username'].value;
    requestBody.password = this.regService.form.controls['password'].value;
    requestBody.email = this.regService.form.controls['email'].value;
    requestBody.roleId = this.regService.form.controls['roleId'].value;
    requestBody.firstName = this.regService.form.controls['firstName'].value;
    requestBody.lastName = this.regService.form.getRawValue().lastName;
    requestBody.dob = this.regService.form.getRawValue().dob;
    requestBody.phoneNo = this.regService.form.getRawValue().phoneNo;

    if (this.regService.form.getRawValue().id === null) {
      this.regService.postNewUserData(requestBody).subscribe((response) => {
        console.log(response);

        if (response.statusCode === 201) {
          this.notificationService.showNotification('::' + response.message);
          this.onClose();
        } else if (response.statusCode === 4600) {
          this.notificationService.showNotification('::' + response.message);
        } else {
          this.notificationService.showNotification('::Error occurred, Try again.');
        }

        this.regService.reloadComponent(); // reload user registration page only after user creation successful
      });
    } else {
      this.regService.postUpdateUserData(requestBody).subscribe((response) => {
        console.log(response);

        if (response.statusCode === 200 ) {
          this.notificationService.showNotification('::' + response.message);
          this.onClose();
        } else if (response.statusCode === 4004) {
          this.notificationService.showNotification('::' + response.message);
        } else {
          this.notificationService.showNotification('::Error occurred, Try again.');
        }

        this.regService.reloadComponent(); // reload user registration page only after user creation successful
      });
    }

  }

  onClose() {
    this.regService.form.reset();
    this.regService.initializeFormGroup();
    this.dialogRef.close();
  }
}

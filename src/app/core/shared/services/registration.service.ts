import {Injectable} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {Roles} from '../model/roles';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {UserRequest} from '../request/user.request';
import {Users} from '../response/users';
import {Response} from '../response/response';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private adminAPIServer = environment.adminAPIServer;

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    username: new FormControl('', Validators.compose([/*this.validateUsername.bind(this),*/ Validators.required])),
    password: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    roleId: new FormControl(null),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    phoneNo: new FormControl('', Validators.min(10))
  });

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      username: '',
      password: '',
      email: '',
      roleId: null,
      firstName: '',
      lastName: '',
      dob: '',
      phoneNo: ''
    });
  }

  public getRolesList() {
    return this.httpClient.get<Roles>(this.adminAPIServer + '/api/v1/roles',
      this.httpOptions);
  }

  public postNewUserData(requestBody: UserRequest) {
    return this.httpClient.post<Response>(this.adminAPIServer + '/api/v1/users/create',
      requestBody, this.httpOptions);
  }

  public postUpdateUserData(requestBody: UserRequest) {
    return this.httpClient.post<Response>(this.adminAPIServer + '/api/v1/users/update',
      requestBody, this.httpOptions);
  }

  public deleteUserData(username: string) {
    return this.httpClient.delete<Response>( this.adminAPIServer + '/api/v1/users/delete/' + username,
      this.httpOptions);
  }

  public getUsersList() {
    return this.httpClient.get<Users>(this.adminAPIServer + '/api/v1/users',
      this.httpOptions);
  }

  private validateUsername(fc: FormControl) {
    this.httpClient.get<any>(this.adminAPIServer + '/api/v1/users/' + fc.value,
      this.httpOptions).subscribe((response) => {
    });
  }

  populateForm(row) {
    console.log(row);

    if (row.email === undefined) {
      row.email = '';
    }
    if (row.firstName === undefined) {
      row.firstName = '';
    }
    if (row.lastName === undefined) {
      row.lastName = '';
    }
    if (row.dob === undefined) {
      row.dob = '';
    }
    if (row.roleId === undefined) {
      if (row.role === undefined) {
        row.roleId = '';
      } else {
        row.roleId = row.role.id;
        delete row.role;
      }
    }
    if (row.phoneNo === undefined) {
      row.phoneNo = '';
    }
    row.password = '';

    this.form.setValue(row);

  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]).then();
  }
}

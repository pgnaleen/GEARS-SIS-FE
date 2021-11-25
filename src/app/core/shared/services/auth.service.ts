import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private AUTH_SERVER: string;
  private KEYCLOAK_REALM: string;
  private REDIRECT_URL: string;
  private ADMIN_API_SERVER: string;

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  constructor(private httpClient: HttpClient) {
    const loggedUser = localStorage.getItem('currentUser')
    let convertedUser;
    if (loggedUser) {
      convertedUser = JSON.parse(loggedUser);
    }
    this.currentUserSubject = new BehaviorSubject<User>(convertedUser);
    this.currentUser = this.currentUserSubject.asObservable();

    this.AUTH_SERVER = environment.authUrl;
    this.KEYCLOAK_REALM = environment.keyCloakRealm;
    this.REDIRECT_URL = environment.redirectUrl;
    this.ADMIN_API_SERVER = environment.adminAPIServer;
  }

  public currentUserValue() {
    return this.currentUserSubject.value;
  }

  public logout() {
    // call back end admin api for logout backend keycloak client
    const requestBody = '';
    this.httpClient.post<any>(this.ADMIN_API_SERVER + '/api/v1/auth/logout',
      requestBody, this.httpOptions).subscribe((data: any) => {
      console.log(data);
    });

    // call keycloak logout api for logout front end client and redirect home page to keycloak login page
    window.location.href = this.AUTH_SERVER + '/realms/' + this.KEYCLOAK_REALM
      + '/protocol/openid-connect/logout?redirect_uri=' + this.REDIRECT_URL;
  }

  public getUsername() {
    return this.httpClient.get<any>(this.ADMIN_API_SERVER + '/api/v1/users/username',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }
}

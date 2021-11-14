import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
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
  }

  public currentUserValue() {
    return this.currentUserSubject.value;
  }


  public logout() {
    console.log('auth service logout');
    window.location.href = this.AUTH_SERVER + '/auth/realms/' + this.KEYCLOAK_REALM + '/protocol/openid-connect/logout?redirect_uri='
      + this.REDIRECT_URL;
  }
}

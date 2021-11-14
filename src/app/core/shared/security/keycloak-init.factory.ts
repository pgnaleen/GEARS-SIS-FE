import { KeycloakService } from 'keycloak-angular';
import { environment } from 'environments/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  return () =>
    keycloak.init({
      config: {
        url: environment.authUrl + '/auth',
        realm: environment.keyCloakRealm,
        clientId: 'sis-fe',
      },
      loadUserProfileAtStartUp: false,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      bearerExcludedUrls: []
    });
}

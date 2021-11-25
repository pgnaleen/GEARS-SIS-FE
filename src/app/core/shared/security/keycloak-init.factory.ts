import { KeycloakService } from 'keycloak-angular';
import { environment } from 'environments/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  return () =>
    keycloak.init({
      config: {
        // url: '/auth',
        url: environment.authUrl,
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

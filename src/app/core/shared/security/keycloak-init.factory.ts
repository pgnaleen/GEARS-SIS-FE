import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://10.0.0.11:8082' + '/auth',
        // url: 'http://localhost:8080' + '/auth',
        realm: 'gutech',
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

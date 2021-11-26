// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  authUrl: 'http://localhost:8080/auth',
  // authUrl: 'http://10.0.0.11:8082/auth',
  // adminAPIServer: 'http://localhost:8089',
  adminAPIServer: 'http://10.0.0.11:8284',
  // redirectUrl: 'http://localhost:4200',
  redirectUrl: 'http://10.0.0.11:4200',
  keyCloakRealm: 'gutech'
};

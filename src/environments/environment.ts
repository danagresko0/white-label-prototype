// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  okta: {
    orgUrl: 'https://trial-2653197.okta.com',
    issuer: 'https://trial-2653197.okta.com/oauth2/default',
    clientId: '0oa121adkpmrzF21D698',
    webClientId: '0oa11v7t2inOYySA7698',
    nativeClientId: '0oa11ty2gqgZjMqYK698',
    webRedirectUri: 'http://localhost:4206/login/callback',
    webPostLogoutRedirectUri: 'http://localhost:4206/home',
    nativeRedirectUri: 'com.okta.trial-2653197:/callback',
    nativePostLogoutRedirectUri: 'com.okta.trial-2653197:/',
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    pkce: true,
    apiToken: '00PE04ki_8PZpSut2IBXSUTuHZ1zDT_kJNOT6f7m0i'
  }
  ,
  azure: {
    clientId: '8f149f75-472b-4de9-9e54-29291ad2a843',
    authority: 'https://login.microsoftonline.com/common', // Multitenant endpoint
    redirectUri: 'http://localhost:4206/login/callback',
    scopes: ['openid', 'profile', 'email'],
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

import { Environment } from './environment.model';
export const environment: Environment = {
  production: true,
  okta: {
    orgUrl: 'https://trial-2653197.okta.com',
    issuer: 'https://trial-2653197.okta.com/oauth2/default',
    clientId: '0oa11ty2gqgZjMqYK698',
    webClientId: '0oa11v7t2inOYySA7698',
    nativeClientId: '0oa11ty2gqgZjMqYK698',
    webRedirectUri: 'http://localhost:4206/login/callback',
    webPostLogoutRedirectUri: 'http://localhost:4206/home',
    nativeRedirectUri: 'com.okta.trial-2653197:/callback',
    nativePostLogoutRedirectUri: 'com.okta.trial-2653197:/',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    apiToken: '00PE04ki_8PZpSut2IBXSUTuHZ1zDT_kJNOT6f7m0i'
  }
};

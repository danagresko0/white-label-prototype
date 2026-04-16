import { Environment } from './environment.model';
export const environment: Environment = {
  production: true,
  okta: {
    orgUrl: '',
    issuer: '',
    clientId: '',
    webClientId: '',
    nativeClientId: '',
    webRedirectUri: '',
    webPostLogoutRedirectUri: '',
    nativeRedirectUri: '',
    nativePostLogoutRedirectUri: '',
    scopes: [],
    pkce: true,
    apiToken: ''
  }
};

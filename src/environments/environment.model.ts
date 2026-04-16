export interface OktaConfig {
  orgUrl: string;
  issuer: string;
  clientId: string;
  webClientId: string;
  nativeClientId: string;
  webRedirectUri: string;
  webPostLogoutRedirectUri: string;
  nativeRedirectUri: string;
  nativePostLogoutRedirectUri: string;
  scopes: string[];
  pkce: boolean;
  apiToken: string;
}

export interface Environment {
  production: boolean;
  okta: OktaConfig;
}

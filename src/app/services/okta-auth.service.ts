import { Injectable } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OktaAuthService {
  public oktaAuth: OktaAuth;

  constructor() {
    this.oktaAuth = new OktaAuth({
      issuer: environment.okta.issuer,
      clientId: environment.okta.clientId,
      redirectUri: environment.okta.webRedirectUri,
      scopes: environment.okta.scopes,
      pkce: environment.okta.pkce
    });
  }
}

import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';
import { Capacitor } from '@capacitor/core';
import {
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { PhxInput } from 'phoenix';
import { TranslocoDirective } from '@jsverse/transloco';

import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  login: string;
}

export interface User {
  id: string;
  profile: Profile;
}

interface AuthnResponse {
  status?: string;
  sessionToken?: string;
  errorSummary?: string;
  errorCauses?: Array<{ errorSummary: string }>;
  _embedded?: {
    user: User;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    NgIf,
    FormsModule,
    HttpClientModule,
    IonButton,
    IonText,
    PhxInput,
    TranslocoDirective
  ]
})
export class LoginPage {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private oktaAuth!: OktaAuth;
  private readonly redirectUri: string;
  private readonly clientId: string;
  private readonly isNativePlatform: boolean;

  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor() {
    const runtimePlatform = Capacitor.getPlatform();
    const isBrowserProtocol = typeof window !== 'undefined' && /^https?:$/i.test(window.location.protocol);
    this.isNativePlatform = !(runtimePlatform === 'web' || isBrowserProtocol);
    this.redirectUri = this.isNativePlatform ? environment.okta.nativeRedirectUri : environment.okta.webRedirectUri;
    this.clientId = this.isNativePlatform
      ? (environment.okta.nativeClientId || environment.okta.clientId)
      : (environment.okta.webClientId || environment.okta.clientId);

    this.oktaAuth = new OktaAuth({
      issuer: environment.okta.issuer,
      clientId: this.clientId,
      redirectUri: this.redirectUri,
      scopes: environment.okta.scopes,
      pkce: environment.okta.pkce
    });
  }

  async login(): Promise<void> {
    this.errorMessage = '';
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter your username and password.';
      return;
    }
    this.loading = true;
    try {
      // Step 1: Authenticate with Okta via proxy
      const authnRes = await this.http
        .post<AuthnResponse>(
          '/okta/api/v1/authn',
          { username: this.username.trim(), password: this.password },
          { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) }
        )
        .toPromise();

      if (!authnRes || authnRes.status !== 'SUCCESS' || !authnRes.sessionToken) {
        const causes = authnRes?.errorCauses?.map(c => c.errorSummary).join(' ') || '';
        this.errorMessage = authnRes?.errorSummary || causes || 'Authentication failed.';
        this.loading = false;
        return;
      }

      // Step 2: Exchange session token for tokens (silent, no redirect)
      const { tokens } = await this.oktaAuth.token.getWithoutPrompt({
        sessionToken: authnRes.sessionToken,
        scopes: environment.okta.scopes
      });
      this.oktaAuth.tokenManager.setTokens(tokens);
      const jwt = tokens.idToken?.idToken || tokens.accessToken?.accessToken || '';
      if (jwt) {
        localStorage.setItem('okta_jwt', jwt);
        // Print JWT to browser console
        // eslint-disable-next-line no-console
        console.log('JWT Token:', jwt);
      }
      this.userService.setUser(authnRes._embedded);
      this.loading = false;
      await this.router.navigate(['/profile'], { state: { jwt } });
    } catch (error: any) {
      this.loading = false;
      const errBody = error?.error;
      const causes = errBody?.errorCauses?.map((c: any) => c.errorSummary).join(' ') || '';
      this.errorMessage = errBody?.errorSummary || causes || error?.message || 'Login failed.';
    }
  }
}

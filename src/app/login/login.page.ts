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

interface AuthnResponse {
  status?: string;
  sessionToken?: string;
  errorSummary?: string;
  errorCauses?: Array<{ errorSummary: string }>;
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

  loginWithOktaFederation() {
    this.http.post<any>('/api/login_2', {}).subscribe({
      next: (res) => {
        if (res && res.authorizeUrl) {
          window.location.href = res.authorizeUrl;
        }
      },
      error: (err) => {
        alert('Federated login failed: ' + (err.error?.error || err.message));
      }
    });
  }
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

  login(): void {
    this.errorMessage = '';
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }
    this.loading = true;
    // Create a hidden form and submit via POST so browser follows 302 redirect
    const formEl = document.createElement('form');
    formEl.method = 'POST';
    formEl.action = '/api/login';
    formEl.style.display = 'none';

    const usernameInput = document.createElement('input');
    usernameInput.name = 'username';
    usernameInput.value = this.username;
    formEl.appendChild(usernameInput);

    const passwordInput = document.createElement('input');
    passwordInput.name = 'password';
    passwordInput.value = this.password;
    formEl.appendChild(passwordInput);

    document.body.appendChild(formEl);
    formEl.submit();
    // No further code runs, browser navigates away
  }
}

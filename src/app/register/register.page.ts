import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonText
} from '@ionic/angular/standalone';
import { environment } from '../../environments/environment';

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonText
  ]
})
export class RegisterPage {
  form: RegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: ''
  };

  loading = false;
  successMessage = '';
  errorMessage = '';
  clientId: string;
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    // Debug: Log environment object
    console.log('[REGISTER DEBUG] environment:', environment);
    // [AUTH DEBUG] Platform-aware client ID selection
    const isNative = Capacitor.isNativePlatform();
    this.clientId = isNative 
      ? environment.okta?.nativeClientId 
      : environment.okta?.webClientId;
    console.log(`[REGISTER DEBUG] Platform: ${isNative ? 'native' : 'web'}, ClientID: ${this.clientId}`);
  }

  registerUser(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const firstName = this.form.firstName.trim();
    const lastName = this.form.lastName.trim();
    const email = this.form.email.trim().toLowerCase();
    const login = this.form.login.trim().toLowerCase();
    const password = this.form.password;

    if (!firstName || !lastName || !email || !login || !password) {
      this.errorMessage = 'Please complete first name, last name, email, login, and password.';
      return;
    }

    if (!this.emailRegex.test(login)) {
      this.errorMessage = 'Login must be a valid email address.';
      return;
    }

    if (!environment.okta.apiToken) {
      this.errorMessage = 'Missing Okta API token. Add it in environment.ts before registering users.';
      return;
    }

    this.loading = true;
    this.registerViaLegacyOktaFlow(firstName, lastName, email, login, password);
  }

  private registerViaLegacyOktaFlow(
    firstName: string,
    lastName: string,
    email: string,
    login: string,
    password: string
  ): void {
    const oktaBaseUrl = '/okta';
    const createUrl = `${oktaBaseUrl}/api/v1/users?activate=true`;
    const headers = new HttpHeaders({
      Authorization: `SSWS ${environment.okta.apiToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    const createPayload = {
      profile: {
        firstName,
        lastName,
        email,
        login
      },
      credentials: {
        password: {
          value: password
        }
      }
    };

    this.http.post(createUrl, createPayload, { headers }).subscribe({
      next: (response: any) => {
        const userId = response.id;
        const assignUrl = `${oktaBaseUrl}/api/v1/apps/${environment.okta.webClientId}/users`;
        const assignPayload = {
          id: userId,
          scope: 'USER'
        };

        this.http.post(assignUrl, assignPayload, { headers }).subscribe({
          next: () => {
            this.successMessage = 'User created and assigned to app successfully. Redirecting to login...';
            this.loading = false;
            setTimeout(() => {
              this.router.navigate(['/login'], {
                state: {
                  login,
                  password
                }
              });
            }, 1000);
          },
          error: (assignError) => {
            const causes = (assignError?.error?.errorCauses || [])
              .map((cause: { errorSummary?: string }) => cause?.errorSummary)
              .filter((summary: string | undefined): summary is string => Boolean(summary));
            const message = causes.length > 0
              ? causes.join(' | ')
              : (assignError?.error?.errorSummary || assignError?.message || 'User was created but app assignment failed.');
            this.errorMessage = `User created, but assignment to web app failed: ${message}`;
            this.loading = false;
          }
        });
      },
      error: (createError) => {
        const causes = (createError?.error?.errorCauses || [])
          .map((cause: { errorSummary?: string }) => cause?.errorSummary)
          .filter((summary: string | undefined): summary is string => Boolean(summary));
        const message = causes.length > 0
          ? causes.join(' | ')
          : (createError?.error?.errorSummary || createError?.message || 'Unable to create user in Okta.');
        this.errorMessage = message;
        this.loading = false;
      }
    });
  }
}

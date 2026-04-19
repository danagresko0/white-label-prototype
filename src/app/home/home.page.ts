
import { Component } from '@angular/core';
import {  IonButton } from '@ionic/angular/standalone';
import { PhxInput } from 'phoenix';
import { TranslocoDirective } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports:  [ IonButton, PhxInput, TranslocoDirective],
})

export class HomePage {
  constructor(private router: Router, private http: HttpClient) {}

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    console.log('Forgot password clicked!');
  }

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
}

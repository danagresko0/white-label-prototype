
import { Component } from '@angular/core';
import {  IonButton } from '@ionic/angular/standalone';
import { PhxInput } from 'phoenix';
import { TranslocoDirective } from '@jsverse/transloco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports:  [ IonButton, PhxInput, TranslocoDirective],
})

export class HomePage {
  constructor(private router: Router) {}

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
}

import { Component } from '@angular/core';
import {  IonButton } from '@ionic/angular/standalone';
import { PhxInput } from 'phoenix';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports:  [ IonButton, PhxInput, TranslocoDirective],
})
export class HomePage {
  constructor() {}

  onButtonClick() {
    console.log('Button clicked!');
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    console.log('Forgot password clicked!');
  }
}

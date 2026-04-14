import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { PhxInput } from 'phoenix';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, PhxInput],
})
export class HomePage {
  constructor() {}

  onButtonClick() {
    console.log('Button clicked!');
  }
}

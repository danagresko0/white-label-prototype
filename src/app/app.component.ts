import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { TranslocoDirective } from '@jsverse/transloco';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import {close} from 'ionicons/icons';
import customIcons from '../assets/icon/icons.json';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss', '../global.scss'],
  imports: [IonApp, IonRouterOutlet, TranslocoDirective],
})
export class AppComponent {
  constructor() {
    // This registers every icon in the Ionicons library
    // addIcons(allIcons);

    // overrides ionic icons with custom icons
    addIcons({
      // @ts-ignore
      ...customIcons
    })
  }
}

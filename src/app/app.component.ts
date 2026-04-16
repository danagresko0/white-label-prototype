import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { TranslocoDirective } from '@jsverse/transloco';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, TranslocoDirective],
})
export class AppComponent {
  constructor() {
    // This registers every icon in the Ionicons library
    addIcons(allIcons);
  }
}

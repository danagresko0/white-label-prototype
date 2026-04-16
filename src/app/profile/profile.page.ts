import { Component, OnInit } from '@angular/core';
import { IonToolbar, IonHeader, IonTitle } from '@ionic/angular/standalone';
// import the phoenix linked library
import { PhxOffering } from 'phoenix';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [PhxOffering, IonToolbar, IonHeader, IonTitle, TranslocoDirective],
})
export class ProfilePage  implements OnInit {

  constructor() { }

  ngOnInit() {}

  onOfferingSelect() {
    console.log('Offering selected');
  }

  onLearnMore() {
    console.log('Learn more clicked');
  }

}

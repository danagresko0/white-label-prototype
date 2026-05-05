import { Component, inject, OnInit } from '@angular/core';
import { IonToolbar, IonHeader, IonTitle,IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
// import the phoenix linked library
import { PhxOffering, PhxProgressHeader, PhxHeader } from 'phoenix';
import { TranslocoDirective } from '@jsverse/transloco';
import { UserService } from '../services/user.service';
import { addIcons } from 'ionicons';
import { personOutline, cashOutline } from 'ionicons/icons';
import customIcons from '../../assets/icon/icons.json';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [PhxOffering, PhxProgressHeader, PhxHeader, IonButton, IonToolbar, IonHeader, IonTitle, IonButtons, IonIcon, TranslocoDirective],
})
export class ProfilePage  implements OnInit {
  private readonly userService = inject(UserService);
  public user: any | null = null;

  constructor() { 
    addIcons({ personOutline, cashOutline , ...customIcons});
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    console.log('User profile data:', this.user);
  }

  onOfferingSelect() {
    console.log('Offering selected');
  }

  onLearnMore() {
    console.log('Learn more clicked');
  }

}

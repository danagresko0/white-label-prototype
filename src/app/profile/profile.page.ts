import { Component, inject, OnInit } from '@angular/core';
import { IonToolbar, IonHeader, IonTitle } from '@ionic/angular/standalone';
// import the phoenix linked library
import { PhxOffering } from 'phoenix';
import { TranslocoDirective } from '@jsverse/transloco';
import { UserService } from '../services/user.service';
import { User } from '../login/login.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [PhxOffering, IonToolbar, IonHeader, IonTitle, TranslocoDirective],
})
export class ProfilePage  implements OnInit {
  private readonly userService = inject(UserService);
  public user: any | null = null;

  constructor() { }

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

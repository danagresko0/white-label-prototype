import { Component, OnInit } from '@angular/core';
import { IonToolbar, IonHeader, IonTitle, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { OktaAuthService } from '../services/okta-auth.service';
import { PhxOffering } from 'phoenix';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [PhxOffering, IonToolbar, IonHeader, IonTitle, TranslocoDirective, IonButton],
})
export class ProfilePage implements OnInit {
  constructor(
    private oktaAuthService: OktaAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  async logout(): Promise<void> {
    // POST to backend federated logout endpoint, let proxy handle port
    const res = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      if (data.auth0LogoutUrl) {
        window.location.href = data.auth0LogoutUrl;
      }
    }
  }

  onOfferingSelect() {
    console.log('Offering selected');
  }

  onLearnMore() {
    console.log('Learn more clicked');
  }
}

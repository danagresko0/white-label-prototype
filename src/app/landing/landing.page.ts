import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  imports: [IonContent, IonButton, CommonModule, FormsModule]
})
export class LandingPage {
  constructor(private router: Router) {}

  onGetStarted() {
    // route to your signup / onboarding flow
    this.router.navigateByUrl('/signup');
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  openTerms(ev: Event) {
    ev.preventDefault();
    // open in-app browser / modal as needed
    window.open('https://example.com/terms', '_blank');
  }

  openPrivacy(ev: Event) {
    ev.preventDefault();
    window.open('https://example.com/privacy', '_blank');
  }
}


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  imports: [IonButton, CommonModule, FormsModule, TranslocoDirective]
})
export class LandingPage {
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


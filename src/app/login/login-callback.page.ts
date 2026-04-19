import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-callback',
  template: '<p>Processing login...</p>'
})
export class LoginCallbackPage implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) {
      alert('No code found in callback URL.');
      return;
    }
    // Read hosted_flow cookie
    const hostedFlow = this.getCookie('hosted_flow');
    const apiEndpoint = hostedFlow === 'true' ? '/api/exchange_code' : '/api/token';
    this.http.post<any>(apiEndpoint, { code }).subscribe({
      next: (res) => {
        const jwt = res && res.access_token;
        console.log('JWT Token:', jwt);
        this.router.navigate(['/profile'], { state: { jwt } });
      },
      error: (err) => {
        alert('Login failed: ' + (err.error?.error || err.message));
      }
    });
  }

  // Helper to read cookie value by name
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
}

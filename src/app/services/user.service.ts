// create a service to store the user information received from authentication
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
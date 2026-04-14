import { Component, OnInit } from '@angular/core';
// import the phoenix linked library
import { PhxOffering } from 'phoenix';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [PhxOffering],
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

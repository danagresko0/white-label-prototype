import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: []
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

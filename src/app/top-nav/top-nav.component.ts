import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
  providers: [AuthenticationService]
})
export class TopNavComponent implements OnInit {
  private user;
  email: string;

  constructor(public authService: AuthenticationService) {}

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
    if (this.user) this.email = this.user.email;

  }

  ngOnInit() {
  }

  runLogOut() {
    this.authService.logout();
  }
}

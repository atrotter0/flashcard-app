import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
  providers: [AuthenticationService]
})
export class TopNavComponent implements OnInit {
  private user;
  email: string;
  categories: FirebaseListObservable<any[]>;

  constructor(public authService: AuthenticationService, private database: AngularFireDatabase) {
    this.categories = database.list('categories');
  }

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

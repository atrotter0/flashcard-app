import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
  providers: [AuthenticationService]
})
export class TopNavComponent implements OnInit {
  private user;
  private isLoggedIn: Boolean;

  constructor(public authService: AuthenticationService) {
    this.authService.user.subscribe(user => {
      if (user == null) {
        this.isLoggedIn = false;
        console.log("nobody");
      } else {
        this.isLoggedIn = true;
        this.user = user;
        console.log("i'm logged in yay");
      }
    })
  }

  ngOnInit() {


  }





}

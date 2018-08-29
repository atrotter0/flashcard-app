import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  user;
  private isLoggedIn: Boolean;
  private userName: String;

  constructor(public authService: AuthenticationService, public router: Router) {
    this.authService.user.subscribe(user => {
      if (user == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.user = user;
        console.log(user);
      }
    });
  }

  ngOnInit() {
  }

  runLoginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  runLoginWithEmail(email: string, password: string) {
    this.authService.loginWithEmail(email, password);
  }

  runLogOut(){
    this.authService.logout();
  }

  redirectToDecks() {
    this.router.navigate(['decks']);
  }
}

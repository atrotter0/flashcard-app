import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [AuthenticationService]
})
export class LogInComponent {
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

  runLoginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  runLoginWithEmail(email: string, password: string) {
    this.authService.loginWithEmail(email, password);
  }

  runLogOut(){
    this.authService.logout();
  }
}

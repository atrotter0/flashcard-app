import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [AuthenticationService]
})
export class LogInComponent implements OnInit {
  user;
  private isLoggedIn: Boolean;
  private userName: String;

  constructor(public authService: AuthenticationService) {
    this.authService.user.subscribe(user => {
      if (user == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.userName = user.displayName;
        console.log(this.userName);
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
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [AuthenticationService]
})
export class LogInComponent implements OnInit {

  constructor(public authService: AuthenticationService) {
    this.authService.user.subscribe(user => {
      console.log(user);
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
}

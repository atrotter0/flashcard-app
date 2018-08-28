import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  registrationSuccess: boolean = false;
  googleLoginSuccess: boolean = false;
  emailLoginSuccess: boolean = false;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.user = afAuth.authState;
  }

  registerUser(email: string, password: string) {
    let errorMessage: string;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      errorMessage = error.message;
    });
    if (errorMessage === undefined) {
      this.registrationSuccess = true;
    }
  }

  loginWithGoogle() {
    let errorMessage: string;
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch((error) => {
      errorMessage = error.message;

    });
    if (errorMessage === undefined) {
      this.googleLoginSuccess = true;
    }

  }

  loginWithEmail(email: string, password: string) {
    let userData;
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.user.subscribe((data) => {
        userData = data;
        if (userData.email !== null) {
          this.redirectToDecks();
        }
      });
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  redirectToDecks() {
    this.router.navigate(['decks']);
  }
}

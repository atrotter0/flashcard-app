import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  registrationSuccess: boolean = false;

  constructor(public afAuth: AngularFireAuth) {
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
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

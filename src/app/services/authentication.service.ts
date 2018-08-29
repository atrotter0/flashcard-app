import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from '../models/user.model';

@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  users: FirebaseListObservable<any[]>;
  registrationSuccess: boolean = false;

  constructor(public afAuth: AngularFireAuth, public router: Router, private database: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.users = this.database.list('users');
  }

  registerUser(email: string, password: string) {
    let errorMessage: string;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      errorMessage = error.message;
    });
    if (errorMessage === undefined) {
      this.registrationSuccess = true;
    }
  }

  loginWithGoogle() {
    let userData;
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() =>{
      this.user.subscribe((data) => {
        userData = data;
        if (userData.email !== null) {
          this.addUserToDb();
          this.redirectToDecks();
        }
      });
    });

  }

  loginWithEmail(email: string, password: string) {
    let userData;
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.user.subscribe((data) => {
        userData = data;
        if (userData.email !== null) {
          this.addUserToDb();
          this.redirectToDecks();
        }
      });
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  addUserToDb() {
    let usersObservable = this.getAllUsers();
    let users;
    usersObservable.subscribe((data) => {
      users = data;
      this.findAndCreateUser(users);
    });
  }

  getAllUsers() {
    return this.users;
  }

  findAndCreateUser(users: User[]) {
    let userObject;
    let userFound = false;
    this.user.subscribe((data) => {
      for (let i = 0; i < users.length; i++) {
        userObject = data;
        if (users[i].email === userObject.email) {
          userFound = true;
          console.log("user found!");
        }
      }
      if (!userFound) {
        this.createUser(userObject);
      }
    });
  }

  createUser(userObject) {
    const newUser = new User(userObject.email);
    this.users.push(newUser);
  }


  redirectToDecks() {
    this.router.navigate(['decks']);
  }
}

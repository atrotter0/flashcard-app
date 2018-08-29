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
  localUser: User;
  registrationSuccess: boolean = false;

  constructor(public afAuth: AngularFireAuth, public router: Router, private database: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.users = this.database.list('users');
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(userId: string) {
    return this.database.object('users/' + userId);
  }

  getUserByEmail(email: string) {
    let usersFromDb;
    this.getAllUsers().subscribe((data) => {
      usersFromDb = data;
      this.searchForEmail(usersFromDb, email);
    });
  }

  searchForEmail(usersFromDb, email: string) {
    for (let i = 0; i < usersFromDb.length; i++) {
      if (usersFromDb[i].email === email) {
        this.localUser = usersFromDb[i];
      }
    }
  }

  returnUser(foundUser) {
    return foundUser;
  }

  registerUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.registrationSuccess = true;
      this.loginWithEmail(email, password);
    });
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() =>{
      this.subscribeAndCheckUsers();
    });

  }

  loginWithEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.subscribeAndCheckUsers();
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  subscribeAndCheckUsers() {
    let userData;
    this.user.subscribe((data) => {
      userData = data;
      this.checkForValidUser(userData);
    });
  }

  checkForValidUser(userData: User) {
    if (userData.email !== null) {
      this.subscribeAndStartUserSearch();
      this.redirectToDecks();
    }
  }

  subscribeAndStartUserSearch() {
    let usersObservable = this.getAllUsers();
    let usersFromDb;
    usersObservable.subscribe((data) => {
      usersFromDb = data;
      this.findAndCreateUser(usersFromDb);
    });
  }

  findAndCreateUser(usersFromDb: User[]) {
    let localUser;
    this.user.subscribe((data) => {
      localUser = data;
      this.findUser(usersFromDb, localUser);
    });
  }

  findUser(usersFromDb: User[], localUser: User) {
    let userFound = false;
    for (let i = 0; i < usersFromDb.length; i++) {
      if (usersFromDb[i].email === localUser.email) {
        userFound = true;
        this.localUser = usersFromDb[i];
        console.log("checking localUser in authService: " + localUser.email);
      }
    }
    if (!userFound) { this.createUser(localUser); }
  }

  createUser(userObject) {
    const newUser = new User(userObject.email);
    this.users.push(newUser);
    this.getUserByEmail(newUser.email);
  }

  redirectToDecks() {
    this.router.navigate(['decks']);
  }
}

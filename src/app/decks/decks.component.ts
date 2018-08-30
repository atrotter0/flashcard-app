import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { User } from '../models/user.model';
import { DeckService } from '../services/deck.service';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from "firebase";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css'],
  providers: [
    DeckService,
    AuthenticationService
  ]
})
export class DecksComponent implements OnInit {
  userDecks: Deck[];
  userId: string;
  private user;
  localUser: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private deckService: DeckService,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.authService.getUserByEmail(this.user.email);
      this.localUser = this.authService.localUser;
      this.userDecks = this.localUser.decks;
    }
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  goToDeckDetail(deck) {
    this.router.navigate(['decks/', deck.$key]); //set prop in db
  }

  goToDeckStart(deck) {
    this.router.navigate(['decks/start', deck.$key])
  }

  runDeleteDeck(deck: Deck) {
    this.deckService.deleteDeck(deck);
  }
}

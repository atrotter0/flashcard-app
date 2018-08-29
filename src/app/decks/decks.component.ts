import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
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
  decks: FirebaseListObservable<any[]>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private deckService: DeckService,
    public authService: AuthenticationService,
    private database: AngularFireDatabase
  ) {
  this.decks = database.list('decks');
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
    if (this.user !== undefined) { this.userDecks = this.deckService.getDecksByUserId(this.user.userId); }
  }

  goToDeckDetail(deck){
    this.router.navigate(['decks', deck.$key]);
  }

  goToDeckStart(deck) {
    this.router.navigate(['decks/start', deck.$key])
  }

  runDeleteDeck(deck: Deck) {
    this.deckService.deleteDeck(deck);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { DeckService } from '../services/deck.service';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from "firebase";

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

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private deckService: DeckService,
    public authService: AuthenticationService
  ) { }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
    if (this.user !== null) { this.userDecks = this.deckService.getDecksByUserId(this.user.userId); }
  }

}

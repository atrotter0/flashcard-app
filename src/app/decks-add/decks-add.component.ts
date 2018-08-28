import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck.model';
import { Question } from '../models/question.model';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-decks-add',
  templateUrl: './decks-add.component.html',
  styleUrls: ['./decks-add.component.css'],
  providers: [DeckService, AuthenticationService]
})
export class DecksAddComponent implements OnInit {
  private user;

  constructor(public deckService: DeckService, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  runCreateDeck(newName: string){
    let newDeck = new Deck(newName);
    this.deckService.createDeck(newDeck);
    this.user.decks.push(newDeck);
    this.deckService.addDeckToUser(this.user);
  }
}

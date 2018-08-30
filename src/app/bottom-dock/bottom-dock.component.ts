import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck.model';
import { Question } from '../models/question.model';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';
import { PiggybackService } from '../services/piggyback.service';

@Component({
  selector: 'app-bottom-dock',
  templateUrl: './bottom-dock.component.html',
  styleUrls: ['./bottom-dock.component.css'],
  providers: [DeckService, AuthenticationService]
})
export class BottomDockComponent implements OnInit {
  private user;
  creatingDeck: boolean = true;
  decks: Deck[] = [];
  index;
  chosenDeck: Deck;
  usersDecks;
  deck;

  constructor(private deckService: DeckService, public authService: AuthenticationService, private piggyBackService: PiggybackService) {

    this.deckService.decks.subscribe(res => {
      this.decks = [];
      // this.deckService.getDecksByEmail(this.user.email);
      Object.entries(res).forEach(entry => {
        if(entry[1].userEmail == this.user.email) {
          this.decks.push(entry[1]);
        }
      })
      console.log(this.user.email);
      console.log(this.decks);
    });
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  select(value) {
    if (value == '$creating') this.creatingDeck = true;
    else {
      this.creatingDeck = false;

      this.decks.forEach(deck => {

        if (deck.$key == value ) {
          console.log(value);
          console.log(deck);
          this.chosenDeck = deck;
          this.piggyBackService.chooseDeck(deck);
        }
      })

    }
  }

  runCreateDeck(deckName) {
    let newDeck = new Deck(deckName, this.user.email);
    this.deckService.createDeck(newDeck);
  }

  tossDeck(key) {
    this.deckService.deleteDeckWithKey(key);
    for(let i = 0; i < this.decks.length; i++) {
      if (this.decks[i].$key == key) {
        this.decks.splice(i, 1);
        i = this.decks.length + 1;
      }
    }
    console.log(this.decks.length);
    if (this.decks.length == 0) {
      this.creatingDeck = true;
    }
  }
}

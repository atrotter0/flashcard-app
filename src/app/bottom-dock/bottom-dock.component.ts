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
  creatingDeck: boolean;
  decks;
  index;
  chosenDeck: Deck;

  constructor(private deckService: DeckService, public authService: AuthenticationService, private piggyBackService: PiggybackService) {
    this.piggyBackService.message.subscribe(data => {
      if (data.content == "Here's a deck") {
        this.decks = data.userDecks;
        this.chosenDeck = data.chosenDeck;
        console.log("my own deck:");
        console.log(this.chosenDeck);
      }
    })
  }

  ngOnInit() {
    if (!this.decks) this.creatingDeck = true;
    else this.creatingDeck = false;
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  select(value) {
    if (value == '$creating') this.creatingDeck = true;
    else {
      this.creatingDeck = false;
      // console.log(value);
      this.piggyBackService.change(value);
    }
  }

  runCreateDeck(value) {

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

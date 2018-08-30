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
  creatingDeck: boolean = false;
  decks;

  constructor(private deckService: DeckService, public authService: AuthenticationService, private piggyBackService: PiggybackService) {
    this.piggyBackService.message.subscribe(data => {
      if (data.content == "Here's a deck") {
        this.decks = data.userDecks;
      }
    })
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  select(value) {
    if (value == '$creating') this.creatingDeck = true;
    else this.creatingDeck = false;
  }

  runCreateDeck(deckName) {

  }

  tossDeck(deckId) {
    console.log(deckId);
  }
}

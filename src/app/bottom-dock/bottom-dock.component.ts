import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck.model';
import { Question } from '../models/question.model';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-bottom-dock',
  templateUrl: './bottom-dock.component.html',
  styleUrls: ['./bottom-dock.component.css'],
  providers: [DeckService, AuthenticationService]
})
export class BottomDockComponent implements OnInit {
  private user;
  creatingDeck: boolean = false;

  constructor(private deckService: DeckService, public authService: AuthenticationService) { }

  ngOnInit() { }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  select(value) {
    if (value == '$creating') this.creatingDeck = true;
    else this.creatingDeck = false;
  }

  runCreateDeck(deckName) {
    let newDeck = new Deck(deckName, this.user.email);
    this.deckService.createDeck(newDeck);
    this.user.decks.push(newDeck);
    this.deckService.addDeckToUser(this.user);
  }

  tossDeck(deckId) {
    console.log(deckId);
  }
}

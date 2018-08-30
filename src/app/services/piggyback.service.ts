import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, Subject } from 'rxjs/rx';
import { Deck } from '../models/deck.model';

@Injectable()
export class PiggybackService {
  message: BehaviorSubject<any> = new BehaviorSubject({content: "", userDecks: [], chosenDeck: Deck});

  change(message) {
    this.message.next({...this.message.value, content: message});
  }

  shareDeck(deck) {
    this.message.next({...this.message.value, content: "Here's a deck", userDecks: deck})
  }

  chooseDeck(deck) {
    this.message.next({...this.message.value, content: "Chose a deck", chosenDeck: deck})
  }
}

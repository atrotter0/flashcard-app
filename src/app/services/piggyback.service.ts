import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, Subject } from 'rxjs/rx';

@Injectable()
export class PiggybackService {
  message: BehaviorSubject<any> = new BehaviorSubject({content: "", userDecks: []});

  change(message) {
    this.message.next({...this.message.value, content: message});
  }

  shareDeck(deck) {
    this.message.next({...this.message.value, content: "Here's a deck", userDecks: deck})
  }
}

import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DeckService {
  decks: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) {
    this.decks = database.list('decks');
  }

  getDeckByDeckId(deckId: number) {
    return Decks[deckId];
  }

  getDecksByUserId(userId: string) {
    const user = this.database.object('users/' + userId);
    let decks: Deck[];
    user.subscribe(data => {
      decks = data.decks;
    });
    return decks;
  }

  createDeck(newDeck){
    this.decks.push(newDeck);
  }

  editDeck(localEditedDeck){
    let deckEntryInFirebase = this.getDeckByDeckId(localEditedDeck.$key);
    deckEntryInFirebase.update({name: localEditedDeck.name})
  }
}

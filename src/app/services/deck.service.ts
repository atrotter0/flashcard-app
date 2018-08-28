import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DeckService {
  decks: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.decks = database.list('decks');
  }

  getDeckByDeckId(deckId: number) {
    return this.database.object('decks/' + deckId);
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
    deckEntryInFirebase.update({name: localEditedDeck.name});
  }

  deleteDeck(deckToDelete) {
    let deckEntryInFirebase = this.getDeckByDeckId(deckToDelete.$key);
    deckEntryInFirebase.remove();

  addQuestionToDeck(localDeck) {
    let deckEntryInFirebase = this.getDeckByDeckId(localDeck.$key);
    deckEntryInFirebase.update({questions: localDeck.questions});
  }
}

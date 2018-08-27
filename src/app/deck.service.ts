import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';

@Injectable()
export class DeckService {

  constructor() { }

  getDeckById(deckId: number) {
    for (let i = 0; i < Decks.length; i++) {
      return Decks[i];
    }
  }
}

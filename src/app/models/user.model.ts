import { Deck } from './deck.model';

export class User {
  public decks: Deck[]
  constructor(
    public email: string,
  ) { }
}

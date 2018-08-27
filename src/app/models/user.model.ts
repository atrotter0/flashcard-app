import { Decks } from './decks.model';

export class User {
  constructor(
    public email: string,
    public decks: Decks
  ) { }
}

import { Deck } from './deck.model';
import { Question } from './question.model';

export class User {
  public decks: Deck[];
  public questions: Question[];
  constructor(public email: string) {
    this.decks = [];
    this.questions = [];
  }
}

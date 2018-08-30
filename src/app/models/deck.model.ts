import { Question } from './question.model';

export class Deck {
  public questions: object;

  constructor(public name: string, public userEmail: string) { }
}

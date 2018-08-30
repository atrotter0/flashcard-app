import { Question } from './question.model';

export class Deck {
  public questions: {};
  $key: any;

  constructor(public name: string, public userEmail: string) { }
}

import { Question } from './question.model';

export class Deck {
  constructor(
    public name: string,
    public questions: Question[]
  ) { }
}

import { Question } from './question.model';

export class Deck {
  constructor(public name: string){}
  
  constructor(
    public name: string,
    public userId: string,
    public questions: Question[]
  ) { }
}

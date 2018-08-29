import { Question } from './question.model';

export class Deck {
  //add this back to constructor when user is wired up
  public userId: string;
  public questions: object[];

  constructor(
    public name: string,
  ) { }
}

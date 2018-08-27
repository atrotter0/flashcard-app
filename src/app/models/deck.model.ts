export class Deck {
  constructor(
    public name: string,
    public questions = Question[];
  ) { }
}

import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck.service';
import { Deck } from '../models/deck.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-decks-add',
  templateUrl: './decks-add.component.html',
  styleUrls: ['./decks-add.component.css'],
  providers: [DeckService]
})
export class DecksAddComponent implements OnInit {

  constructor(public deckService: DeckService) { }

  ngOnInit() {
  }

  runCreateDeck(newName: string){
    let newDeck = new Deck(newName);
    this.deckService.createDeck(newDeck);
  }

}

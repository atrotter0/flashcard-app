import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck.model';

@Component({
  selector: 'app-decks-edit',
  templateUrl: './decks-edit.component.html',
  styleUrls: ['./decks-edit.component.css'],
  providers: [DeckService]
})
export class DecksEditComponent implements OnInit {
  selectedDeck: null;

  constructor(public deckService: DeckService) { }

  ngOnInit() {
  }

  runEditDeck(){
    this.deckService.editDeck(deckToEdit);
  }

}

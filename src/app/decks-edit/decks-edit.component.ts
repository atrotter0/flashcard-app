import { Component, OnInit, Input } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck.model';

@Component({
  selector: 'app-decks-edit',
  templateUrl: './decks-edit.component.html',
  styleUrls: ['./decks-edit.component.css'],
  providers: [DeckService]
})

export class DecksEditComponent implements OnInit {
  @Input() selectedDeck;
  constructor(public deckService: DeckService) { }

  ngOnInit() {
  }

  runEditDeck(deckToEdit){
    this.deckService.editDeck(deckToEdit);
  }

}

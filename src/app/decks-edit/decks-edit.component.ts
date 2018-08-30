import { Component, OnInit, Input } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decks-edit',
  templateUrl: './decks-edit.component.html',
  styleUrls: ['./decks-edit.component.css'],
  providers: [DeckService]
})

export class DecksEditComponent implements OnInit {
  @Input() selectedDeck;
  constructor(public deckService: DeckService, private router: Router) { }

  ngOnInit() { }

  runEditDeck(deckToEdit){
    this.deckService.editDeck(deckToEdit);
    this.goToDeckDetail();
  }

  goToDeckDetail() {
    this.router.navigate(['decks']);
  }
}

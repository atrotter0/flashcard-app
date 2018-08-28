import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css'],
  providers: [DeckService]
})
export class DeckDetailsComponent implements OnInit {
  deckId;
  deckToDisplay;

  constructor(private route: ActivatedRoute, private deckService: DeckService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.deckId = urlParameters['id'];
    });
    this.deckService.getDeckByDeckId(this.deckId).subscribe((dataLastEmittedFromObserver) => {
      this.deckToDisplay = dataLastEmittedFromObserver;
    })
  }

}

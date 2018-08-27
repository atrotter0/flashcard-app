import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css'],
  providers: [DeckService]
})
export class DecksComponent implements OnInit {
  userDecks: Deck[];
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private deckService: DeckService
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['userId'];
    })
    this.userDecks = this.deckService.getDecksByUserId(this.userId);
  }

}

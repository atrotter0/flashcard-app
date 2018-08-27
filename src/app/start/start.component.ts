import { Component, OnInit } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { Question } from '../models/question.model';
import { Router } from '@angular/router';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  currentDeck: Deck;
  currentQuestion: Question;
  deckId: number;

  constructor(private router: Router, private deckService: DeckService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.deckId = parseInt(urlParameters['id']);
    })
    this.currentDeck = this.deckService.getDeckById(this.deckId);
  }

}

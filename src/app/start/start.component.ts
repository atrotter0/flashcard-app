import { Component, OnInit } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { Question } from '../models/question.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  currentDeck: Deck;
  currentQuestion: Question;

  constructor(private router: Router, private deckService: DeckService) { }

  ngOnInit() {
    this.currentDeck = this.deckService.getDeck();
  }

}

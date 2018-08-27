import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { Question } from '../models/question.model';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [DeckService]
})
export class StartComponent implements OnInit {
  currentDeck: Deck;
  currentQuestion: Question;
  deckId: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private deckService: DeckService
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.deckId = parseInt(urlParameters['id']);
    })
    this.currentDeck = this.deckService.getDeckById(this.deckId);
    this.currentDeck.questions.map(question => question.viewed === false);
    this.currentQuestion = this.getRandomQuestion();
  }

  getRandomQuestion() {
    let question = this.currentDeck.questions[Math.floor(Math.random() * this.currentDeck.questions.length)];
    return question;
  }




}

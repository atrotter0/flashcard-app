import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { Question } from '../models/question.model';
import { DeckService } from '../services/deck.service';
import { FirebaseObjectObservable } from 'angularfire2/database';

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
    let deckObserbable: FirebaseObjectObservable<any>;

    this.route.params.forEach((urlParameters) => {
      this.deckId = parseInt(urlParameters['id']);
    });
    deckObserbable = this.deckService.getDeckByDeckId(this.deckId);
    deckObserbable.subscribe((data) => {
      this.currentDeck = data;
      this.currentDeck.questions.map(question => question.viewed === false);
      this.currentQuestion = this.getRandomQuestion();
    });
  }

  getRandomQuestion() {
    let question = this.currentDeck.questions[Math.floor(Math.random() * this.currentDeck.questions.length)];
    return question;
  }

  nextQuestion() {
    this.currentQuestion.viewed = true;
    this.currentDeck.questions = this.currentDeck.questions.filter(question => question.viewed === false);
    this.currentQuestion = this.getRandomQuestion();
  }

  showAnswer() {
    return this.currentQuestion.answerText;
  }

  checkRemainingQuestions() {
    let remaining = this.currentDeck.questions.filter(question => question.viewed === false)
    return (remaining.length > 0 ? true : false);
  }

  startAgain() {
    this.currentDeck.questions.map(question => question.viewed === false);
    this.currentQuestion = this.getRandomQuestion();
  }


}

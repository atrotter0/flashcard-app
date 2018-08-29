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
  currentQuestions: Question[];
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
      for (let i = 0; i < this.currentDeck.questions.length; i++) {
        let categoryname = Object.getOwnPropertyNames(this.currentDeck.questions[i])[0];
        let arrayOfCategoryQuestions = this.currentDeck.questions[categoryname];
        this.currentQuestions = this.currentQuestions.concat(...arrayOfCategoryQuestions);
      }
      this.currentQuestions.map(question => question.viewed === false);
      this.currentQuestion = this.getRandomQuestion();
    });
  }

  getRandomQuestion() {
    let question = this.currentQuestions[Math.floor(Math.random() * this.currentQuestions.length)];
    return question;
  }

  nextQuestion() {
    this.currentQuestion.viewed = true;
    this.currentQuestions = this.currentQuestions.filter(question => question.viewed === false);
    this.currentQuestion = this.getRandomQuestion();
  }

  showAnswer() {
    return this.currentQuestion.answerText;
  }

  checkRemainingQuestions() {
    let remaining = this.currentQuestions.filter(question => question.viewed === false)
    return (remaining.length > 0 ? true : false);
  }

  startAgain() {
    this.currentQuestions.map(question => question.viewed === false);
    this.currentQuestion = this.getRandomQuestion();
  }


}

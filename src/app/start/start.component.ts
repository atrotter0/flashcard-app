import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
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
  currentQuestions: Question[] = [];
  currentQuestion: Question;
  deckId: string;
  questionsLeft: number;
  questionsDone: number;
  displayAnswer: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private deckService: DeckService
  ) { }

  ngOnInit() {
    this.setupAndInitialize();
  }

  setupAndInitialize() {
    let deckObservable: FirebaseObjectObservable<any>;
    this.route.params.forEach((urlParameters) => {
      this.deckId = urlParameters['id'];
    });
    deckObservable = this.deckService.getDeckByDeckId(this.deckId);
    this.initQuiz(deckObservable);
  }

  initQuiz(deckObservable: FirebaseObjectObservable<any>) {
    deckObservable.subscribe((data) => {
      this.currentDeck = data;
      console.log("current Deck: " + JSON.stringify(this.currentDeck));
      this.setQuestionsForCategory();
      this.setfinishedAndRemaining()
      this.resetQuestions();
      this.currentQuestion = this.getRandomQuestion();
      console.log("current question: " + JSON.stringify(this.currentQuestion));
    });
  }

  setQuestionsForCategory() {
    for (var category in this.currentDeck.questions) {
      this.currentQuestions = this.currentQuestions.concat(this.currentDeck.questions[category]);
    }
  }

  setfinishedAndRemaining() {
    this.questionsLeft = this.currentQuestions.length;
    this.questionsDone = 0;
  }

  resetQuestions() {
    this.currentQuestions.forEach((question) => {
      question.viewed = false;
    });
    this.setfinishedAndRemaining();
  }

  randomNumberForRandomQuestions() {
    return Math.floor(Math.random() * this.currentQuestions.length);
  }

  getRandomQuestion() {
    let question = this.currentQuestions[this.randomNumberForRandomQuestions()];
    return question;
  }

  nextQuestion() {
    this.displayAnswer = false;
    this.currentQuestion.viewed = true;
    this.currentQuestions = this.currentQuestions.filter(question => question.viewed === false);
    this.currentQuestion = this.getRandomQuestion();
    this.questionsLeft--;
    this.questionsDone++;
  }

  showAnswer() {
    return this.currentQuestion.answerText;
  }

  toggleDisplayAnswer() {
    this.displayAnswer = !this.displayAnswer;
  }

  stillQuestionsLeft() {
    return (this.questionsLeft > 1);
  }

  retakeQuiz() {
    this.displayAnswer = false;
    this.currentQuestions = [];
    this.currentQuestion = undefined;
    this.setupAndInitialize();
  }

  getPic() {
    return "assets/card.gif";
  }
}

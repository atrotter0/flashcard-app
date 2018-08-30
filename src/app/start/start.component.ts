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
  currentQuestions: Question[] = [];
  currentQuestion: Question;
  deckId: string;
  questionsLeft: Question[];
  questionsDone: number[];
  displayAnswer: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private deckService: DeckService
  ) { }

  ngOnInit() {
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
      this.resetDisplays()
      this.resetQuestions();
      this.currentQuestion = this.getRandomQuestion();
      console.log("current question: " + JSON.stringify(this.currentQuestion));
    });
  }

  setQuestionsForCategory() {
    for (var category in this.currentDeck.questions) {
      this.currentQuestions = this.currentQuestions.concat(this.currentDeck.questions[category]);
    }
    console.log("currentQuestions: " + JSON.stringify(this.currentQuestions));
  }

  resetDisplays() {
    this.questionsLeft = this.currentQuestions;
    this.questionsDone = [];
  }

  resetQuestions() {
    for (let i = 0; i < this.currentQuestions.length; i++) {
      this.currentQuestions[i].viewed = false;
    }
    this.resetDisplays()
  }

  randomNumberForRandomQuestions() {
    return Math.floor(Math.random() * this.currentQuestions.length);
  }

  getRandomQuestion() {
    let question = this.currentQuestions[this.randomNumberForRandomQuestions()];
    console.log("random question: " + question);
    return question;
  }

  nextQuestion() {
    this.currentQuestion.viewed = true;
    this.currentQuestions = this.currentQuestions.filter(question => question.viewed === false);
    this.currentQuestion = this.getRandomQuestion();
    this.questionsLeft.splice(0, 1);
    this.questionsDone.push(0);
  }

  showAnswer() {
    return this.currentQuestion.answerText;
  }

  toggleDisplayAnswer() {
    this.displayAnswer = !this.displayAnswer;
  }

  checkRemainingQuestions() {
    let remaining = this.currentQuestions.filter(question => question.viewed === false)
    return (remaining.length > 0 ? true : false);
  }

  startAgain() {
    this.resetQuestions();
    this.currentQuestion = this.getRandomQuestion();
  }

  getPic() {
    return "assets/card.gif";
  }
}

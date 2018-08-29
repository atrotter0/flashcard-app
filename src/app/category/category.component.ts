import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { DeckService } from '../services/deck.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [
    QuestionService,
    DeckService
  ]
})
export class CategoryComponent implements OnInit {
  categoryName: string;
  categoryQuestions: Question[];
  chosenDeck: Deck;
  userDecks: Deck[];
  private user;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private questionService: QuestionService,
    private deckService: DeckService
  ) { }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
    if (this.user !== undefined) { this.userDecks = this.deckService.getDecksByUserId(this.user.userId); }
    this.route.params.subscribe(param => {
      this.categoryName = param.category;
      this.categoryQuestions = this.questionService.getQuestionsByCategory(this.categoryName);
    })
  }

  setChosenDeck(deck: Deck) {
    this.chosenDeck = deck;
  }

  runAddQuestionToDeck(question: Question) {
    if (question.category.toLowerCase() in this.chosenDeck.questions) {
      this.chosenDeck.questions[question.category.toLowerCase()].push(question);
    } else {
      this.chosenDeck.questions[question.category.toLowerCase()] = [question];
    }
    this.deckService.updateQuestionsInDeck(this.chosenDeck);
  }

  runDeleteQuestionFromDeck(question: Question) {
    let categoryArray = this.chosenDeck.questions[question.category.toLowerCase()];
    let indexOfQuestionToRemove = categoryArray.indexOf(question);
    this.chosenDeck.questions[question.category.toLowerCase()].splice(indexOfQuestionToRemove, 1);
    this.deckService.updateQuestionsInDeck(this.chosenDeck);
  }

  runAddAllQuestionsToDeck() {
    if (this.categoryQuestions[0].category.toLowerCase() in this.chosenDeck.questions) {
      this.chosenDeck.questions[this.categoryQuestions[0].category.toLowerCase()].push(this.categoryQuestions);
    } else {
      this.chosenDeck.questions[this.categoryQuestions[0].category.toLowerCase()] = [this.categoryQuestions];
    }
    this.deckService.updateQuestionsInDeck(this.chosenDeck);
  }

  runDeleteAllQuestionsFromDeck() {
    delete this.chosenDeck.questions[this.categoryQuestions[0].category];
    this.deckService.updateQuestionsInDeck(this.chosenDeck);
  }
}

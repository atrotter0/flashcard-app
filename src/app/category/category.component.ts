import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { DeckService } from '../services/deck.service';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from "firebase";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PiggybackService } from '../services/piggyback.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [
    QuestionService,
    DeckService,
    AuthenticationService
  ]
})
export class CategoryComponent implements OnInit {
  categoryName: string;
  categoryQuestions: Question[];
  chosenDeck: Deck;
  userDecks: Deck[];
  private user;
  categories: FirebaseListObservable<any[]>;
  showAddAll: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private questionService: QuestionService,
    private deckService: DeckService,
    private database: AngularFireDatabase,
    private piggyBackService: PiggybackService
  ) {
    this.categories = database.list('categories');
    this.piggyBackService.message.subscribe(data => {
      this.userDecks = data.userDecks;
      this.chosenDeck = data.chosenDeck;
    })
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
    if (this.user !== undefined) {
    this.userDecks = this.deckService.getDecksByUserId(this.user.userId); }
    this.route.params.subscribe(param => {
      this.categoryName = param.category;
      this.categoryQuestions = this.questionService.getQuestionsByCategory(this.categoryName, this.user);
      this.updateTitle();
    })
  }

  updateTitle() {
    this.categories.subscribe(result => {
      result.forEach(category => {
        if (this.categoryName == category.name.toLowerCase()) {
          this.categoryName = category.name;
        }
      })
    })
  }

  setChosenDeck(deck: Deck) {
    this.chosenDeck = deck;
  }

  markAllQuestionsTo(boolean) {
    let category = this.categoryQuestions[0].category;
    if(!this.chosenDeck.questions) {
      this.chosenDeck.questions = {};
    }

    if(!this.chosenDeck.questions[category]) {
      this.chosenDeck.questions[category] = [];
    }

    this.chosenDeck.questions[category] = [];

    this.categoryQuestions.forEach(question => {
      question.bookmark = boolean;
      if (boolean) {
        this.chosenDeck.questions[category].push(question);
      }
    })

    this.deckService.updateQuestionsInDeck(this.chosenDeck);
    if (boolean) {
      this.showAddAll = false;
    } else {
      this.showAddAll = true;
    }
  }

  toggleQuestionOnDeck(question) {
    question.bookmark = !question.bookmark;
    let category = this.categoryQuestions[0].category;

    if(!this.chosenDeck.questions) {
      this.chosenDeck.questions = {};
    }

    if(!this.chosenDeck.questions[category]) {
      this.chosenDeck.questions[category] = [];
    }

    for (let i = 0; i < this.chosenDeck.questions[category].length; i++) {
      if (question.$key == this.chosenDeck.questions[category][i].$key) {
        this.chosenDeck.questions[category].splice(i, 1);

        this.showAddAll = true;
        return;
      }
    }

    this.chosenDeck.questions[category].push(question);
    this.deckService.updateQuestionsInDeck(this.chosenDeck);

    if (this.chosenDeck.questions[category].length == this.categoryQuestions.length) {
      this.showAddAll = false;
    }
  }
}

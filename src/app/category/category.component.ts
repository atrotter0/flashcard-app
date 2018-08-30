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
      console.log("grabbing: ");
      console.log(data.chosenDeck);
      this.chosenDeck = data.chosenDeck;
      // if(data.content.substring(0, 3) == "-LL") {
      //   let match = this.userDecks.filter(deck => {
      //     // console.log(deck.$key);
      //     // console.log(data.content);
      //     // ignore atom errors on $key
      //     return deck.$key === data.content;
      //   })
      //
      //   this.chosenDeck = match[0];
      //
      //
      //
      //   console.log("Current chosen deck: ");
      //   console.log(this.chosenDeck);
      // };
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

  getCategoryAndLowerCase(question: Question) {
    return question.category.toLowerCase();
  }

  getCategoryFromCategoryQuestionsAndLowerCase() {
    return this.categoryQuestions[0].category.toLowerCase();
  }

  runAddQuestionToDeck(question: Question) {
    if (this.getCategoryAndLowerCase(question) in this.chosenDeck.questions) {
      this.chosenDeck.questions[this.getCategoryAndLowerCase(question)].push(question);
    } else {
      this.chosenDeck.questions[this.getCategoryAndLowerCase(question)] = [question];
    }
    this.deckService.updateQuestionsInDeck(this.chosenDeck);
  }

  runDeleteQuestionFromDeck(question: Question) {
    let categoryArray = this.chosenDeck.questions[this.getCategoryAndLowerCase(question)];
    let indexOfQuestionToRemove = categoryArray.indexOf(question);
    this.chosenDeck.questions[this.getCategoryAndLowerCase(question)].splice(indexOfQuestionToRemove, 1);
    this.deckService.updateQuestionsInDeck(this.chosenDeck);
  }

  markAllQuestionsTo(boolean) {
    let category = this.categoryQuestions[0].category;
    console.log(category);
    // if (this.categoryQuestions[0].category.toLowerCase() in this.chosenDeck.questions) {
    //   this.chosenDeck.questions[this.getCategoryFromCategoryQuestionsAndLowerCase()].push(this.categoryQuestions);
    // } else {
    //   this.chosenDeck.questions[this.getCategoryFromCategoryQuestionsAndLowerCase()] = [this.categoryQuestions];
    // }
    // this.deckService.updateQuestionsInDeck(this.chosenDeck);

    if(!this.chosenDeck.questions) {
      this.chosenDeck.questions = {}; // this block of code should be modulated, or just built in
    }

    if(!this.chosenDeck.questions[category]) {
      this.chosenDeck.questions[category] = [];
    }

    this.categoryQuestions.forEach(question => {
      question.bookmark = boolean;
      if (boolean) this.chosenDeck.questions[category].push(question);
      else this.chosenDeck.questions[category].pop();
    })

    console.log(this.chosenDeck.questions);
    this.deckService.updateQuestionsInDeck(this.chosenDeck);
  }

  runDeleteAllQuestionsFromDeck() {
    delete this.chosenDeck.questions[this.getCategoryFromCategoryQuestionsAndLowerCase()];
    this.deckService.updateQuestionsInDeck(this.chosenDeck);
  }

  toggleQuestionOnDeck(question) {
    question.bookmark = !question.bookmark;
    console.log(this.categoryQuestions);
    let category = this.categoryQuestions[0].category;
    console.log(category);

    if(!this.chosenDeck.questions) {
      this.chosenDeck.questions = {};
    }

    if(!this.chosenDeck.questions[category]) {
      this.chosenDeck.questions[category] = [];
    }

    for(let i = 0; i < this.chosenDeck.questions[category].length; i++) {
      if (question.$key == this.chosenDeck.questions[category][i].$key) {
        this.chosenDeck.questions[category].splice(i, 1);
        console.log(this.chosenDeck.questions);
        return;
      }
    }

    this.chosenDeck.questions[category].push(question);

    this.deckService.updateQuestionsInDeck(this.chosenDeck);

    console.log(this.chosenDeck.questions);
    // console.log(category);
    // if(this.chosenDeck.questions) {
    //   if (this.chosenDeck.questions[category])
    //   this.chosenDeck.questions[category].push(question);
    // }
    // else {
    //   //
    //   this.chosenDeck.questions = {};
    //   this.chosenDeck.questions[category] = [question];
    // }
    // console.log(this.chosenDeck.questions);

  }
}

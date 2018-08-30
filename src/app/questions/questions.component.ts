import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { User } from '../models/user.model';
import { Decks } from '../models/decks.model';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from "firebase";
import { FirebaseListObservable } from '../../../node_modules/angularfire2/database';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [QuestionService, AuthenticationService]
})
export class QuestionsComponent implements OnInit {
  allQuestionsFromDb: FirebaseListObservable<any[]>;
  allQuestions: Question[];
  userQuestionsList: Question[] = [];
  private user;
  localUser: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private qService: QuestionService,
    public authService: AuthenticationService) { }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    if (this.user !== undefined) {
      this.allQuestionsFromDb = this.qService.getAllQuestions();
      this.buildQuestionsList();
      console.log(this.allQuestionsFromDb);
    }
  }

  ngDoCheck(){
    this.user = firebase.auth().currentUser;
  }

  buildQuestionsList() {
    this.allQuestionsFromDb.subscribe((data) => {
      this.allQuestions = data;
      this.buildUserQuestionsList();
    });
  }

  buildUserQuestionsList() {
    this.allQuestions.forEach((question) => {
      if (question.userEmail === this.user.email) {
        console.log('found question for ' + this.user.email);
        this.userQuestionsList.push(question);
      }
    });
  }

  goToQuestionDetail(question) {
    this.router.navigate(['questions/', question.$key]);
  }

  runDeleteQuestion(question: Question){
    this.qService.deleteQuestion(question);
    this.deleteFromUserQuestions(question);
  }

  deleteFromUserQuestions(question: Question) {
    const questionPosition = this.userQuestionsList.indexOf(question);
    this.userQuestionsList.splice(questionPosition, 1);
  }
}

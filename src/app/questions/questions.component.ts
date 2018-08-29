import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from "firebase";


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [QuestionService, AuthenticationService]
})
export class QuestionsComponent implements OnInit {
  userQuestions: Question[];
  private user;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private qService: QuestionService,
    public authService: AuthenticationService) { }

  ngDoCheck(){
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
      if (this.user !== undefined) { this.userQuestions = this.qService.getQuestionsByUserEmail(this.user.email); }
  }

  goToQuestionDetail(question){
    this.router.navigate(['questions', question.$key]);
  }

  runDeleteQuestion(deck: Deck){
    this.qService.deleteQuestion(deck)
  }
}

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
  private user;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private qService: QuestionService,
      public authService: AuthenticationService) { }

  ngOnInit() {
  }

  ngDoCheck(){
    this.user = firebase.auth().currentUser;
  }

  

}

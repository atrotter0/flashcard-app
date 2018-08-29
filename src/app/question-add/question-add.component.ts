import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { AuthenticationService } from '../services/authentication.service';
import { Question } from '../models/question.model';
import * as firebase from "firebase";


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css'],
  providers: [QuestionService, AuthenticationService]
})
export class QuestionAddComponent implements OnInit {
  userQuestions: Question[];
  private user;

  constructor(public qService: QuestionService, public authService: AuthenticationService) { }

  ngDoCheck(){
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
    if (this.user !== undefined) { this.userQuestions = this.qService.getQuestionsByUserEmail(this.user.email);
    console.log("user email: " + this.user.email); }
  }



  runCreateQuestion(newQText: string, newQAnswer: string, newQCategory: string, newQDifficulty: number){

    let newQuestion = new Question(newQText, newQAnswer, newQDifficulty, newQCategory, this.user.email);
    this.qService.createQuestion(newQuestion);

  }




}

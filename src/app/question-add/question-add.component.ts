import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { AuthenticationService } from '../services/authentication.service';
import { Question } from '../models/question.model';
import * as firebase from "firebase";


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css'],
  providers: [QuestionService]
})
export class QuestionAddComponent implements OnInit {
  private user;


  constructor(public qService: QuestionService, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  ngDoCheck(){
    this.user = firebase.auth().currentUser;
  }

  runCreateQuestion(newQText: string, newQAnswer: string, newQCategory: string, newQDifficulty: number){
    let newQuestion = new Question(newQText, newQAnswer, newQDifficulty, newQCategory, this.user.email);
    this.qService.createQuestion(newQuestion);
  }


}

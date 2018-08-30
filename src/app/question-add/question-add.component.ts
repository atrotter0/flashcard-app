import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { AuthenticationService } from '../services/authentication.service';
import { Question } from '../models/question.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(
    public qService: QuestionService,
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngDoCheck(){
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() { }

  runCreateQuestion(newQText: string, newQAnswer: string, newQCategory: string, newQDifficulty: number){
    let newQuestion = new Question(newQText, newQAnswer, newQDifficulty, newQCategory, this.user.email);
    this.qService.createQuestion(newQuestion);
    this.goToQuestionDetail();
  }

  goToQuestionDetail() {
    this.router.navigate(['questions']);
  }
}

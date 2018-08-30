import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { AuthenticationService } from '../services/authentication.service';
import { Question } from '../models/question.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firebase from "firebase";
import { CategoryService } from '../services/category.service';
import { FirebaseListObservable } from '../../../node_modules/angularfire2/database';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css'],
  providers: [QuestionService, AuthenticationService, CategoryService]
})
export class QuestionAddComponent implements OnInit {
  private user;
  userQuestions: Question[];
  categories: FirebaseListObservable<any[]>;
  categoryNames: String[] = [];

  constructor(
    public qService: QuestionService,
    public authService: AuthenticationService,
    private router: Router,
    public categoryService: CategoryService
  ) {
      this.categories = this.categoryService.getCategories();
      this.getCategoryNames();
    }

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

  getCategoryNames() {
    this.categories.subscribe((data) => {
      let categoryObjects = data;
      this.setCategoryNames(categoryObjects);
    });
  }

  setCategoryNames(categoryObjects: any[]) {
    categoryObjects.forEach((category) => {
      this.categoryNames.push(category.name);
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css'],
  providers: [QuestionService, CategoryService]
})
export class QuestionEditComponent implements OnInit {
  @Input() selectedQuestion;
  categories: FirebaseListObservable<any[]>;
  categoryNames: String[] = [];

  constructor(public qService: QuestionService, public router: Router, public categoryService: CategoryService) {
    this.categories = this.categoryService.getCategories();
    this.getCategoryNames();
  }

  ngOnInit() { }

  runEditQuestion(questionToEdit) {
    this.qService.editQuestion(questionToEdit);
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

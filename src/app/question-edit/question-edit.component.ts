import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css'],
  providers: [QuestionService]
})
export class QuestionEditComponent implements OnInit {
  @Input() selectedQuestion;
  constructor(public qService: QuestionService) { }

  ngOnInit() { }

  runEditQuestion(questionToEdit) {
    this.qService.editQuestion(questionToEdit);
  }
}

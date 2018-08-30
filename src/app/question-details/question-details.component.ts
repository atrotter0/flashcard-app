import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
  providers: [QuestionService]
})
export class QuestionDetailsComponent implements OnInit {
  questionKey;
  questionToDisplay;

  constructor(
      private route: ActivatedRoute,
      private qService: QuestionService,
      private location: Location,
      private router: Router) { }

    ngOnInit() {
      this.route.params.forEach((urlParameters) => {
        this.questionKey = urlParameters['id'];
      });
      this.qService.getQuestionByQuestionKey(this.questionKey).subscribe((dataLastEmittedFromObserver) => {
        this.questionToDisplay = dataLastEmittedFromObserver;
      })
    }

}

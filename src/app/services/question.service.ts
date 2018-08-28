import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { Question } from '../models/question.model';
import { Questions } from '../models/questions.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class QuestionService {
  questions: FirebaseListObservable<any[]>;
  constructor() {
    this.questions = database.list('questions');
  }

  getQuestionsByCategory(category: string) {
    let categoryQuestions: Question[] = [];

  }

}

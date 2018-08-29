import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Decks } from '../models/decks.model';
import { Question } from '../models/question.model';
import { Questions } from '../models/questions.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class QuestionService {
  questions: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) {
    this.questions = database.list('questions');
  }

  getQuestionsByCategory(category: string, user: User) {
    let localQuestions: Question[];
    let categoryQuestions: Question[] = [];
    this.questions.subscribe((data) => {
      localQuestions = data;
      for (let i = 0; i < localQuestions.length; i++) {
        if (localQuestions[i].category.toLowerCase() === category.toLowerCase()) {
          if (localQuestions[i].adminCreated || localQuestions[i].userEmail === user.email) {
            categoryQuestions.push(localQuestions[i]);
          }  
        }
      }
    });
    return categoryQuestions;
  }

}

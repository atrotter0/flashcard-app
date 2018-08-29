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

  getAllQuestions() {
    return this.database.list('questions');
  }

  getQuestionByQuestionKey(questionKey: string){
    return this.database.object('questions/' + questionKey);
  }

  getQuestionsByCategory(category: string) {
    let localQuestions: Question[];
    let categoryQuestions: Question[] = [];
    this.questions.subscribe((data) => {
      localQuestions = data;
      for (let i = 0; i < localQuestions.length; i++) {
        if (localQuestions[i].category.toLowerCase() === category.toLowerCase()) {
          categoryQuestions.push(localQuestions[i]);
        }
      }
    });
    return categoryQuestions;
  }

  getQuestionsByUserEmail(userEmail) {
    let localQuestions: Question[];
    let userQuestions: Question[] = [];
    this.questions.subscribe((data) =>{
      localQuestions = data;
      for (let i = 0; i < localQuestions.length; i++){
        if(localQuestions[i].userEmail === userEmail){
          userQuestions.push(localQuestions[i]);
        }
      }
    });
    return userQuestions;
  }

  createQuestion(newQuestion){
    this.questions.push(newQuestion)
  }

  deleteQuestion(questionToDelete){
    let questionEntryInFirebase = this.getQuestionByQuestionKey(questionToDelete.$key);
    questionEntryInFirebase.remove();
  }
}

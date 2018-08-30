import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Question } from '../models/question.model';
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

  getQuestionsByCategory(category: string, user: User) {
    let localQuestions: Question[];
    let categoryQuestions: Question[] = [];
    this.questions.subscribe((data) => {
      localQuestions = data;
      for (let i = 0; i < localQuestions.length; i++) {
        if (localQuestions[i].category.toLowerCase() === category.toLowerCase()) {
          if (user) {
            if (localQuestions[i].adminCreated || localQuestions[i].userEmail === user.email) {
              categoryQuestions.push(localQuestions[i]);
            }
          }
        }
      }
    });
    return categoryQuestions;
  }

  createQuestion(newQuestion) {
    this.questions.push(newQuestion);
  }

  deleteQuestion(questionToDelete) {
    let questionEntryInFirebase = this.getQuestionByQuestionKey(questionToDelete.$key);
    questionEntryInFirebase.remove();
  }

  editQuestion(localQuestionToEdit) {
    let questionEntryInFirebase = this.getQuestionByQuestionKey(localQuestionToEdit.$key);
    questionEntryInFirebase.update({questionText: localQuestionToEdit.questionText,
                                    answerText: localQuestionToEdit.answerText,
                                    category: localQuestionToEdit.category,
                                    difficulty: localQuestionToEdit.difficulty});
  }
}

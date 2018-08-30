import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class CategoryService {
  categories: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.categories = database.list('categories');
  }

  getCategoryNames() {
    return Object.keys(this.categories);
  }
}

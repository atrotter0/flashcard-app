import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  categories: FirebaseListObservable<any[]>;
  selected: string;

  constructor(private database: AngularFireDatabase) {
    this.categories = database.list('categories');
  }

  ngOnInit() {
  }

  select(index) {
    this.selected = index;
  }

}

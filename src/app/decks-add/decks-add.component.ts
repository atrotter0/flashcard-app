import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck.model';
import { User } from '../models/user.model';
import { Question } from '../models/question.model';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from "firebase";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-decks-add',
  templateUrl: './decks-add.component.html',
  styleUrls: ['./decks-add.component.css'],
  providers: [DeckService, AuthenticationService]
})
export class DecksAddComponent implements OnInit {
  private user;
  localUser: User;

  constructor(
    public deckService: DeckService,
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.authService.getUserByEmail(this.user.email);
    this.localUser = this.authService.localUser;
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  runCreateDeck(newName: string) {
    let newDeck = new Deck(newName, this.localUser.email);
    this.deckService.createDeck(newDeck);
    if (this.localUser.decks === undefined) {
      this.localUser.decks = [];
    }
    this.localUser.decks.push(newDeck);
    this.deckService.addDeckToUser(this.localUser);
    this.goToDeckDetail();
  }

  goToDeckDetail() {
    this.router.navigate(['decks']);
  }
}

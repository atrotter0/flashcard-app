import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck.model';

@Component({
  selector: 'app-bottom-dock',
  templateUrl: './bottom-dock.component.html',
  styleUrls: ['./bottom-dock.component.css'],
  providers: [DeckService]
})
export class BottomDockComponent implements OnInit {
  creatingDeck: boolean = false;

  constructor(private service: DeckService) {

  }

  ngOnInit() {
  }

  createDeck(value) {
    if (value == '$creating') this.creatingDeck = true;
    else this.creatingDeck = false;
    
    console.log("gotten here, " + value);
  }

}

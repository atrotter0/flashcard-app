import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BottomDockComponent } from './bottom-dock/bottom-dock.component';
import { DecksComponent } from './decks/decks.component';
import { CategoryComponent } from './category/category.component';
import { DecksAddComponent } from './decks-add/decks-add.component';
import { DecksEditComponent } from './decks-edit/decks-edit.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { RestrictedAccessComponent } from './restricted-access/restricted-access.component';
import { QuestionAddComponent } from './question-add/question-add.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';

import { PiggybackService } from './services/piggyback.service';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StartComponent,
    SideNavComponent,
    TopNavComponent,
    DecksAddComponent,
    DecksEditComponent,
    DeckDetailsComponent,
    BottomDockComponent,
    DecksComponent,
    CategoryComponent,
    RestrictedAccessComponent,
    QuestionAddComponent,
    QuestionsComponent,
    QuestionDetailsComponent,
    QuestionEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    NgbDropdownModule.forRoot()
  ],
  providers: [PiggybackService],
  bootstrap: [AppComponent]
})
export class AppModule { }

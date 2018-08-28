import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { BodyComponent } from './body/body.component';
import { DecksComponent } from './decks/decks.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { DecksAddComponent } from './decks-add/decks-add.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BodyComponent
  },
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'decks/new',
    component: DecksAddComponent

  },
  {
    path: 'decks',
    component: DecksComponent
  },
  {
    path: 'decks/:id',
    component: DeckDetailsComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

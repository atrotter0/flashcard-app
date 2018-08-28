import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { DecksComponent } from './decks/decks.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { DecksAddComponent } from './decks-add/decks-add.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
  },
  {
    path: 'home',
    component: HomeComponent
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
    path: ':category',
    component: CategoryComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

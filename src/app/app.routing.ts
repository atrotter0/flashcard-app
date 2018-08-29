import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DecksComponent } from './decks/decks.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { StartComponent } from './start/start.component';
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
    path: 'login',
    component: LoginComponent
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
    path: 'decks/start/:id',
    component: StartComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: ':category',
    component: CategoryComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

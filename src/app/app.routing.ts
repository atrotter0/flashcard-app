import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LogInComponent } from '../app/log-in/log-in.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
  path: 'log-in',
  component: LogInComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

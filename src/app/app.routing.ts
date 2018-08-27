import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { BodyComponent } from './body/body.component';

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
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

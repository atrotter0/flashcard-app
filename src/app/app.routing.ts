import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BodyComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

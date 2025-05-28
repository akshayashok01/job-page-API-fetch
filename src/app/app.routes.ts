import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CandidateGridComponent } from './components/candidate-grid/candidate-grid.component';
import { EmployerComponent } from './components/employer/employer.component'; // <-- import
import { PagesComponent } from './components/pages/pages.component'; // <-- import
import { HelpComponent } from './components/help/help.component'; // <-- import
import { authGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'candidates', 
    component: CandidateGridComponent,
    canActivate: [authGuard]
  },
  {path : 'home',component : HomeComponent}, // home component
  { path: 'employer', component: EmployerComponent }, // <-- new route
  { path: 'pages', component: PagesComponent },       // <-- new route
  { path: 'help', component: HelpComponent },         // <-- new route
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '/landing', component: LandingPage },
    { path: '/home', component: HomePage }
];

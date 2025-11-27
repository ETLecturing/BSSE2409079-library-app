import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { HomePage } from './home-page/home-page';
import { AddBookPage } from './add-book-page/add-book-page';
import { BookingPage } from './booking-page/booking-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'landing', component: LandingPage },
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'home', canActivate: [authGuard], component: HomePage },
    { path: 'add-book', canActivate: [authGuard], component: AddBookPage },
    { path: 'booking/:id', canActivate: [authGuard], component: BookingPage},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

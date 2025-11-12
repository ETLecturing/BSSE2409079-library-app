import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { HomePage } from './home-page/home-page';
import { AddBookPage } from './add-book-page/add-book-page';
import { BookingPage } from './booking-page/booking-page';

export const routes: Routes = [
    { path: 'landing', component: LandingPage },
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'add-book', component: AddBookPage },
    { path: 'booking', component: BookingPage}
];

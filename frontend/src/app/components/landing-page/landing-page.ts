import { Component } from '@angular/core';
import { RegisterForm } from "../register-form/register-form";
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-landing-page',
  imports: [RegisterForm, LoginForm],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

}

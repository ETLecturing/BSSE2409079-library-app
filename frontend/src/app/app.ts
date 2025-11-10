import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user';

import { LandingPage } from "./landing-page/landing-page";
import { HomePage } from './home-page/home-page';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPage, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}

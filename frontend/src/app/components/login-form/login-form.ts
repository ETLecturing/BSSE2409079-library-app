import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(event: Event) {
    event.preventDefault();

    console.log('Form is submitted!')
    console.log(this.loginForm.value)

    if(this.loginForm.valid) {
      this.http.post('http://localhost:3000/member/api/login', this.loginForm.value)
      .subscribe({
        next: response => this.router.navigate(['/home']),
        error: error => console.log('Error', error),
        complete: () => console.log('Complete')
      });
    }

  }
}

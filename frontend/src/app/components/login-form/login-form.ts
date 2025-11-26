import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

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

  constructor(private router: Router, private authService: AuthService) {}

  logInUser(event: Event) {
    event.preventDefault();

    if(this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/home']);
        },
        error: error => console.log('Login Error', error)
      });
    }

  }

}

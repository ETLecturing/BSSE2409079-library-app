import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {

  constructor(private http: HttpClient) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  registerUser(event: Event) {
    event.preventDefault();

    if(this.registerForm.valid) {
      this.http.post( environment.apiUrl + '/member/api/register', this.registerForm.value)
      .subscribe({
        next: response => console.log('registerUser() Triggered', response),
        error: error => console.log('registerUser() Error:', error)
      });
    }

  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {

  constructor(private http: HttpClient) {}

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  registerUser(event: Event) {
    event.preventDefault();

    console.log('Form is submitted!')
    console.log(this.registerForm.value)

    if(this.registerForm.valid) {
      this.http.post('http://localhost:3000/api/registerUser', this.registerForm.value)
      .subscribe({
        next: response => console.log('Success', response),
        error: error => console.log('Error', error),
        complete: () => console.log('Complete')
      });
    }

  }
}

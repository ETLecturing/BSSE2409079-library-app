import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-add-book-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-book-page.html',
  styleUrl: './add-book-page.css'
})
export class AddBookPage {

  addBookForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    publisher: new FormControl(''),
    year: new FormControl(0),
    genre: new FormControl(''),
    language: new FormControl(''),
    imgUrl: new FormControl(''),
    status: new FormControl('')
  });

  constructor(private http: HttpClient) {}

  addBook(event: Event) {
    event.preventDefault();

    console.log('Form is submitted!')
    console.log(this.addBookForm.value)

    if(this.addBookForm.valid) {
      this.http.post( environment.apiUrl + '/book/api/add', this.addBookForm.value)
      .subscribe({
        next: response => console.log('Book added', response),
        error: error => console.log('Error', error),
        complete: () => console.log('Complete')
      });
    }
  }
}

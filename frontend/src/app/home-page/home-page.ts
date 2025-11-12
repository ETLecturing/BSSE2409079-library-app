import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Book {
  title: string;
  author: string;
  publisher: string;
  year: number;
  genre: string;
  language: string;
  imgUrl: string;
  status: string;
}

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  private apiUrl = 'http://localhost:3000/book/api/getAll';
  books: Book[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.http.get<Book[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.books = data;
        console.log('Books loaded:', this.books);
      },
      error: (error) => {
        console.log('Error fetching books:', error);
      }
    });
    
  }
}

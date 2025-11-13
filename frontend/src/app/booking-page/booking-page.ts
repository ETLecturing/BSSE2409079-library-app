import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Book {
  _id: string;
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
  selector: 'app-booking-page',
  imports: [],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css'
})
export class BookingPage implements OnInit {
  private getOneBookUrl = `http://localhost:3000/book/api/getOne/`;
  book!: Book;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const specificBookId = this.route.snapshot.paramMap.get('id');
    const completeUrl = this.getOneBookUrl + specificBookId;

    this.getOneBook(completeUrl);
  }
  
  getOneBook(url: string): void {
    this.http.get<Book>(url).subscribe({
      next: (data) => {
        this.book = data;
        console.log('Books loaded:', this.book);
      },
      error: (error) => {
        console.log('Error fetching books:', error);
      }
    });
  }
  
}

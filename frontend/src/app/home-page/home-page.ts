import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

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
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  memberName!: string;
  books: Book[] = [];
  reservations: any[] = [];
  bookings: any[] = [];

  combinedReservations: any[] = [];
  combinedBookings: any[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getAllBooks();
    this.getReservedBooks();
    this.getBorrowedBooks();
    this.memberName = this.authService.memberName || '';
  }

  getAllBooks(): void {
    const url = 'http://localhost:3000/book/api/getAll';
    this.http.get<Book[]>(url).subscribe({
      next: (data) => { this.books = data; },
      error: (error) => { console.log('Error fetching books:', error); }
    });
  }

  getReservedBooks(): void {
    const url = 'http://localhost:3000/transaction/api/getReservations';
    this.http.get<any[]>(url).subscribe({
      next: (data) => { 
        this.reservations = data;

        this.combinedReservations = this.reservations.map(r => {
          const book = this.books.find(b => b._id === r.bookId);
          return { reservation: r, book: book };
        });
      },
      error: (error) => { console.log('Error fetching reservations:', error); }
    });
  }

  getBorrowedBooks(): void {
    const url = 'http://localhost:3000/transaction/api/getBookings';
    this.http.get<any[]>(url).subscribe({
      next: (data) => { 
        this.bookings = data;

        this.combinedBookings = this.bookings.map(r => {
          const book = this.books.find(b => b._id === r.bookId);
          return { booking: r, book: book };
        });
      },
      error: (error) => { console.log('Error fetching bookings:', error); }
    });
  }

  openBook(bookId: string): void {
    this.router.navigate(['/booking', bookId]);
  }

  logOut(): void {
    this.authService.logOut();
  }

}

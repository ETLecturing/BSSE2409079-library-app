import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  imports: [ReactiveFormsModule],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css'
})
export class BookingPage implements OnInit {
  book!: Book;
  specificBookId!: string | null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private _location: Location) {}

  ngOnInit(): void {
    const getOneBookUrl = `http://localhost:3000/book/api/getOne/`;
    this.specificBookId = this.route.snapshot.paramMap.get('id');
    const completeUrl = getOneBookUrl + this.specificBookId;
    this.getOneBook(completeUrl);
  }

  goBack(): void {
    this._location.back();
  }
  
  getOneBook(url: string): void {
    this.http.get<Book>(url).subscribe({
      next: (data) => { this.book = data; },
      error: (error) => { console.log('getOneBook() Error:', error); }
    });
  }

  reserveBook(): void {
    const reserveUrl = 'http://localhost:3000/transaction/api/reserve/' + this.specificBookId;
    this.http.post(reserveUrl, {}).subscribe({
      next: () => { console.log("reserveBook() Triggered"); },
      error: (error) => { console.log('reserveBook() Error:', error); }
    });
  }

  borrowForm: FormGroup = new FormGroup({
    period: new FormControl(0)
  });

  borrowBook(event: Event): void {
    event.preventDefault();

    const borrowUrl = 'http://localhost:3000/transaction/api/borrow/' + this.specificBookId;

    console.log(this.borrowForm.value);

    /*
    this.http.post(borrowUrl, this.borrowForm.value).subscribe({
      next: () => { console.log("borrowBook() Triggered"); },
      error: (error) => { console.log('borrowBook() Error:', error); }
    });
    */
  }

}

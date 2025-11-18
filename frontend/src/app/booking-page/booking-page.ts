import { Location } from '@angular/common';
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
  specificBookId!: string | null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private _location: Location) {}

  ngOnInit(): void {
    this.specificBookId = this.route.snapshot.paramMap.get('id');
    const completeUrl = this.getOneBookUrl + this.specificBookId;
    
    this.getOneBook(completeUrl);
  }
  
  getOneBook(url: string): void {
    this.http.get<Book>(url).subscribe({
      next: (data) => { this.book = data; },
      error: (error) => { console.log('getOneBook() Error:', error); }
    });
  }

  goBack(): void {
    this._location.back();
  }

  test(): void {
    const testUrl = 'http://localhost:3000/transaction/api/reserve/' + this.specificBookId;
    this.http.post(testUrl, {}).subscribe({
      next: () => { console.log("Fired."); }
    });
  }

}

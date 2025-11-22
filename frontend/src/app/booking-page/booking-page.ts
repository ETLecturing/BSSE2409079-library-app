import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { SocketService } from '../services/socket-service';

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
export class BookingPage implements OnInit, OnDestroy {
  book!: Book;
  specificBookId!: string | null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private _location: Location, private socketService: SocketService) {}

  ngOnInit(): void {
    const getOneBookUrl = environment.apiUrl + '/book/api/getOne/';
    this.specificBookId = this.route.snapshot.paramMap.get('id');
    const completeUrl = getOneBookUrl + this.specificBookId;
    this.getOneBook(completeUrl);

    this.socketService.socket.on("bookReserved", () => { this.getOneBook(completeUrl); });
    this.socketService.socket.on("bookBorrowed", () => { this.getOneBook(completeUrl); });
    this.socketService.socket.on("reservationDeleted", () => { this.getOneBook(completeUrl); });
    this.socketService.socket.on("bookReturned", () => { this.getOneBook(completeUrl); });
  }

  ngOnDestroy(): void {
    this.socketService.socket.off("bookReserved");
    this.socketService.socket.off("bookBorrowed");
    this.socketService.socket.off("reservationDeleted");
    this.socketService.socket.off("bookReturned");
  }

  goBack(): void { this._location.back(); }
  
  getOneBook(url: string): void {
    this.http.get<Book>(url).subscribe({
      next: (data) => { this.book = data; console.log("getOneBook() Triggered"); },
      error: (error) => { console.log('getOneBook() Error:', error); }
    });
  }

  reserveBook(): void {
    const reserveUrl = environment.apiUrl + '/transaction/api/reserve/' + this.specificBookId;
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

    const borrowUrl = environment.apiUrl + '/transaction/api/borrow/' + this.specificBookId;
    this.http.post(borrowUrl, this.borrowForm.value).subscribe({
      next: () => { console.log("borrowBook() Triggered"); },
      error: (error) => { console.log('borrowBook() Error:', error); }
    });
  }

}

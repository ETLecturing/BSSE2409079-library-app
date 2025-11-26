import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private _decodedToken: any = null;

  constructor(private router: Router, private http: HttpClient) {
    const token = this.getToken();
    if (token) this._decodedToken = this.decodeToken(token);
  }
  
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this._decodedToken = this.decodeToken(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logIn(credentials: {email: string, password: string}) {
    return this.http.post<{ token: string }>(environment.apiUrl + '/member/api/login', credentials);
  }

  logOut(): void {
    this.router.navigate(['/landing']);
    localStorage.removeItem(this.tokenKey);
    this._decodedToken = null;
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (err) {
      console.error('Invalid token', err);
      return null;
    }
  }

  get memberId(): string | null {
    return this._decodedToken?.memberId || null;
  }

  get memberName(): string | null {
    return this._decodedToken?.memberName || null;
  }

}

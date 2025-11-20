import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private _decodedToken: any = null;

  constructor(private router: Router) {
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

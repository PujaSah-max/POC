import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginDto, signupDto } from '../Interface/Interface';
import { ApiDictionary } from './api-dictionary';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly common = 'Auth/';
  currentUser$: BehaviorSubject<any> = new BehaviorSubject(null);


  constructor(private api: ApiService) {
  }

  signup(signupDto: signupDto) {
    return this.api.post(this.common + ApiDictionary.Signup.url, signupDto);
  }
  login(loginData: LoginDto): Observable<any> {
    return this.api.post(this.common + ApiDictionary.Login.url, loginData);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.saveRole(token);
  }

  isTokenExpired(exp: number): boolean {
    const value = exp * 1000 < Date.now();
    console.log('isTokenExpired', value);
    return value;
  }

  // In real apps, check from localStorage/JWT token
  isLoggedIn(): boolean {
    const decode: any = this.decodeToken();
    if(decode) {
      return !this.isTokenExpired(decode?.exp);
    }
    return false;
  }

  decodeToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  saveRole(token: string) {
    const decoded: any = this.decodeToken();
    console.log(decoded);
    if (decoded) {
      const role = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      localStorage.setItem('role', role);
    }
  }

  getUserRole(): string | null {
    console.log('role', localStorage.getItem('role'));
    return localStorage.getItem('role'); // Or decode from JWT token
  }

}

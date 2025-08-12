import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginDto, signupDto } from '../Interface/Interface';
import { ApiDictionary } from './api-dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private readonly common = 'Auth/';
  constructor(private api: ApiService) { }

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

  // In real apps, check from localStorage/JWT token
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');

  }

  saveRole(token: string) {
    const decoded: any = JSON.parse(atob(token.split('.')[1]));
    console.log(decoded);
    const role = decoded.Role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    localStorage.setItem('role', role);
  }
  
  getUserRole(): string | null {
    return localStorage.getItem('role'); // Or decode from JWT token
  }
}

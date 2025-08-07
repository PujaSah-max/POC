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
    return this.api.post(this.common + ApiDictionary.Login.url,loginData);
  }
}
